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
    public class RaceService : IRaceService
    {
        private readonly RaceRepository _repository;
        public RaceService(RaceRepository raceRepository)
        {
            _repository = raceRepository;
        }

        public async Task<bool> AddRace(AddRaceDto addRaceDto)
        {
            return await _repository.AddRaceAsync(addRaceDto);
        }

        public async Task<List<Race>> GetRaceByCircuit(int circuitId)
        {
            return await _repository.GetRaceByCircuit(circuitId);
        }

        public async Task<List<Race>> GetRaceByYear(int year)
        {
            return await _repository.GetRaceByYear(year);
        }

        public async Task<bool> UpdateRaceAsync(int raceId, RaceUpdateDto raceUpdateDto)
        {
            return await _repository.UpdateRaceAsync(raceId, raceUpdateDto);
        }
    }
}
