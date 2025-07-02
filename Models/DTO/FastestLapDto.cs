namespace Models.DTO
{
    public class FastestLapDto
    {
        public string DriverName { get; set; }
        public string TeamName { get; set; }
        public TimeSpan LapTime { get; set; }
        public string RaceName { get; set; }
    }
} 