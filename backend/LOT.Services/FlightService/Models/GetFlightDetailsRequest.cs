using System;

namespace LOT.Services.FlightService.Models
{
    public class GetFlightDetailsRequest
    {
        public DateTime DepartueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string OriginCode { get; set; }
        public string DestinationCode { get; set; }
        public int NumberOfAdults { get; set; }
    }
}
