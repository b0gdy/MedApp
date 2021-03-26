namespace API.DTOs.ConsultationsDTOs
{
    public class ConsultationDTO
    {
        public string Treatment { get; set; }
        
        public int MedicId { get; set; }
        public int PacientId { get; set; }
    }
}