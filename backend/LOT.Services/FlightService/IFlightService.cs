using LOT.Services.FlightService.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LOT.Services.FlightService
{
    public interface IFlightService
    {
        Task<FlightModel> GetFlight();
    }
}
