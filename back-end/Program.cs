using Azure.Identity;
using Microsoft.Extensions.Azure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAzureClients(builder =>
  {
      builder.AddBlobServiceClient("DefaultEndpointsProtocol=https;AccountName=poctim;AccountKey=HHl//pVjjVROCWtUVhGY6mq8rL+6ISYjVW+RNPhCimvRUV7wNrFKUna0z3Z3wivfgfvpCwUu5uyj+AStjL8LGw==;EndpointSuffix=core.windows.net");
      builder.UseCredential(new EnvironmentCredential());
  });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => { x.AllowAnyHeader(); x.AllowAnyMethod(); x.AllowAnyOrigin(); });

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
