using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface ICircuitService
    {
        Task<List<Circuit>> GetCircuitsAsync();
        Task<CircuitDetailsDto> GetCircuitDetailsAsync(int circuitId);
        Task<bool> AddCircuitAsync(AddCircuitDto circuitDto);
        Task<Circuit> GetCircuitAsync(int circuitId);
        Task<bool> UpdateCircuitAsync(int circuitId, CircuitUpdateDto circuitUpdateDto);
    }
}
