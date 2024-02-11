using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using org_api.Service;
using sun.security.krb5.@internal.rcache;
using System.Text.Json;

namespace org_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly KeyService _keyService;
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;

        public PostsController(KeyService keyService, HttpClient httpClient, IMemoryCache memoryCache)
        {
            _keyService = keyService;
            _httpClient = httpClient;
            _cache = memoryCache;
        }

        [HttpGet("all-posts")]
        public async Task<IActionResult> GetAllPostsFromCompanyPage()
        {
            if (_cache.TryGetValue("AllPosts", out List<object> cachedPostInfo))
                return Ok(cachedPostInfo);

            if (string.IsNullOrEmpty(_keyService.PageAccessToken))
                return BadRequest("Long-lived page access token is not set.");

            string pageId = _keyService.PageId;
            string pageAccessToken = _keyService.PageAccessToken;
            string graphApiVersion = "v17.0";

            string url = $"https://graph.facebook.com/{graphApiVersion}/{pageId}/feed?access_token={pageAccessToken}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);
            string responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);

            List<object> postList = new List<object>();

            if (jsonResponse.TryGetProperty("data", out var dataElement) && dataElement.ValueKind == JsonValueKind.Array)
            {
                foreach (var postData in dataElement.EnumerateArray())
                {
                    if (postData.TryGetProperty("id", out var idElement) &&
                        postData.TryGetProperty("created_time", out var createdTimeElement))
                    {
                        string postId = idElement.GetString();
                        string postCreated = createdTimeElement.GetString();
                        string postStartDate = DateTime.Parse(postCreated).ToString("yyyy-MM-dd");
                        string postStartTimeFormatted = DateTime.Parse(postCreated).ToString("HH:mm");

                        string postStory = "";
                        if (postData.TryGetProperty("story", out var storyElement))
                        {
                            postStory = storyElement.GetString();
                        }

                        string postMessage = "";
                        if (postData.TryGetProperty("message", out var messageElement))
                        {
                            postMessage = messageElement.GetString();
                        }

                        postList.Add(new
                        {
                            id = postId,
                            story = postStory,
                            message = postMessage,
                            start_date = postStartDate,
                            start_time = postStartTimeFormatted,
                        });
                    }
                }
            }

            _cache.Set("AllPosts", postList, TimeSpan.FromMinutes(30));

            return Ok(postList);
        }

        [HttpGet("all-post-dates")]
        public async Task<IActionResult> GetAllPostDatesFromCompanyPage()
        {
            if (_cache.TryGetValue("AllPostDates", out List<object> cachedPostInfo))
                return Ok(cachedPostInfo);

            if (string.IsNullOrEmpty(_keyService.PageAccessToken))
                return BadRequest("Long-lived page access token is not set.");

            string pageId = _keyService.PageId;
            string pageAccessToken = _keyService.PageAccessToken;
            string graphApiVersion = "v17.0";

            string url = $"https://graph.facebook.com/{graphApiVersion}/{pageId}/feed?access_token={pageAccessToken}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);
            string responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);

            List<object> postInfoList = new List<object>();

            if (jsonResponse.TryGetProperty("data", out var dataElement) && dataElement.ValueKind == JsonValueKind.Array)
            {
                foreach (var post in dataElement.EnumerateArray().Take(10))
                {
                    if (post.TryGetProperty("created_time", out var createdTimeElement) &&
                        post.TryGetProperty("id", out var idElement))
                    {
                        string createdDate = createdTimeElement.GetString().Split("T")[0];
                        string postId = idElement.GetString();

                        postInfoList.Add(new
                        {
                            id = postId,
                            created_date = createdDate
                        });
                    }
                    else
                    {
                        throw new Exception("Post information not found in the response.");
                    }
                }
            }

            _cache.Set("AllPostDates", postInfoList, TimeSpan.FromMinutes(30));

            return Ok(postInfoList);
        }
    }
}
