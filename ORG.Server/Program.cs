using Azure.Identity;
using org_api.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<HttpClient>();
builder.Services.AddSingleton<KeyService>();
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var keyVaultUrl = new Uri(builder.Configuration.GetSection("KeyVaultURL").Value!);
var azureCredential = new DefaultAzureCredential();
builder.Configuration.AddAzureKeyVault(keyVaultUrl, azureCredential);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactAppPolicy",
        builder => builder.AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

// Retrieve the dynamic origin from configuration
var appUrl = builder.Configuration.GetSection("APP_URL").Value;

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

// Update the CORS policy with the dynamic origin
app.UseCors(builder => builder.WithOrigins(appUrl).AllowAnyHeader().AllowAnyMethod());

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();