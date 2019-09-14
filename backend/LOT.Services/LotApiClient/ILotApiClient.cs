using LOT.Services.FlightService.Models;
using LOT.Services.LotApiClient.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LOT.Services.LotApiClient
{
    public interface ILotApiClient
    {
        Task<IEnumerable<FlightModel>> GetOffers(GetOffersRequest request);
        Task<FlightDetailsModel> GetFlightDetails(GetFlightDetailsRequest id);
    }
}
