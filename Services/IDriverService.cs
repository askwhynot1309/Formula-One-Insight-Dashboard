using Models;

namespace Services
{
    public interface IDriverService
    {
        Task<List<Driver>> GetDriversAsync(string? status, string? nationality, int? teamId);

        Task<Driver> GetDriverDetailsAsync(int? id);
    }
} 