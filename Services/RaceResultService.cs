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
    public class RaceResultService : IRaceResultService
    {
        private readonly RaceResultRepository _raceResultRepository;
        public RaceResultService(RaceResultRepository raceResultRepository) 
        {
            _raceResultRepository = raceResultRepository;
        }

        public async Task<List<RaceResult>> GetRaceResultDetailsAsync(int raceId)
        {
            return await _raceResultRepository.GetRaceResultAsync(raceId);
        }

        public async Task<List<string>> ImportRaceResultsAsync(List<ImportRaceResultDto> importList)
        {
            return await _raceResultRepository.ImportRaceResultsAsync(importList);
        }
    }
}
