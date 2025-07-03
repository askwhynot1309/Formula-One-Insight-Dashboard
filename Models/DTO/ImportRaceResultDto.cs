using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO
{
    public class ImportRaceResultDto
    {
        public string RaceName { get; set; }
        public string DriverFirstName { get; set; }
        public string DriverLastName { get; set; }
        public string TeamName { get; set; }
        public int Position { get; set; }
        public int Points { get; set; }
        public int GridPosition { get; set; }
        public string Status { get; set; }
        public int LapsCompleted { get; set; }
        public bool FastestLap { get; set; }
        public int PitStops { get; set; }
    }
}
