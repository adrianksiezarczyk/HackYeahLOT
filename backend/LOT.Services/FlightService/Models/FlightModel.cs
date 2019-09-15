using System.Collections.Generic;

namespace LOT.Services.FlightService.Models
{
    public class FlightModel
    {
        public decimal MinPrice { get; set; }
        public string OriginCode { get; set; }
        public string OriginName { get; set; }
        public string DestinationCode { get; set; }
        public string DestinationName { get; set; }
        public string Temperature { get; set; }
        public string ImageUrl { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}