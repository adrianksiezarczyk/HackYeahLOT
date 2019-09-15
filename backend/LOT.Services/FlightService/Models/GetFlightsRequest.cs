using System;
using System.Collections.Generic;

namespace LOT.Services.FlightService.Models
{
    public class GetFlightsRequest
    {
        public string From { get; set; }
        public string To { get; set; }
        public int NumberOfAdultsOver16 { get; set; }
        public bool OneWay { get; set; }
        public DateTime Date { get; set; }
        public string Mode { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}
