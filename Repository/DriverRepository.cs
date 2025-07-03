using Models;
using DAO;
using Microsoft.EntityFrameworkCore;
using Models.DTO;

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

        public async Task<bool> UpdateDriverDetailsAsync(DriverDetailsUpdateDto dto)
        {
            var driverDetails = await GetDriverDetailsAsync(dto.Id);
            if (driverDetails != null)
            {
                driverDetails.FirstName = dto.FirstName;
                driverDetails.LastName = dto.LastName;
                driverDetails.Number =  dto.Number;
                driverDetails.Nationality = dto.Nationality;
                driverDetails.Status = dto.Status;  
                driverDetails.RaceStart = dto.RaceStart;
                driverDetails.RaceWin = dto.RaceWin;
                driverDetails.DateOfBirth = dto.DateOfBirth;
                driverDetails.Podiums = dto.Podiums;
                driverDetails.TeamId = dto.TeamId;
                driverDetails.FastestLaps = dto.FastestLaps;
                driverDetails.ImageUrl = dto.ImageUrl;
                driverDetails.DebutYear = dto.DebutYear;
                driverDetails.Poles = dto.Poles;
            } else
            {
                return false;
            }
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AddNewDriverAsync(AddDriverDto dto)
        {
            var driver = new Driver
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Number = dto.Number,
                Nationality = dto.Nationality,
                RaceWin = dto.RaceWin,
                RaceStart = dto.RaceStart,
                DateOfBirth = dto.DateOfBirth,
                ImageUrl = dto.ImageUrl,
                DebutYear = dto.DebutYear,
                Status = dto.Status,
                Podiums = dto.Podiums,
                Poles = dto.Poles,
                FastestLaps = dto.FastestLaps,
                TeamId = dto.TeamId
            };

            await _context.Drivers.AddAsync(driver);
            await _context.SaveChangesAsync();
            return true;  
        }
    }
} 