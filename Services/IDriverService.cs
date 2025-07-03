using Models;
using Models.DTO;

namespace Services
{
    public interface IDriverService
    {
        Task<List<Driver>> GetDriversAsync(string? status, string? nationality, int? teamId);
        Task<Driver> GetDriverDetailsAsync(int? id);
        Task<bool> UpdateDriverDetailsAsync(DriverDetailsUpdateDto driver);
        Task<bool> AddDriverAsync(AddDriverDto driver); 
    }
} 