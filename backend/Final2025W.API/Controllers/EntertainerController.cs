using EntertainerAgency.API.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace EntertainerAgency.API.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class EntertainerController : ControllerBase
    {
        private EntertainerDbContext _entertainerContext;

        public EntertainerController(EntertainerDbContext temp) => _entertainerContext = temp;



        [HttpGet("{id}")]
        public IActionResult GetEntertainers(int id)
        {
            var entertainers = _entertainerContext.Entertainers.Find(id);
            if (entertainers == null)
                return NotFound();

            return Ok(entertainers);
        }



        // Add 
        [HttpPost("AddEntertainer")] 
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _entertainerContext.Entertainers.Add(newEntertainer);
            _entertainerContext.SaveChanges();
            return Ok(newEntertainer);
        }


        // Update
        [HttpPut("UpdateEntertainer/{EntertainerID}")]
        public IActionResult UpdateEntertainer(int EntertainerID, [FromBody] Entertainer updatedEntertainer)
        {
            var existingEntertainer = _entertainerContext.Entertainers.Find(EntertainerID);


            if (existingEntertainer == null)
            {
                return NotFound(new { message = "Entertainer not found." });
            }
            
            existingEntertainer.EntStageName = updatedEntertainer.EntStageName;
            existingEntertainer.EntSSN = updatedEntertainer.EntSSN;
            existingEntertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            existingEntertainer.EntCity = updatedEntertainer.EntCity;
            existingEntertainer.EntState = updatedEntertainer.EntState;
            existingEntertainer.EntZipCode = updatedEntertainer.EntZipCode;
            existingEntertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
            existingEntertainer.EntWebPage = updatedEntertainer.EntWebPage;
            existingEntertainer.EntEMailAddress = updatedEntertainer.EntEMailAddress;
            existingEntertainer.DateEntered = updatedEntertainer.DateEntered;

            _entertainerContext.Entertainers.Update(existingEntertainer);
            _entertainerContext.SaveChanges();

            return Ok(existingEntertainer);
        }

        // Delete
        [HttpDelete("DeleteEntertainer/{EntertainerID}")]
        public IActionResult DeleteEntertainer(int EntertainerID) 
        {
            var entertainer = _entertainerContext.Entertainers.Find(EntertainerID);

            if (entertainer == null) 
            {
                return NotFound(new {message = "Entertainer not found"});
            }
            
            _entertainerContext.Entertainers.Remove(entertainer);
            _entertainerContext.SaveChanges();

            return Ok(new { message = "Entertainer deleted successfully" });
        }

        [HttpGet("Summary")]
        public IActionResult GetEntertainerSummaries()
        {
            var summaries = _entertainerContext.Entertainers
                .Select(e => new EntertainerSummary
                {
                    EntertainerID = e.EntertainerID,
                    EntStageName = e.EntStageName,
                    TimesBooked = _entertainerContext.Engagements
                        .Count(g => g.EntertainerID == e.EntertainerID),
                    LastBookedDate = _entertainerContext.Engagements
                        .Where(g => g.EntertainerID == e.EntertainerID)
                        .Max(g => (DateTime?)g.EndDate) // Cast to nullable to handle entertainers with no bookings
                })
                .ToList();

            return Ok(summaries);
        }

        [HttpGet("{id}")]
        public IActionResult GetEntertainer(int id)
        {
            var entertainer = _entertainerContext.Entertainers.Find(id);

            if (entertainer == null)
                return NotFound();

            return Ok(entertainer);
        }




    }
}
