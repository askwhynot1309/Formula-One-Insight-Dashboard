using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO
{
    public class AddTeamDto
    {
        public string Name { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string TeamPrincipal { get; set; }
        public int FoundedYear { get; set; }
        public string LogoUrl { get; set; }
        public string BaseLocation { get; set; }
        public string EngineSuppliers { get; set; }
    }
}
