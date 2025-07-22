using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IRaceService
    {
        Task<List<Race>> GetRaceByYear(int year);
        Task<List<Race>> GetRaceByCircuit(int circuitId);
        Task<bool> AddRace(AddRaceDto addRaceDto);
        Task<bool> UpdateRaceAsync(int raceId, RaceUpdateDto raceUpdateDto);
    }
}
