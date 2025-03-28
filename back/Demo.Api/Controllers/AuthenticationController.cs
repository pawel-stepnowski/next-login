using Demo.Api.Model;
using Demo.BusinessLogic.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace Demo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController(IUserService userService) : ControllerBase()
    {
        readonly IUserService UserService = userService;

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> LogIn([FromBody] LoggingUser userParam)
        {
            var jwtToken = await UserService.LogIn(userParam.Username, userParam.Password);
            if (string.IsNullOrWhiteSpace(jwtToken)) return BadRequest(new { error = "invalidUsernameOrPassword" });
            return Ok(new AuthResponse { Token = jwtToken, Expiration = DateTime.UtcNow.AddHours(1) });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok();
        }
    }
}
