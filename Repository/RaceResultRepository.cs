using DAO;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RaceResultRepository
    {
        private readonly F1DbContext _context;
        public RaceResultRepository(F1DbContext context) 
        {
            _context = context;
        }

        public async Task<List<RaceResult>> GetRaceResultAsync(int raceId)
        {
            var query = _context.RaceResults
                .Include(rr => rr.Team)
                .Include(rr => rr.Driver)
                .Include(rr => rr.Race)
                    .ThenInclude(rr => rr.Circuit)
                .Where(rr => rr.RaceId == raceId)
                .OrderBy(rr => rr.Position)
                .AsQueryable().ToListAsync();

            return await query;
        }

        public async Task<List<string>> ImportRaceResultsAsync(List<ImportRaceResultDto> importList)
        {
            var errors = new List<string>();

            foreach (var dto in importList)
            {
                // Find Race
                var race = await _context.Races.FirstOrDefaultAsync(r => r.Name == dto.RaceName);
                if (race == null)
                {
                    errors.Add($"Race not found: {dto.RaceName}");
                    continue;
                }

                // Find Driver
                var driver = await _context.Drivers.FirstOrDefaultAsync(d => d.FirstName == dto.DriverFirstName && d.LastName == dto.DriverLastName);
                if (driver == null)
                {
                    errors.Add($"Driver not found: {dto.DriverFirstName} {dto.DriverLastName}");
                    continue;
                }

                // Find Team
                var team = await _context.Teams.FirstOrDefaultAsync(t => t.Name == dto.TeamName);
                if (team == null)
                {
                    errors.Add($"Team not found: {dto.TeamName}");
                    continue;
                }

                int raceId = race.Id;
                int driverId = driver.Id;

                var check = await _context.RaceResults.Where(rr => rr.RaceId == raceId && rr.DriverId == driverId).FirstOrDefaultAsync();
                if (check != null)
                {
                    errors.Add($"Driver {driver.FirstName} {driver.LastName} already had a record in the {race.Name}");
                    continue;
                }

                // Create RaceResult
                var raceResult = new RaceResult
                {
                    RaceId = race.Id,
                    DriverId = driver.Id,
                    TeamId = team.Id,
                    Position = dto.Position,
                    Points = dto.Points,
                    GridPosition = dto.GridPosition,
                    Status = dto.Status,
                    LapsCompleted = dto.LapsCompleted,
                    FastestLap = dto.FastestLap,
                    PitStops = dto.PitStops
                };

                await _context.RaceResults.AddAsync(raceResult);
            }

            await _context.SaveChangesAsync();
            return errors; // Return any errors for missing data
        }
    }
}
