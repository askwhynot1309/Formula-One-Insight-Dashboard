using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface ICircuitService
    {
        Task<List<Circuit>> GetCircuitsAsync();
        Task<CircuitDetailsDto> GetCircuitDetailsAsync(int circuitId);
    }
}
