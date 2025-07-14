using Microsoft.AspNetCore.Mvc;
using Models.DTO;
using Services;

namespace F1API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly AuthService _authService;

        public AuthController (AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> UserLogin([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authService.LoginAsync(loginDto);

            if (user.Token == null)
            {
                return Unauthorized(new { message = user.Message} );
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> UserRegister([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authService.RegisterAsync(registerDto);

            if (String.IsNullOrEmpty(user.Token))
            {
                return BadRequest(new {message = user.Message});    
            }

            return Ok(user);
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            return Ok(new { message = "Logout successful. Please remove the token from client storage." });
        }

        [HttpPost("validate")]
        public async Task<ActionResult> ValidateToken([FromHeader(Name = "Authorization")] string authorization)
        {
            if (string.IsNullOrEmpty(authorization) || !authorization.StartsWith("Bearer "))
            {
                return Unauthorized(new { message = "Invalid token format" });
            }

            var token = authorization.Substring("Bearer ".Length);
            var isValid = await _authService.ValidateTokenAsync(token);

            if (!isValid)
            {
                return Unauthorized(new { message = "Invalid or expired token" });
            }

            var username = await _authService.GetUsernameFromTokenAsync(token);
            var role = await _authService.GetRoleFromTokenAsync(token);

            return Ok(new
            {
                message = "Token is valid",
                username = username,
                role = role
            });
        }
    }
}
