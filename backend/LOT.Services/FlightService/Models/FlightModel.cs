namespace LOT.Services.FlightService.Models
{
    public class FlightModel
    {
        public decimal MinPrice { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Temperature { get; set; }
        public string ImageUrl { get; set; }
    }
}