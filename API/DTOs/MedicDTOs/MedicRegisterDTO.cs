using System.ComponentModel.DataAnnotations;

namespace API.DTOs.MedicDTOs
{
    public class MedicRegisterDTO
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
