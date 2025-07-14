using Microsoft.EntityFrameworkCore;
using Models;

namespace DAO
{
    public class F1DbContext : DbContext
    {
        public F1DbContext(DbContextOptions<F1DbContext> options) : base(options) { }

        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<RaceResult> RaceResults { get; set; }
        public DbSet<Circuit> Circuits { get; set; }
        public DbSet<Laptime> Laptime { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RaceResult>()
                .HasOne(rr => rr.Team)
                .WithMany()
                .HasForeignKey(rr => rr.TeamId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RaceResult>()
                .HasOne(rr => rr.Driver)
                .WithMany(d => d.RaceResults)
                .HasForeignKey(rr => rr.DriverId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Driver>()
                .HasOne(d => d.Team)
                .WithMany(t => t.Drivers)
                .HasForeignKey(d => d.TeamId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RaceResult>()
                .HasOne(rr => rr.Race)
                .WithMany(r => r.Results)
                .HasForeignKey(rr => rr.RaceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Race>()
                .HasMany(r => r.Laptimes)
                .WithOne(l => l.Race)
                .HasForeignKey(l => l.RaceId);

            // User configuration
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username).IsUnique();
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email).IsUnique();
        }
    }

}
