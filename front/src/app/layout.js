import './styles/global.scss';
import { LanguageProvider } from "../context/LanguageContext";
import LanguageSwitcher from "../context/LanguageSwitcher";
import UserContextProvider from "../context/UserContext";
import axios from "axios";
import { AuthenticationClient, UserProfileClient } from "../types/Api";

const client = axios.create();

client.interceptors.request.use((config) =>
{
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const auth_client = new AuthenticationClient(process.env.NEXT_PUBLIC_API_URL, client);
export const user_client = new UserProfileClient(process.env.NEXT_PUBLIC_API_URL, client);

/**
 * @param {*} param0 
 * @returns 
 */
export default function RootLayout({ children })
{
  return (
    <html lang="en">
      <head>
        <title>Login Demo</title>
        <meta name="description" content="Login Demo" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />
      </head>
      <body>
        <UserContextProvider>
        <LanguageProvider>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
