using LOT.Common.Configuration;
using LOT.Common.Extensions;
using LOT.Services.FlightService.Models;
using LOT.Services.LotApiClient.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace LOT.Services.LotApiClient
{
    public class LotApiClient : ILotApiClient
    {
        private readonly LotApiConfiguration lotApiConfig;

        public LotApiClient(IOptions<LotApiConfiguration> lotApiConfig)
        {
            this.lotApiConfig = lotApiConfig.Value;
        }

        public async Task<IEnumerable<FlightModel>> GetOffers(GetOffersRequest request)
        {
            var authToken = await GetAuthToken();

            using (var http = GetHttpClient())
            {
                http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);

                var x = request.Stringify();
                var response = await http.PostAsync("booking/availability", request.AsJson());

                var stringResponse = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    throw new Exception($"Unable to get flights! Error: {stringResponse}");

                var parsed = JsonConvert.DeserializeObject<GetOffersResponse>(stringResponse);
                var allOffers = parsed.FlightsGroupedByPrice.SelectMany(a => a);

                 var grouped = allOffers.GroupBy(a => a.Outbound.Segments.Last().ArrivalAirport);

                var res = new List<FlightModel>();

                return res;
            };
        }

        private async Task<string> GetAuthToken()
        {
            using (var http = GetHttpClient())
            {
                var response = await http.PostAsync("auth/token/get", new
                {
                    secret_key = lotApiConfig.Secret
                }.AsJson());

                if (!response.IsSuccessStatusCode)
                    throw new Exception("Unable to get access token!");

                var deserialized = JsonConvert.DeserializeObject<AuthTokenModel>(await response.Content.ReadAsStringAsync());

                return deserialized.AccessToken;
            }
        }

        private HttpClient GetHttpClient()
        {
            var http = new HttpClient()
            {
                BaseAddress = new Uri(lotApiConfig.ApiUrl)
            };

            http.DefaultRequestHeaders.Add("x-api-key", lotApiConfig.ApiKey);

            return http;
        }
    }
}
