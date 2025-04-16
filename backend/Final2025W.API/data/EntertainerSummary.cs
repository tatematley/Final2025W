namespace EntertainerAgency.API.data
{
    public class EntertainerSummary
    {
        public int EntertainerID { get; set; }
        public string EntStageName { get; set; }
        public int TimesBooked { get; set; }
        public DateTime? LastBookedDate { get; set; }
    }
}
