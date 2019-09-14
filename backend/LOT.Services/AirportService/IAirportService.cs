using LOT.Services.AirportService.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LOT.Services.AirportService
{
    public interface IAirportService
    {
        Task<IEnumerable<AirportModel>> GetAirports();
    }
}
