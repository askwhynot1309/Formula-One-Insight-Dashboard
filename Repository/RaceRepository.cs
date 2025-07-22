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

        public async Task<Race> GetRaceById(int raceId)
        {
            return await _dbcontext.Races.FindAsync(raceId);
        }

        public async Task<List<Race>> GetRaceByCircuit(int circuitId)
        {
            return await _dbcontext.Races.Where(r => r.Circuit.Id == circuitId)
                .Include(r => r.Circuit)
                .AsQueryable()
                .ToListAsync();
        }

        public async Task<bool> AddRaceAsync(AddRaceDto addRaceDto) 
        {
            var circuit = await _dbcontext.Circuits.FindAsync(addRaceDto.CircuitId);
            if (circuit == null) return false;

            var race = new Race
            {
                Name = addRaceDto.Name,
                Country = addRaceDto.Country,
                Date = addRaceDto.Date,
                Circuit = circuit,
            };

            await _dbcontext.Races.AddAsync(race);
            await _dbcontext.SaveChangesAsync();    
            return true;
        }

        public async Task<bool> UpdateRaceAsync(int raceId, RaceUpdateDto raceUpdateDto)
        {
            var race = await GetRaceById(raceId);
            var circuit = await _dbcontext.Circuits.FindAsync(raceUpdateDto.CircuitId);
            if (raceUpdateDto != null)
            {
                race.Name = raceUpdateDto.Name;
                race.Country = raceUpdateDto.Country;
                race.Date = raceUpdateDto.Date;
                race.Circuit = circuit;
            }
            else
            {
                return false;
            }

            await _dbcontext.SaveChangesAsync();
            return true;
        }


    }
}
