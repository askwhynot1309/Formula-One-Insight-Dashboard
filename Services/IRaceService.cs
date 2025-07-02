using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IRaceService
    {
        Task<List<Race>> GetRaceByYear (int year);
        Task<List<Race>> GetRaceByCircuit(int circuitId);
    }
}
