using System.Collections.Generic;
using System.Threading.Tasks;
using LOT.Services.AirportService;
using LOT.Services.AirportService.Models;
using Microsoft.AspNetCore.Mvc;

namespace LOT.Api.Controllers
{

    public class AirportController : BaseController
    {
        private readonly IAirportService airportService;

        public AirportController(IAirportService airportService)
        {
            this.airportService = airportService;
        }

        [HttpGet, Route("")]
        public async Task<IEnumerable<AirportModel>> Get() => await airportService.GetAirports();
    }
}
