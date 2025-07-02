using DAO;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTO;

namespace Repository
{
    public class CircuitRepository
    {
        private readonly F1DbContext _context;

        public CircuitRepository(F1DbContext context)
        {
             _context = context;
        }

        public async Task<List<Circuit>> GetCircuitsAsync()
        {
            return await _context.Circuits.AsQueryable().ToListAsync();
        }

        public async Task<(Circuit Circuit, List<FastestLapDto> FastestLaps)> GetCircuitDetailsAsync(int circuitId)
        {
            // Get the circuit
            var circuit = await _context.Circuits.FirstOrDefaultAsync(c => c.Id == circuitId);
            if (circuit == null) return (null, null);

            // Get all races at this circuit
            var races = await _context.Races
                .Where(r => r.Circuit.Id == circuitId)
                .Include(r => r.Results)
                    .ThenInclude(rr => rr.Driver)
                .Include(r => r.Results)
                    .ThenInclude(rr => rr.Team)
                .Include(r => r.Laptimes)
                .ToListAsync();

            // Prepare fastest lap list (flat structure)
            var fastestLaps = new List<FastestLapDto>();
            foreach (var race in races)
            {
                // Find the fastest lap in the Laptime table for this race
                var fastestLap = await _context.Laptime
                    .Where(l => l.RaceId == race.Id)
                    .OrderBy(l => l.LapTime)
                    .Include(l => l.Driver)
                    .FirstOrDefaultAsync();

                if (fastestLap != null)
                {
                    var driver = fastestLap.Driver;
                    var team = await _context.Teams.FirstOrDefaultAsync(t => t.Id == driver.TeamId);
                    var fastestLapDto = new FastestLapDto
                    {
                        DriverName = driver != null ? driver.FirstName + " " + driver.LastName : null,
                        TeamName = team?.Name,
                        LapTime = fastestLap.LapTime,
                        RaceName = race.Name
                    };
                    
                    // Add this fastest lap to the list
                    fastestLaps.Add(fastestLapDto);
                }
            }

            return (circuit, fastestLaps);
        }
    }
}
