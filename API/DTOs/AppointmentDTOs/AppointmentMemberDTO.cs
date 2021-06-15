namespace API.DTOs.AppointmentDTOs
{
    public class AppointmentMemberDTO
    {
        public int Id { get; set; }
        public string Date { get; set; }
        
        public int MedicId { get; set; }
        public int PacientId { get; set; }
    }
}