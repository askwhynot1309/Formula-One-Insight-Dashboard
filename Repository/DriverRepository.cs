using Models;
using DAO;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class DriverRepository
    {
        private readonly F1DbContext _context;
        public DriverRepository(F1DbContext context)
        {
            _context = context;
        }

        public async Task<List<Driver>> GetDriversAsync(string? status, string? nationality, int? teamId)
        {
            var query = _context.Drivers.Include(d => d.Team).AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(d => d.Status == status);
            if (!string.IsNullOrEmpty(nationality))
                query = query.Where(d => d.Nationality == nationality);
            if (teamId.HasValue)
                query = query.Where(d => d.TeamId == teamId);

            return await query.ToListAsync();
        }

        public async Task<Driver> GetDriverDetailsAsync(int? driverId)
        {
            var query = _context.Drivers.Where(d => d.Id == driverId)
                .Include(d => d.Team).AsQueryable()
                .FirstOrDefaultAsync();

            return await query;
        }
    }
} 