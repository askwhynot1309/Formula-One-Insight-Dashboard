using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Race
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public DateTime Date { get; set; }

        public ICollection<RaceResult> Results { get; set; }
        public Circuit Circuit { get; set; }
        public ICollection<Laptime> QualifyingTimes { get; set; }
        public ICollection<Driver> Drivers { get; set; }
    }
}
