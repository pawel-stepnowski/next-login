namespace Demo.BusinessLogic.Interfaces
{
    public interface IUserService
    {
        Task<string> LogIn(string username, string password, bool onlyAsAdmin = false);
        void LogOut();
        //object Verify();

        //Task<IEnumerable<User>> GetAll();
        //Task<Classes.Contracts.User.User> GetById(int userId);
        //Task<User> GetByEmail(string email);
        //Task<string> RecoverPasswordGetToken(string email);
        //Task<object> RecoverPasswordPerform(int languageId, RecoverPasswordPerformRequest recoverPasswordPerformRequest);
        //Task<int> UserAddUpdateAddress(int languageId, UserAddress userAddress, string companyName);
        //Task UserDeleteAddress(int languageid, int userid, int addressid);
        //Task<object> ChangePassword(int languageId, int userId, ChangePasswordRequest changePasswordRequest);

        //Task<string> ChangeEmailGetToken(int userid, string email);
        //Task ChangeEmailPerform(int languageId, int? userId, string token);
        //Task<object> ResendSignupConfirmation(string email);
        //Task<string> ChangeFeatures(int userId, string[] features);
        //Task<string> ChangeRole(int userId, UserRole role);
        //Task<object> Create(CreateUserRequest createUserRequest);
    }
}
