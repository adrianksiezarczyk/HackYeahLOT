using LOT.Services.AirportService.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LOT.Services.AirportService
{
    public class AirportService : IAirportService
    {
        public async Task<IEnumerable<AirportModel>> GetAirports()
        {
            throw new NotImplementedException();
        }
    }
}
