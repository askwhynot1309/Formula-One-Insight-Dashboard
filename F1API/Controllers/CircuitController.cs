using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTO;
using Services;

namespace F1API.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class CircuitController : Controller
    {
        private readonly CircuitService _circuitService;

        public CircuitController(CircuitService circuitService)
        {
            _circuitService = circuitService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CircuitDto>>> GetCircuitsAsync()
        {
            var query = await _circuitService.GetCircuitsAsync();
            var circuits = query.Select(c => new CircuitDto
            {
                Id = c.Id,
                Name = c.Name,
                Location = c.Location,
            });
            return Ok(circuits);
        }

        [HttpGet("details")]
        public async Task<ActionResult<CircuitDetailsDto>> GetCircuitDetailsAsync(int circuitId)
        {
            var details = await _circuitService.GetCircuitDetailsAsync(circuitId);
            if (details == null) return NotFound();
            return Ok(details);
        }

    }
}
