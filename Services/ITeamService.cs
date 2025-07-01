using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface ITeamService
    {
        Task<List<Team>> GetTeamsAsync();
        
        Task<Team> GetTeamDetailsAsync(int teamId);
    }
}
