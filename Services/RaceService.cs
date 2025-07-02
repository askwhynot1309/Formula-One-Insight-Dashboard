using Models;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class RaceService : IRaceService
    {
        private readonly RaceRepository _repository;
        public RaceService(RaceRepository raceRepository)
        {
            _repository = raceRepository;
        }
        public async Task<List<Race>> GetRaceByCircuit(int circuitId)
        {
            return await _repository.GetRaceByCircuit(circuitId);
        }

        public async Task<List<Race>> GetRaceByYear(int year)
        {
            return await _repository.GetRaceByYear(year);
        }
    }
}
