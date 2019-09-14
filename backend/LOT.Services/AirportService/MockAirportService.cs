using System.Collections.Generic;
using System.Threading.Tasks;
using LOT.Services.AirportService.Models;

namespace LOT.Services.AirportService
{
    public class MockAirportService : BaseService, IAirportService
    {
        public async Task<IEnumerable<AirportModel>> GetAirports() => await GetMockData<IEnumerable<AirportModel>>("airports");
    }
}
