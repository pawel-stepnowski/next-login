namespace Demo.Api.Model
{
    public class LoggingUser
    {
        public string GoogleRecaptchaResponse { get; set; } = "";
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        public int? LanguageId { get; set; }
    }
}
