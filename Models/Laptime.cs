using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Laptime
    {
        public int Id { get; set; }
        public TimeSpan LapTime { get; set; }
        public string Type { get; set; } // "Qualifying" or "Race"
        public int DriverId { get; set; }
        public Driver Driver { get; set; }
        public int RaceId { get; set; }
        public Race Race { get; set; }
        
    }
}
