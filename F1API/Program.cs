using DAO;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<F1DbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//--------------------------------------------------------------------------------------------------------------------------------//
builder.Services.AddScoped<Repository.DriverRepository>();
builder.Services.AddScoped<Repository.TeamRepository>();
builder.Services.AddScoped<Repository.CircuitRepository>();
//--------------------------------------------------------------------------------------------------------------------------------//
builder.Services.AddScoped<Services.DriverService>();
builder.Services.AddScoped<Services.IDriverService, Services.DriverService>();
builder.Services.AddScoped<Services.TeamService>();
builder.Services.AddScoped<Services.ITeamService, Services.TeamService>();
builder.Services.AddScoped<Services.CircuitService>();
builder.Services.AddScoped<Services.ICircuitService, Services.CircuitService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
