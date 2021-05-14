using System;

namespace API.DTOs.ConsultationsDTOs
{
    public class ConsultationDTO
    {
        public int Id { get; set; }
        public string Treatment { get; set; }
        public DateTime Created { get; set; }

        public int MedicId { get; set; }
        public int PacientId { get; set; }
    }
}