using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LOT.Services.FlightService.Models;
using LOT.Services.LotApiClient.Models;

namespace LOT.Services.LotApiClient
{
    public class MockLotApiClient : BaseService, ILotApiClient
    {
        public async Task<IEnumerable<FlightModel>> GetOffers(GetOffersRequest request)
        {
            var data = await GetMockData<IEnumerable<FlightModel>>("flights");

            var from = request.GetOffersRequestParam.Origin.FirstOrDefault();
            var to = request.GetOffersRequestParam.Destination.FirstOrDefault();

            if (!string.IsNullOrEmpty(from))
                data = data.Where(a => a.From == from);

            if (!string.IsNullOrEmpty(to))
                data = data.Where(a => a.To == to);

            return data;
        }
    }
}
