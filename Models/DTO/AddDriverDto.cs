using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO
{
    public class AddDriverDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Number { get; set; }
        public string Nationality { get; set; }
        public int RaceWin { get; set; }
        public int RaceStart { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ImageUrl { get; set; }
        public int DebutYear { get; set; }
        public string Status { get; set; } // active/retired
        public int Podiums { get; set; }
        public int Poles { get; set; }
        public int FastestLaps { get; set; }
        public int TeamId { get; set; }
    }
}
