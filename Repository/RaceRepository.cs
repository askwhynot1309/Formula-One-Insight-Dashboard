using DAO;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RaceRepository
    {
        private readonly F1DbContext _dbcontext;
        public RaceRepository(F1DbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<Race>> GetRaceByYear(int year)
        {
            return await _dbcontext.Races.Where(r => r.Date.Year == year)
                .Include(r => r.Circuit)
                .AsQueryable()
                .ToListAsync();
        }

        public async Task<List<Race>> GetRaceByCircuit(int circuitId)
        {
            return await _dbcontext.Races.Where(r => r.Circuit.Id == circuitId)
                .Include(r => r.Circuit)
                .AsQueryable()
                .ToListAsync();
        }

    }
}
