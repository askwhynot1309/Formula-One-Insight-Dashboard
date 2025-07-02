using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO
{
    public class RaceResultDto
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public int Points { get; set; }
        public int GridPosition { get; set; }
        public string Status { get; set; } // "Complete", "DNF", "DSQ"
        public int LapsCompleted { get; set; }
        public bool FastestLap { get; set; }
        public int PitStops { get; set; }

        // Related info
        public string DriverName { get; set; }
        public int DriverNumber { get; set; }
        public string TeamName { get; set; }
        public string RaceName { get; set; }
        public DateTime RaceDate { get; set; }
        public string CircuitName { get; set; }
        public string CircuitLocation { get; set; }
    }
}
