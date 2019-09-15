using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LOT.Common.Extensions;
using LOT.Services.FlightService.Models;
using LOT.Services.LotApiClient.Models;

namespace LOT.Services.LotApiClient
{
    public class MockLotApiClient : BaseService, ILotApiClient
    {
        public async Task<FlightDetailsModel> GetFlightDetails(GetFlightDetailsRequest request)
        {
            var flightTime = new Random().Next(2, 10);
            var arrivalDate = request.DepartueDate.AddHours(12 + flightTime);
            var deepLink = $@"https://bookerproxy.lot.com/service.php?COUNTRY_CODE=PL&LANGUAGE_CODE=PL&ORIGIN={request.OriginCode}&DESTINATION={request.DestinationCode}&DEPARTURE_DATE={request.DepartueDate.ToLotFormat()}&ARRIVAL_DATE={arrivalDate.ToLotFormat()}&ADULT_COUNT={request.NumberOfAdults}&CHILD_COUNT=0&INFANT_COUNT=0&PARTNER=TFFNZEZK88W4&CLASS=E&utm_source=github&utm_medium=api";

            var data = await GetMockData<IEnumerable<FlightModel>>("flights");

            var flight = data.FirstOrDefault(a => a.DestinationCode == request.DestinationCode && a.OriginCode == request.OriginCode);
            if (flight == null)
                throw new Exception("Invalid flight data!");

            var result = new FlightDetailsModel()
            {
                DepartueDate = request.DepartueDate.AddHours(12),
                DeepLink = deepLink,
                LocalArrivalDate = arrivalDate,
                DepartuePlaneSeats = GeneratePlaneSeats(),
                ReturnPlaneSeats = request.ReturnDate.HasValue ? GeneratePlaneSeats() : null,
                ReturnDate = request.ReturnDate,
                ArrivalReturnDate = request.ReturnDate.HasValue ? request.ReturnDate.Value.AddHours(flightTime) : (DateTime?)null,
                PlaneName = "Dreamliner",
                TotalPrice = flight.MinPrice * request.NumberOfAdults
            };

            return result;
        }

        private List<PlaneSeat> GeneratePlaneSeats()
        {
            var setsNumber = new int[] { 1, 2, 3, 4, 5, 6 };

            var result = new List<PlaneSeat>();
            for (var i = 'A'; i < 'Z'; i++)
            {
                var ran = new Random().Next(0, 10);
                foreach (var seat in setsNumber)
                {
                    result.Add(new PlaneSeat()
                    {
                        Available = ran % 2 == 0,
                        Name = $"{i}{seat}",
                        Class = i > 'L' ? "F" : "E"
                    });
                }
            }

            return result;

        }
        public async Task<IEnumerable<FlightModel>> GetOffers(GetOffersRequest request)
        {
            var data = await GetMockData<IEnumerable<FlightModel>>("flights");

            var from = request.GetOffersRequestParam.Origin.FirstOrDefault();
            var to = request.GetOffersRequestParam.Destination.FirstOrDefault();

            if (!string.IsNullOrEmpty(from))
                data = data.Where(a => a.OriginCode == from);

            if (!string.IsNullOrEmpty(to))
                data = data.Where(a => a.DestinationCode == to);


            return data;
        }
    }
}
