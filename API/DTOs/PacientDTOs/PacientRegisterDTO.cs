using System.ComponentModel.DataAnnotations;

namespace API.DTOs.PacientDTOs
{
    public class PacientRegisterDTO
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string BirthDate { get; set; }
    }
}
