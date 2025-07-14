using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO
{
    public class AuthResponseDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public DateTime ExpiresAt { get; set; }
        public string Message { get; set; }
    }
}
