using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace LOT.Api.Controllers
{
    [Route("")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : ControllerBase
    {
        [HttpGet, Route("")]
        public string Hello()
        {
            return "Hello. It works!";
        }
    }
}
