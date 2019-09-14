using System;

namespace LOT.Services.FlightService.Models
{
    public class GetFlightsRequest
    {
        public string From { get; set; }
        public string To { get; set; }
        public int NumberOfAdultsOver16 { get; set; }
        public bool OneWay { get; set; }
        public DateTime Date { get; set; }
        public GetFlightsMode Mode { get; set; }
    }

    public enum GetFlightsMode
    {
        Hot,
        Cold,
        Suprise
    }
}
