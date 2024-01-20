using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using org_api.Service;

class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddSingleton<HttpClient>();
        builder.Services.AddSingleton<KeyService>();
        builder.Services.AddControllers();
        builder.Services.AddAuthorization();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        if (builder.Environment.IsProduction())
        {
            var kvURL = builder.Configuration.GetSection("KeyVaultConfig:KeyVaultURL");

            var keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(new AzureServiceTokenProvider().KeyVaultTokenCallback));

            builder.Configuration.AddAzureKeyVault(kvURL.Value!.ToString(), new DefaultKeyVaultSecretManager());

            var client = new SecretClient(new Uri(kvURL.Value!.ToString()), new DefaultAzureCredential());

            builder.Services.AddSingleton(client);
        }

        // Services cors
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("ReactAppPolicy",
                builder => builder.WithOrigins(
                    "https://localhost:5173",
                    "https://orgspelforening.azurewebsites.net/"
                )
                .AllowAnyHeader()
                .AllowAnyMethod());
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // App cors
        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors("ReactAppPolicy");
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        // RUN APP
        app.Run();
    }
}
