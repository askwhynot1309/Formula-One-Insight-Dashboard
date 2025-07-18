using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO
{
    public class AddRaceDto
    {
        public string Name { get; set; }
        public string Country { get; set; }
        public DateTime Date { get; set; }
        public int CircuitId { get; set; }
    }
}
