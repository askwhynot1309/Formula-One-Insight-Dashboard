using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IRaceResultService
    {
        Task<List<RaceResult>> GetRaceResultDetailsAsync(int raceId);
        Task<List<string>> ImportRaceResultsAsync(List<ImportRaceResultDto> importList);
    }
}
