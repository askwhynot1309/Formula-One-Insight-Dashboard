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

        [HttpPost]
        public async Task<IActionResult> AddNewCircuit([FromBody] AddCircuitDto addCircuitDto)
        {
            if (addCircuitDto == null)
            {
                return BadRequest("Input is empty");
            }
            var circuit = await _circuitService.AddCircuitAsync(addCircuitDto);
            if (!circuit) {
                return BadRequest("Add new circuit failed");
            }
            return Ok(addCircuitDto);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCircuit(int circuitId, [FromBody] CircuitUpdateDto circuitUpdateDto)
        {
            if (circuitUpdateDto == null)
            {
                return BadRequest("Input is empty");
            }
            var update = await _circuitService.UpdateCircuitAsync(circuitId, circuitUpdateDto);
            if (!update)
            {
                return BadRequest("Failed to update");
            }
            return Ok(circuitUpdateDto);
        }
    }
}
