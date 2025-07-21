using Models;
using Models.DTO;
using Repository;
using Services.Interface;
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

        public Task<bool> AddCircuitAsync(AddCircuitDto circuitDto)
        {
            return _repository.AddCircuitAsync(circuitDto);
        }

        public Task<Circuit> GetCircuitAsync(int circuitId)
        {
            return _repository.GetCircuitByIdAsync(circuitId);
        }

        public async Task<CircuitDetailsDto> GetCircuitDetailsAsync(int circuitId)
        {
            var (circuit, fastestLaps) = await _repository.GetCircuitDetailsAsync(circuitId);
            if (circuit == null) return null;

            return new CircuitDetailsDto
            {
                Name = circuit.Name,
                Description = circuit.Description,
                Type = circuit.Type,
                Location = circuit.Location,
                ImageUrl = circuit.ImageUrl,
                FastestLapsPerYear = fastestLaps ?? new List<FastestLapDto>()
            };
        }

        public async Task<List<Circuit>> GetCircuitsAsync()
        {
            return await _repository.GetCircuitsAsync();
        }

        public async Task<bool> UpdateCircuitAsync(int circuitId, CircuitUpdateDto circuitUpdateDto)
        {
            return await _repository.UpdateCircuitAsync(circuitId, circuitUpdateDto);
        }
    }
}
