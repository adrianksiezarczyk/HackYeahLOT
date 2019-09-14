using Newtonsoft.Json;

namespace LOT.Services.LotApiClient.Models
{
    public class AuthTokenModel
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
}
