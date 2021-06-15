namespace API.DTOs.AppointmentDTOs
{
    public class AppointmentDTO
    {
        public int Id { get; set; }
        public string Date { get; set; }
        
        public int MedicId { get; set; }
        public int PacientId { get; set; }
    }
}