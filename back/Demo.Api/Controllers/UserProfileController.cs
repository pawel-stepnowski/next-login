using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Demo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserProfileController : ControllerBase
    {
        [Authorize(Policy = "User")]
        public string GetProfile()
        {
            return User.Identity?.Name ?? "Unnamed user";
        }
    }
}
