using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTO;
using Services;

namespace F1API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class TeamController : Controller
    {
        private readonly TeamService _teamService;

        public TeamController(TeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamDto>>> GetTeamsAsync() 
        {
            var teams = await _teamService.GetTeamsAsync();
            var teamDto = teams.Select(t => new TeamDto
            {
                Id = t.Id,
                Name = t.Name,
                Country = t.Country,
                FoundedYear = t.FoundedYear,
            }).ToList();

            return Ok(teamDto);
        }

        [HttpGet("details")]
        public async Task<ActionResult<TeamDetailsDto>> GetTeamDetailsAsync(int teamId)
        {
            var team = await _teamService.GetTeamDetailsAsync(teamId);
            if (team == null)
                return NotFound();

            var teamDto = new TeamDetailsDto
            {
                Name = team.Name,
                Country = team.Country,
                FoundedYear = team.FoundedYear,
                BaseLocation = team.BaseLocation,
                Description = team.Description,
                TeamPrincipal = team.TeamPrincipal,
                LogoUrl = team.LogoUrl,
                EngineSuppliers = team.EngineSuppliers,
                Drivers = team.Drivers.Select(d => new DriverDto
                {
                    Id = d.Id,
                    FirstName = d.FirstName,
                    LastName = d.LastName,
                    Number = d.Number,
                    Nationality = d.Nationality,
                    Status = d.Status,
                    TeamName = team.Name,
                }).Where(d => d.Status == "Active")
                .ToList()
            };

            return Ok(teamDto);
        }
    }
}
