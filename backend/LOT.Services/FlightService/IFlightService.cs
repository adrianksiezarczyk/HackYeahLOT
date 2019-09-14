using LOT.Services.FlightService.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LOT.Services.FlightService
{
    public interface IFlightService
    {
        Task<IEnumerable<FlightModel>> GetFlights(GetFlightsRequest request);
    }
}
