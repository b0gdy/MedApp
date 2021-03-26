using System.ComponentModel.DataAnnotations;

namespace API.DTOs.PacientDTOs
{
    public class PacientRegisterDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
