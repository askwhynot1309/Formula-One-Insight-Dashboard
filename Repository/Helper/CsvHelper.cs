using CsvHelper;
using Models.DTO;
using System.Globalization;

namespace Repository.Helper
{
    public class CsvHelper {
        public static List<ImportRaceResultDto> ParseCsv(Stream csvStream)
        {
            using var reader = new StreamReader(csvStream);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            return csv.GetRecords<ImportRaceResultDto>().ToList();
        }
    }
}
