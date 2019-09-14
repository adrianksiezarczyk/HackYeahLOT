using LOT.Common.Extensions;
using LOT.Services.FlightService.Models;
using LOT.Services.LotApiClient;
using LOT.Services.LotApiClient.Models;
using System.Collections.Generic;
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

        public async Task<IEnumerable<FlightModel>> GetFlights(GetFlightsRequest request)
        {
            var from = new string[] { request.From };
            var to = new string[] { request.To };

            return await lotApiClient.GetOffers(new GetOffersRequest()
            {
                GetOffersRequestParam = new GetOffersRequestParam()
                {
                    Origin = from,
                    Destination = to,
                    DepartureDate = new List<string>() { request.Date.ToLotFormat() },
                    TripType = request.OneWay ? "O" : "R",
                    ReturnDate = request.Date.AddDays(7).ToLotFormat(),
                    NumberOfAdultsOver16 = request.NumberOfAdultsOver16
                }
            });
        }
    }
}
