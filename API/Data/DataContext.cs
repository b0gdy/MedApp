using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Pacient> Pacients { get; set; }
        public DbSet<Medic> Medics { get; set; }
        public DbSet<Consultation> Consultations { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
    }
}
