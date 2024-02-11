using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using org_api.Service;
using sun.security.krb5.@internal.rcache;
using System.Text.Json;

namespace org_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly KeyService _keyService;
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;

        public EventsController(KeyService keyService, HttpClient httpClient, IMemoryCache memoryCache)
        {
            _keyService = keyService;
            _httpClient = httpClient;
            _cache = memoryCache;
        }

        [HttpGet("all-upcomming-events")]
        public async Task<IActionResult> GetAllUpcommingEvents()
        {
            if (_cache.TryGetValue("UpcomingEvents", out List<object> cachedEventInfoList))
                return Ok(cachedEventInfoList);

            if (string.IsNullOrEmpty(_keyService.PageAccessToken))
                throw new Exception("Long-lived page access token is not set.");

            string pageId = _keyService.PageId;
            string pageAccessToken = _keyService.PageAccessToken;
            string graphApiVersion = "v17.0";
            DateTime currentDate = DateTime.UtcNow.Date;

            string url = $"https://graph.facebook.com/{graphApiVersion}/{pageId}/events?fields=id,name,start_time,cover&since={currentDate:s}&access_token={pageAccessToken}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);
            string responseContent = await response.Content.ReadAsStringAsync();

            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);

            var eventInfoList = new List<object>();
            if (jsonResponse.TryGetProperty("data", out var dataElement) && dataElement.ValueKind == JsonValueKind.Array)
            {
                foreach (var eventData in dataElement.EnumerateArray())
                {
                    if (eventData.TryGetProperty("id", out var idElement) &&
                        eventData.TryGetProperty("name", out var nameElement) &&
                        eventData.TryGetProperty("start_time", out var startTimeElement) &&
                        eventData.TryGetProperty("cover", out var coverElement))
                    {
                        string eventId = idElement.GetString();
                        string eventName = nameElement.GetString();
                        string eventStartTime = startTimeElement.GetString();
                        string eventStartDate = DateTime.Parse(eventStartTime).ToString("yyyy-MM-dd");
                        string eventStartTimeFormatted = DateTime.Parse(eventStartTime).ToString("HH:mm");
                        string eventCoverSource = coverElement.GetProperty("source").GetString();

                        eventInfoList.Add(new
                        {
                            id = eventId,
                            name = eventName,
                            start_date = eventStartDate,
                            start_time = eventStartTimeFormatted,
                            cover_source = eventCoverSource
                        });
                    }
                    else
                    {
                        throw new Exception("Event information not found in the response.");
                    }
                }
            }

            _cache.Set("UpcomingEvents", eventInfoList, TimeSpan.FromMinutes(30));

            return Ok(eventInfoList);
        }

        [HttpGet("all-past-events")]
        public async Task<IActionResult> GetAllPastEvents()
        {
            if (_cache.TryGetValue("PastEvents", out List<object> cachedEventInfoList))
                return Ok(cachedEventInfoList);

            if (string.IsNullOrEmpty(_keyService.PageAccessToken))
                throw new Exception("Long-lived page access token is not set.");

            string pageId = _keyService.PageId;
            string pageAccessToken = _keyService.PageAccessToken;
            string graphApiVersion = "v17.0";
            DateTime currentDate = DateTime.UtcNow.Date;

            string url = $"https://graph.facebook.com/{graphApiVersion}/{pageId}/events?fields=id,name,start_time,cover&until={currentDate:s}&access_token={pageAccessToken}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);
            string responseContent = await response.Content.ReadAsStringAsync();

            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);

            List<object> eventInfoList = new List<object>();
            if (jsonResponse.TryGetProperty("data", out var dataElement) && dataElement.ValueKind == JsonValueKind.Array)
            {
                foreach (var eventData in dataElement.EnumerateArray())
                {
                    if (eventData.TryGetProperty("id", out var idElement) &&
                        eventData.TryGetProperty("name", out var nameElement) &&
                        eventData.TryGetProperty("start_time", out var startTimeElement) &&
                        eventData.TryGetProperty("cover", out var coverElement))
                    {
                        string eventId = idElement.GetString();
                        string eventName = nameElement.GetString();
                        string eventStartTime = startTimeElement.GetString();
                        string eventStartDate = DateTime.Parse(eventStartTime).ToString("yyyy-MM-dd");
                        string eventStartTimeFormatted = DateTime.Parse(eventStartTime).ToString("HH:mm");

                        string eventCoverSource = coverElement.GetProperty("source").GetString();

                        eventInfoList.Add(new
                        {
                            id = eventId,
                            name = eventName,
                            start_date = eventStartDate,
                            start_time = eventStartTimeFormatted,
                            cover_source = eventCoverSource
                        });
                    }
                    else
                    {
                        throw new Exception("Event information not found in the response.");
                    }
                }
            }

            _cache.Set("PastEvents", eventInfoList, TimeSpan.FromMinutes(30));

            return Ok(eventInfoList);
        }

        [HttpGet("all-event-information/{eventId}")]
        public async Task<IActionResult> GetEventInformation(string eventId)
        {
            if (_cache.TryGetValue("EventInfo", out List<object> cachedEventInfoList))
                return Ok(cachedEventInfoList);

            if (string.IsNullOrEmpty(_keyService.PageAccessToken))
                throw new Exception("Long-lived page access token is not set.");

            string pageAccessToken = _keyService.PageAccessToken;
            string graphApiVersion = "v17.0";

            string url = $"https://graph.facebook.com/{graphApiVersion}/{eventId}?access_token={pageAccessToken}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);
            string responseContent = await response.Content.ReadAsStringAsync();

            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);

            if (jsonResponse.TryGetProperty("id", out var idElement) &&
                jsonResponse.TryGetProperty("name", out var nameElement) &&
                jsonResponse.TryGetProperty("description", out var descriptionElement) &&
                jsonResponse.TryGetProperty("start_time", out var startTimeElement))
            {
                string _id = idElement.GetString();
                string _name = nameElement.GetString();
                string _description = descriptionElement.GetString();
                string _startTime = startTimeElement.GetString();
                string _startDate = DateTime.Parse(_startTime).ToString("yyyy-MM-dd");
                string _startTimeFormatted = DateTime.Parse(_startTime).ToString("HH:mm");

                var eventInfo = new
                {
                    description = _description,
                    name = _name,
                    start_date = _startDate,
                    start_time = _startTimeFormatted,
                    id = _id,
                };

                _cache.Set("EventInfo", eventInfo, TimeSpan.FromMinutes(30));

                return Ok(eventInfo);
            }
            else
            {
                throw new Exception("Event information not found in the response.");
            }
        }
    }
}
