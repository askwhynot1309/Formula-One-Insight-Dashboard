using DAO;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<Circuit> GetCircuitDetailsAsync(int circuitId)
        {
            // Get the circuit
            var circuit = await _context.Circuits.FirstOrDefaultAsync(c => c.Id == circuitId);
            if (circuit == null) return null;

            // Get all races at this circuit
            var races = await _context.Races
                .Where(r => r.Circuit.Id == circuitId)
                .Include(r => r.Results)
                    .ThenInclude(rr => rr.Driver)
                .Include(r => r.Results)
                    .ThenInclude(rr => rr.Team)
                .ToListAsync();

            // Prepare fastest lap per year
            var fastestLaps = new Dictionary<int, Models.DTO.FastestLapDto>();
            foreach (var race in races)
            {
                var year = race.Date.Year;
                var fastest = race.Results
                    .Where(rr => rr.FastestLap)
                    .OrderBy(rr => rr.Position)
                    .FirstOrDefault();
                if (fastest != null)
                {
                    fastestLaps[year] = new Models.DTO.FastestLapDto
                    {
                        Year = year,
                        DriverName = fastest.Driver != null ? fastest.Driver.FirstName + " " + fastest.Driver.LastName : null,
                        TeamName = fastest.Team?.Name,
                        LapTime = TimeSpan.Zero, // You may want to fetch from Laptime if available
                        RaceName = race.Name
                    };
                }
            }

            // Attach to circuit (not persisted, just for DTO)
            circuit.GetType().GetProperty("FastestLapsPerYear")?.SetValue(circuit, fastestLaps);
            return circuit;
        }
    }
}
