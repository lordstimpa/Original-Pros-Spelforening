using Microsoft.AspNetCore.Mvc;

namespace ORG.Server.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet] 
        public IActionResult Index() 
        { 
            return File("~/index.html", "text/html"); 
        }
    }
}
