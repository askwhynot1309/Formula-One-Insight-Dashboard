using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using Models.DTO;
using Repository;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AuthService : IAuthService
    {
        private readonly AuthenticationRepository _repository;
        private readonly IConfiguration _configuration;

        public AuthService(AuthenticationRepository repository, IConfiguration configuration)
        {
            _configuration = configuration;
            _repository = repository;
        }

        public async Task<string> GetUsernameFromTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(token);
                return jwtToken.Claims.First(x => x.Type == ClaimTypes.Name).Value;
            }
            catch
            {
                return null;
            }
        }

        public async Task<string> GetRoleFromTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(token);
                return jwtToken.Claims.First(x => x.Type == ClaimTypes.Role).Value;
            }
            catch
            {
                return null;
            }
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _repository.GetUserDetailsAsync(loginDto.UserName);
            if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
            {
                return new AuthResponseDto
                {
                    Message = "Invalid login credentials"
                };
            }
            if (!user.IsActive)
            {
                return new AuthResponseDto
                {
                    Message = "Account is deactivated"
                };
            }

            await _repository.UpdateUserLoginAsync(user.Id);

            var token = GenerateJwtToken(user);
            var expiredAt = DateTime.Now.AddHours(2);

            return new AuthResponseDto
            {
                Token = token,
                Username = user.Username,
                Role = user.Role,
                ExpiresAt = expiredAt,
                Message = "Login Successfully",
            };
        }
            
        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            if (await _repository.CheckUserNameExist(registerDto.Username))
            {
                return new AuthResponseDto
                {
                    Message = "Username already existed"
                };
            }

            if (await _repository.CheckEmailExist(registerDto.Email)) {
                return new AuthResponseDto
                {
                    Message = "Email already existed"
                };
            }

            var passwordHash = HashPassword(registerDto.Password);

            var user = new User
            {
                Username = registerDto.Username,
                PasswordHash = passwordHash,
                Role = registerDto.Role,
                Email = registerDto.Email,
                CreatedAt = DateTime.Now,
                IsActive = true,
            };

            var success = await _repository.CreateUserAsync(user);

            if (!success)
            {
                return new AuthResponseDto
                {
                    Message = "Failed to register your account"
                };
            }

            var token = GenerateJwtToken(user);
            var expiredAt = DateTime.Now.AddHours(2);

            return new AuthResponseDto
            {
                Token = token,
                Username = user.Username,
                Role = user.Role,
                ExpiresAt = expiredAt,
                Message = "Create new account successfully",
            };
        }

        public async Task<bool> ValidateTokenAsync(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;
            }
            catch
            {
                return false;
            }
        }


        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string hash)
        {
            var hashedPassword = HashPassword(password);
            return hashedPassword == hash;
        }
    }
}
