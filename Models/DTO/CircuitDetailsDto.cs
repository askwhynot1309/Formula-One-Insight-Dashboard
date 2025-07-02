using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO
{
    public class CircuitDetailsDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Location { get; set; }
        public string ImageUrl { get; set; }
        public List<FastestLapDto> FastestLapsPerYear { get; set; }
    }
}
