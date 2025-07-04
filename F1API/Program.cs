using DAO;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://localhost:5173", "http://localhost:3000", "https://localhost:3000", "http://localhost:7069", "https://localhost:7069")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<F1DbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//--------------------------------------------------------------------------------------------------------------------------------//
builder.Services.AddScoped<Repository.DriverRepository>();
builder.Services.AddScoped<Repository.TeamRepository>();
builder.Services.AddScoped<Repository.CircuitRepository>();
builder.Services.AddScoped<Repository.RaceResultRepository>();
builder.Services.AddScoped<Repository.RaceRepository>();
//--------------------------------------------------------------------------------------------------------------------------------//
builder.Services.AddScoped<Services.DriverService>();
builder.Services.AddScoped<Services.IDriverService, Services.DriverService>();
builder.Services.AddScoped<Services.TeamService>();
builder.Services.AddScoped<Services.ITeamService, Services.TeamService>();
builder.Services.AddScoped<Services.CircuitService>();
builder.Services.AddScoped<Services.ICircuitService, Services.CircuitService>();
builder.Services.AddScoped<Services.RaceResultService>();
builder.Services.AddScoped<Services.IRaceResultService, Services.RaceResultService>();
builder.Services.AddScoped<Services.RaceService>();
builder.Services.AddScoped<Services.IRaceService, Services.RaceService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
