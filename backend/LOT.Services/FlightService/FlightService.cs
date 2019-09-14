using LOT.Services.FlightService.Models;
using LOT.Services.LotApiClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LOT.Services.FlightService
{
    public class FlightService : IFlightService
    {
        private readonly ILotApiClient lotApiClient;

        public FlightService(ILotApiClient lotApiClient)
        {
            this.lotApiClient = lotApiClient;
        }

        public Task<FlightModel> GetFlight()
        {
            return null;
            //return lotApiClient.
        }
    }
}
