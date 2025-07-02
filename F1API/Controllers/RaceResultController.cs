using Microsoft.AspNetCore.Mvc;
using Models.DTO;
using Services;

namespace F1API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RaceResultController : Controller
    {
        private readonly RaceResultService _raceResultService;

        public RaceResultController(RaceResultService raceResultService)
        {
            _raceResultService = raceResultService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RaceResultDto>>> GetRaceResultDetailsAsync(int raceId)
        {
            //could use try catch for better debug
            var result = await _raceResultService.GetRaceResultDetailsAsync(raceId);

            var raceResultDto = result.Select(rr => new RaceResultDto
            {
                Id = rr.Id,
                Position = rr.Position,
                Points = rr.Points,
                GridPosition = rr.GridPosition,
                Status = rr.Status, 
                LapsCompleted = rr.LapsCompleted,
                FastestLap = rr.FastestLap,
                PitStops = rr.PitStops,

                DriverName = rr.Driver.FirstName + " " + rr.Driver.LastName,
                DriverNumber = rr.Driver.Number,
                TeamName = rr.Team.Name,
                RaceName = rr.Race.Name,
                RaceDate = rr.Race.Date,
                CircuitName = rr.Race.Circuit.Name,
                CircuitLocation = rr.Race.Circuit.Location
            }).ToList();

            return Ok(raceResultDto);
        }
    }
}
