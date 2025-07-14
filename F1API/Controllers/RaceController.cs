using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTO;
using Services;

namespace F1API.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class RaceController : Controller
    {
        private readonly RaceService _raceService;
        public RaceController(RaceService raceService)
        {
            _raceService = raceService;
        }

        [HttpGet("race-by-year")]
        public async Task<ActionResult<IEnumerable<RaceDto>>> GetRaceByYear([FromQuery]int year)
        {
            var races = await _raceService.GetRaceByYear(year);

            var raceDto = races.Select(r => new RaceDto
            {
                Id = r.Id,
                Country = r.Country,
                Name = r.Name,
                Date = r.Date,
                CircuitName = r.Circuit.Name,
            });

            return Ok(raceDto);
        }

        [HttpGet("race-by-circuit")]
        public async Task<ActionResult<IEnumerable<RaceDto>>> GetRaceByCircuit([FromQuery] int circuitId)
        {
            var races = await _raceService.GetRaceByCircuit(circuitId);

            var raceDto = races.Select(r => new RaceDto
            {
                Id = r.Id,
                Country = r.Country,
                Name = r.Name,
                Date = r.Date,
                CircuitName = r.Circuit.Name,
            });

            return Ok(raceDto);
        }
    }
}
