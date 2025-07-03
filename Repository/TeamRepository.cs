using DAO;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class TeamRepository
    {
        private readonly F1DbContext _context;
        public TeamRepository (F1DbContext context)
        {
            _context = context;
        }

        public async Task<List<Team>> GetTeamsAsync ()
        {
            var query = _context.Teams.AsQueryable();

            return await query.ToListAsync();
        }

        public async Task<Team> GetTeamDetailsAsync (int teamId)
        {
            return await _context.Teams
                .Where(t => t.Id == teamId)
                .Include(t => t.Drivers)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateTeamDetailsAsync(TeamUpdateDto dto)
        {
            var team = await GetTeamDetailsAsync(dto.Id);
            if (team!= null)
            {
                team.Name = dto.Name;
                team.Description = dto.Description;
                team.Country = dto.Country;
                team.TeamPrincipal = dto.TeamPrincipal;
                team.FoundedYear = dto.FoundedYear;
                team.LogoUrl = dto.LogoUrl;
                team.BaseLocation = dto.BaseLocation;
                team.EngineSuppliers = dto.EngineSuppliers;
            } else
            {
                return false;
            }
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> AddNewTeam(AddTeamDto team)
        {
            var teamDto = new Team();
            
            teamDto.Name = team.Name;
            teamDto.Country = team.Country;
            teamDto.Description = team.Description;
            teamDto.TeamPrincipal = team.TeamPrincipal;
            teamDto.FoundedYear = team.FoundedYear;
            teamDto.LogoUrl = team.LogoUrl;
            teamDto.BaseLocation = team.BaseLocation;
            teamDto.EngineSuppliers = team.EngineSuppliers;

            await _context.Teams.AddAsync(teamDto);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
