using LOT.Services.AirportService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LOT.Services.AirportService
{
    public class AirportService : IAirportService
    {
        public async Task<IEnumerable<AirportModel>> GetAirports()
        {
            return new List<AirportModel>() {
                new AirportModel{Code = "WAW", Name="Warszawa Okęcie"},
                new AirportModel{Code = "GDN", Name="Gdańsk"},
                new AirportModel{Code = "KTW", Name="Katowice"},
            };
        }
    }
}
