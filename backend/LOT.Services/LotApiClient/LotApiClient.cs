using LOT.Common.Configuration;
using LOT.Services.FlightService.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
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

        public async Task<FlightModel> GetFlight()
        {
            return new FlightModel()
            {
                Content = await GetAuthToken()
            };
        }

        private async Task<string> GetAuthToken()
        {
            using (var http = GetHttpClient())
            {
                var response = await http.PostAsync("auth/token/get", null);
                return await response.Content.ReadAsStringAsync();
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
