using DAO;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RaceResultRepository
    {
        private readonly F1DbContext _context;
        public RaceResultRepository(F1DbContext context) 
        {
            _context = context;
        }

        public async Task<List<RaceResult>> GetRaceResultAsync(int raceId)
        {
            var query = _context.RaceResults
                .Include(rr => rr.Team)
                .Include(rr => rr.Driver)
                .Include(rr => rr.Race)
                    .ThenInclude(rr => rr.Circuit)
                .Where(rr => rr.RaceId == raceId)
                .AsQueryable().ToListAsync();

            return await query;
        }

    }
}
