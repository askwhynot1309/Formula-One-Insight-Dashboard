using Microsoft.AspNetCore.Mvc;
using Services;
using Models.DTO;
using Models;

namespace F1API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DriverController : ControllerBase
    {
        private readonly IDriverService _driverService;
        public DriverController(IDriverService driverService)
        {
            _driverService = driverService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverDto>>> GetDrivers([FromQuery] string? status, [FromQuery] string? nationality, [FromQuery] int? teamId)
        {
            var drivers = await _driverService.GetDriversAsync(status, nationality, teamId);
            var driverDtos = drivers.Select(d => new DriverDto
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName,
                Number = d.Number,
                Nationality = d.Nationality,
                Status = d.Status,
                TeamName = d.Team?.Name
            }).ToList();
            return Ok(driverDtos);
        }

        [HttpGet("details")]
        public async Task<ActionResult<IEnumerable<DriverDetailsDto>>> GetDriverDetails([FromQuery] int? driverId)
        {
            var driver = await _driverService.GetDriverDetailsAsync(driverId);
            var driverDetailsDto = new DriverDetailsDto
            {
                Id = driver.Id,
                FirstName = driver.FirstName,
                LastName = driver.LastName,
                Number = driver.Number,
                Nationality = driver.Nationality,
                RaceWin = driver.RaceWin,
                RaceStart = driver.RaceStart,
                DateOfBirth = driver.DateOfBirth,
                ImageUrl = driver.ImageUrl,
                DebutYear = driver.DebutYear,
                Status = driver.Status,
                Podiums = driver.Podiums,
                Poles = driver.Poles,
                FastestLaps = driver.FastestLaps,
                TeamName = driver.Team.Name,
            };
            return Ok(driverDetailsDto);
        }
    }
} 