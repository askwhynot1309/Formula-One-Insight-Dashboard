using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface ITeamService
    {
        Task<List<Team>> GetTeamsAsync();
        Task<Team> GetTeamDetailsAsync(int teamId);
        Task<bool> UpdateTeamDetailsAsync(TeamUpdateDto updateTeam);
        Task<bool> AddTeamAsync(AddTeamDto addTeam);
    }
}
