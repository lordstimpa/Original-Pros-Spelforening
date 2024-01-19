using Azure.Security.KeyVault.Secrets;
using Azure;
using System.Text.Json;
using Azure.Identity;

namespace org_api.Service
{
    public class KeyService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public KeyService(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        public string AppId => GetSecret("FacebookAppId");
        public string UserId => GetSecret("FacebookUserId");
        public string PageId => GetSecret("FacebookPageId");
        public string AppSecret => GetSecret("FacebookAppSecret");
        public string ShortLivedUserToken => GetSecret("FacebookShortLivedUserToken");
        public string LongLivedUserToken => GetSecret("FacebookLongLivedUserToken");
        public string PageAccessToken => GetSecret("FacebookPageAccessToken");


        private string GetSecret(string secretName)
        {
            var secret = _configuration.GetSection(secretName).Value;
            if (string.IsNullOrEmpty(secret))
            {
                throw new Exception($"Secret {secretName} not found.");
            }
            return secret;
        }
    }
}
