using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LOT.Services.FlightService;
using LOT.Services.FlightService.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace LOT.Api.Controllers
{

    public class FlightController : BaseController
    {
        private readonly IFlightService flightService;

        public FlightController(IFlightService flightService)
        {
            this.flightService = flightService;
        }

        [HttpGet, Route("")]
        public async Task<IEnumerable<FlightModel>> Get([FromQuery] GetFlightsRequest request) => await flightService.GetFlights(request);

        [HttpGet, Route("details")]
        public async Task<FlightDetailsModel> Get([FromQuery]GetFlightDetailsRequest request) => await flightService.GetFlightDetails(request);
    }
}
