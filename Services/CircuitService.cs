using Models;
using Models.DTO;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CircuitService : ICircuitService
    {
        private readonly CircuitRepository _repository;
        
        public CircuitService(CircuitRepository repository)
        {
            _repository = repository;
        }

        public async Task<CircuitDetailsDto> GetCircuitDetailsAsync(int circuitId)
        {
            var circuit = await _repository.GetCircuitDetailsAsync(circuitId);
            if (circuit == null) return null;

            // Get the fastest laps per year from the dynamic property
            var fastestLaps = circuit.GetType().GetProperty("FastestLapsPerYear")?.GetValue(circuit) as Dictionary<int, FastestLapDto>;

            return new CircuitDetailsDto
            {
                Name = circuit.Name,
                Description = circuit.Description,
                Type = circuit.Type,
                Location = circuit.Location,
                FastestLapsPerYear = fastestLaps ?? new Dictionary<int, FastestLapDto>()
            };
        }

        public async Task<List<Circuit>> GetCircuitsAsync()
        {
            return await _repository.GetCircuitsAsync();
        }
    }
}
