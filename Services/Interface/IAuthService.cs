using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<bool> ValidateTokenAsync(string token);
        Task<string> GetUsernameFromTokenAsync(string token);
        Task<string> GetRoleFromTokenAsync(string token);
    }
}
