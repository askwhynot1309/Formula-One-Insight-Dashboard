using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class RaceResult
    {
        public int Id { get; set; }
        public int RaceId { get; set; }
        public Race Race { get; set; }
        public int DriverId { get; set; }
        public Driver Driver { get; set; }
        public int TeamId { get; set; }
        public Team Team { get; set; }
        public int Position { get; set; }
        public int Points { get; set; }
        public int GridPosition { get; set; }
        public string Status { get; set; } // finished, DNF, DSQ
        public int LapsCompleted { get; set; }
        public bool FastestLap { get; set; }
        public int PitStops { get; set; }
    }
}
