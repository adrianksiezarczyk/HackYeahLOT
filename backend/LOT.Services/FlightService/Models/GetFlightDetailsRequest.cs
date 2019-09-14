using System;

namespace LOT.Services.FlightService.Models
{
    public class GetFlightDetailsRequest
    {
        public DateTime DepartueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public int NumberOfAdults { get; set; }
    }
}
