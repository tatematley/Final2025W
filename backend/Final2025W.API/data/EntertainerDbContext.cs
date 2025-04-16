using Microsoft.EntityFrameworkCore;

namespace EntertainerAgency.API.data
{
    public class EntertainerDbContext : DbContext
    {
        public EntertainerDbContext(DbContextOptions<EntertainerDbContext> options) : base(options)
        {
        }
        
        public DbSet<Entertainer> Entertainers { get; set; }
        public DbSet<Engagement> Engagements { get; set; }

    }
    
}

