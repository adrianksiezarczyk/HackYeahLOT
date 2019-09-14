using LOT.Common.Extensions;
using LOT.Services.FlightService.Models;
using LOT.Services.LotApiClient;
using LOT.Services.LotApiClient.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var res = await lotApiClient.GetOffers(new GetOffersRequest()
            {
                GetOffersRequestParam = new GetOffersRequestParam()
                {
                    Origin = new string[] { request.From },
                    Destination = new string[] { request.To },
                    DepartureDate = new List<string>() { request.Date.ToLotFormat() },
                    TripType = request.OneWay ? "O" : "R",
                    ReturnDate = request.Date.AddDays(7).ToLotFormat(),
                    NumberOfAdultsOver16 = request.NumberOfAdultsOver16
                }
            });

            if (!string.IsNullOrEmpty(request.Mode))
                res = res.Where(a => a.Tags.Contains(request.Mode));

            if (request.Tags != null && request.Tags.Any())
                res = res.Where(a => !request.Tags.Except(a.Tags).Any());

            res = res.OrderBy(a => Guid.NewGuid()).ToList();

            if (res.Count() > 9)
                res = res.Take(9);

            return res;
        }

        public async Task<FlightDetailsModel> GetFlightDetails(GetFlightDetailsRequest request)
        {
            return await lotApiClient.GetFlightDetails(request);
        }
    }
}
