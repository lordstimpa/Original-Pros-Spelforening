using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using org_api.Service;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Services registration
        builder.Services.AddHttpClient();
        builder.Services.AddControllers();
        builder.Services.AddAuthorization();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // CORS policy registration
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("ReactAppPolicy",
                builder => builder.WithOrigins(
                    "https://localhost:5173",
                    "https://orgspelforening.azurewebsites.net"
                )
                .AllowAnyHeader()
                .AllowAnyMethod());
        });

        // Azure Key Vault setup
        var keyVaultURL = builder.Configuration.GetSection("KeyVaultConfig:KeyVaultURL").Value;
        var credential = new DefaultAzureCredential();
        var secretClient = new SecretClient(new Uri(keyVaultURL), credential);
        builder.Services.AddSingleton(secretClient);
        builder.Services.AddSingleton<KeyService>();

        // Development-specific configurations
        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Your API", Version = "v1" });
            });
        }

        // Configure application
        var app = builder.Build();

        if (builder.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // General middleware
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseCors("ReactAppPolicy");
        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            endpoints.MapFallbackToFile("index.html");
        });

        // Run the application
        app.Run();
    }
}