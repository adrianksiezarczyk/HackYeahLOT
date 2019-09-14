using Newtonsoft.Json;
using System.Collections.Generic;

namespace LOT.Services.LotApiClient.Models
{
    public class GetOffersRequest
    {
        [JsonProperty("params")]
        public GetOffersRequestParam GetOffersRequestParam { get; set; }
        public GetOffersRequestOptions Options { get; set; } = new GetOffersRequestOptions();
    }
    public class GetOffersRequestOptions
    {
        public bool FromCache { get; set; } = true;
        public List<string> FareType { get; set; } = new List<string> { "ALL" };
    }
    public class GetOffersRequestParam
    {
        public IEnumerable<string> Origin { get; set; }
        public IEnumerable<string> Destination { get; set; }
        public IEnumerable<string> DepartureDate { get; set; }
        public string CabinClass { get; set; } = "E";
        [JsonProperty("market")]
        public string CountryOfOperation { get; set; } = "PL";
        public string TripType { get; set; } = "O";
        public string ReturnDate { get; set; }
        [JsonProperty("adt")]
        public int NumberOfAdultsOver16 { get; set; }
        //[JsonProperty("c14")]
        //public int NumberOfChildren12to15 { get; set; }
        //[JsonProperty("chd")]
        //public int NumberOfChildren2to11 { get; set; }
        //[JsonProperty("inf")]
        //public int NumberOfChildrenTo24Months { get; set; }
    }
}
