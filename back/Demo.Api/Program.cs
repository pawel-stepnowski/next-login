using Demo.Api.Middleware;
using Demo.BusinessLogic.Interfaces;
using Demo.BusinessLogic.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Demo.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            {
                builder.Services.AddOptions<JwtSettings>().BindConfiguration("Jwt").ValidateDataAnnotations().ValidateOnStart();
                builder.Services.AddScoped<IUserService, UserService>();
                builder.Services.AddControllers();
                AddCors(builder);
                AddAuthentication(builder);
                builder.Services.AddAuthorizationBuilder().AddPolicy("User", policy => policy.RequireRole("User"));
                builder.Services.AddOpenApiDocument(c => { c.Title = "Demo API"; c.Version = "v1"; });
            }
            var app = builder.Build();
            {
                app.UseCors("DefaultCorsPolicy");
                app.UseHttpsRedirection();
                app.UseAuthorization();
                app.MapControllers();
                app.UseMiddleware<ExceptionHandlingMiddleware>();
                app.UseOpenApi();
            }
            app.Run();
        }

        private static void AddAuthentication(WebApplicationBuilder builder)
        {
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]))
                };
            });
        }

        private static void AddCors(WebApplicationBuilder builder)
        {
            var corsOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("DefaultCorsPolicy", builder =>
                {
                    builder.WithOrigins(corsOrigins)
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                });
            });
        }
    }
}
