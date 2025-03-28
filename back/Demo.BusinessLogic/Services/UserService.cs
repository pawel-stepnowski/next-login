using Demo.BusinessLogic.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Demo.BusinessLogic.Services
{
    public class UserService : IUserService
    {
        readonly JwtSettings JwtSettings;

        public UserService(IOptions<JwtSettings> jwtSettings)
        {
            JwtSettings = jwtSettings.Value;
            if (string.IsNullOrWhiteSpace(JwtSettings.Secret)) throw new ArgumentNullException(nameof(jwtSettings), "JWT secret key must be configured.");
        }

        public async Task<string> LogIn(string username, string password, bool onlyAsAdmin = false)
        {
            if (password == "123") return await Task.Run(() => GenerateJwtToken(username));
            return string.Empty;
        }

        public void LogOut()
        {
        }

        protected string GenerateJwtToken(string username)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, username),
                new(ClaimTypes.Name, username),
                new(ClaimTypes.Role, "User")
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken
            (
                issuer: JwtSettings.Issuer,
                audience: JwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
