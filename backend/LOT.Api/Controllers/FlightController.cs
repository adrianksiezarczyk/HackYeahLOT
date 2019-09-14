using System;
using System.Collections.Generic;
using LOT.Services.FlightService;
using Microsoft.AspNetCore.Mvc;

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
        public IEnumerable<string> Get()
        {
            return new string[] { "Siema", "Elo" };
        }
    }
}
