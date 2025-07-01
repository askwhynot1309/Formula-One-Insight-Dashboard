using DAO;
using Microsoft.EntityFrameworkCore;
using Models;
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
    }
}
