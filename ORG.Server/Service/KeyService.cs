using Azure.Security.KeyVault.Secrets;
using Azure;
using System.Text.Json;
using Azure.Identity;

namespace org_api.Service
{
    public class KeyService
    {
        private readonly IConfiguration _configuration;
        private readonly SecretClient _secretClient;

        public KeyService(IConfiguration configuration, SecretClient secretClient)
        {
            _configuration = configuration;
            _secretClient = secretClient;
        }

        public string AppId => GetSecret("FacebookAppId");
        public string UserId => GetSecret("FacebookUserId");
        public string PageId => GetSecret("FacebookPageId");
        public string AppSecret => GetSecret("FacebookAppSecret");
        public string ShortLivedUserToken => GetSecret("FacebookShortLivedUserToken");
        public string LongLivedUserToken => GetSecret("FacebookLongLivedUserToken");
        public string PageAccessToken => GetSecret("FacebookPageAccessToken");

        public string GetSecret(string secretName)
        {
            try
            {
                var secret = _secretClient.GetSecret(secretName).Value.Value;
                return secret;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving secret {secretName} from Key Vault.", ex);
            }
        }
    }
}
