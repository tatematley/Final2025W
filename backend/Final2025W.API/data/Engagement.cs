using System.ComponentModel.DataAnnotations;
using EntertainerAgency.API.data; 
namespace EntertainerAgency.API.data
{
    public class Engagement
    {
        [Key]
        public int EngagementNumber { get; set; }

        public int EntertainerID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public Entertainer Entertainer { get; set; } 
    }
}