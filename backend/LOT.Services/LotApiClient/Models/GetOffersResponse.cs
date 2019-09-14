using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace LOT.Services.LotApiClient.Models
{
    public class GetOffersResponse
    {
        [JsonProperty("data")]
        public IEnumerable<IEnumerable<FlightData>> FlightsGroupedByPrice { get; set; }
        public List<GetFlightsError> Errors { get; set; }
        public string Status { get; set; }
    }

    public class BaggageForPax
    {
    }

    public class Segment
    {

        [JsonProperty("idInfoSegment")]
        public int IdInfoSegment { get; set; }

        [JsonProperty("departureAirport")]
        public string DepartureAirport { get; set; }

        [JsonProperty("arrivalAirport")]
        public string ArrivalAirport { get; set; }

        [JsonProperty("departureDate")]
        public DateTime DepartureDate { get; set; }

        [JsonProperty("arrivalDate")]
        public DateTime ArrivalDate { get; set; }

        [JsonProperty("carrier")]
        public string Carrier { get; set; }

        [JsonProperty("flightNumber")]
        public string FlightNumber { get; set; }

        [JsonProperty("operationCarrier")]
        public string OperationCarrier { get; set; }

        [JsonProperty("equipment")]
        public string Equipment { get; set; }

        [JsonProperty("duration")]
        public int Duration { get; set; }

        [JsonProperty("stopTime")]
        public int StopTime { get; set; }

        [JsonProperty("status")]
        public IList<object> Status { get; set; }

        [JsonProperty("baggageForPax")]
        public BaggageForPax BaggageForPax { get; set; }
    }

    public class Inbound
    {

        [JsonProperty("duration")]
        public int Duration { get; set; }

        [JsonProperty("segments")]
        public IList<Segment> Segments { get; set; }

        [JsonProperty("fareType")]
        public string FareType { get; set; }

        [JsonProperty("price")]
        public decimal Price { get; set; }
    }

    public class TotalPrice
    {

        [JsonProperty("price")]
        public decimal Price { get; set; }

        [JsonProperty("basePrice")]
        public decimal BasePrice { get; set; }

        [JsonProperty("tax")]
        public decimal Tax { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }
    }


    public class Outbound
    {

        [JsonProperty("duration")]
        public int Duration { get; set; }

        [JsonProperty("segments")]
        public IList<Segment> Segments { get; set; }

        [JsonProperty("fareType")]
        public string FareType { get; set; }

        [JsonProperty("price")]
        public decimal Price { get; set; }
    }

    public class FlightData
    {

        [JsonProperty("inbound")]
        public Inbound Inbound { get; set; }

        [JsonProperty("totalPrice")]
        public TotalPrice TotalPrice { get; set; }

        [JsonProperty("outbound")]
        public Outbound Outbound { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class GetFlightsError
    {
        public string Code { get; set; }
        public string Message { get; set; }
    }
}
