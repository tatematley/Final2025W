using Microsoft.EntityFrameworkCore;
using EntertainerAgency.API.data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// REPLACE THE https LINK TO WHAT THE DEPLOYED LINK IS 
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactAppBlah", 
    policy => {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    }));


builder.Services.AddDbContext<EntertainerDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("EntertainmentConnection")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactAppBlah");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
