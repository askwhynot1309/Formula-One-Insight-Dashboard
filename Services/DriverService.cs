using Models;
using Models.DTO;
using Repository;

namespace Services
{
    public class DriverService : IDriverService
    {
        private readonly DriverRepository _driverRepository;
        public DriverService(DriverRepository driverRepository)
        {
            _driverRepository = driverRepository;
        }

        public async Task<bool> AddDriverAsync(AddDriverDto driver)
        {
            return await _driverRepository.AddNewDriverAsync(driver);
        }

        public async Task<Driver> GetDriverDetailsAsync(int? id)
        {
            return await _driverRepository.GetDriverDetailsAsync(id);
        }

        public async Task<List<Driver>> GetDriversAsync(string? status, string? nationality, int? teamId)
        {
            return await _driverRepository.GetDriversAsync(status, nationality, teamId);
        }

        public async Task<bool> UpdateDriverDetailsAsync(DriverDetailsUpdateDto driver)
        {
            return await _driverRepository.UpdateDriverDetailsAsync(driver);
        }
    }
} 