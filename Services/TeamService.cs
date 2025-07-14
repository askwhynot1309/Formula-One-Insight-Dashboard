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
    public class TeamService : ITeamService
    {
        private readonly TeamRepository _repository;
        public TeamService(TeamRepository repository) 
        {
            _repository = repository;
        }

        public async Task<bool> AddTeamAsync(AddTeamDto addTeam)
        {
            return await _repository.AddNewTeam(addTeam);
        }

        public async Task<Team> GetTeamDetailsAsync(int teamId)
        {
            return await _repository.GetTeamDetailsAsync(teamId);
        }

        public async Task<List<Team>> GetTeamsAsync()
        {
            return await _repository.GetTeamsAsync();
        }

        public async Task<bool> UpdateTeamDetailsAsync(TeamUpdateDto updateTeam)
        {
            return await _repository.UpdateTeamDetailsAsync(updateTeam);
        }
    }
}
