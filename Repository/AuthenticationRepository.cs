using DAO;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class AuthenticationRepository
    {
        private readonly F1DbContext _context;
        public AuthenticationRepository(F1DbContext context) 
        {
            _context = context;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserDetailsAsync(string username)
        {
            return _context.Users.Where(u => u.Username == username).FirstOrDefault();
        }

        public async Task<bool> CreateUserAsync(User user)
        {
            try
            {
                _context.Add(user);
                await _context.SaveChangesAsync();
                return true;
            } catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateUserLoginAsync(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user != null)
                {
                    user.LastLoginAt = DateTime.Now;
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> CheckUserNameExist(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        public async Task<bool> CheckEmailExist(string email)
        {
            var user = await _context.Users.AnyAsync(u => u.Email == email);
            if (user == true)
            {
                return true;
            }
            return false;
        }
    }
}
