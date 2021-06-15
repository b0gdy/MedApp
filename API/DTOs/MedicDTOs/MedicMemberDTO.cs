using System.Collections.Generic;
using API.DTOs.AppointmentDTOs;
using API.DTOs.ConsultationsDTOs;

namespace API.DTOs.MedicDTOs
{
    public class MedicMemberDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Specialty { get; set; }

        public IList<ConsultationMemberDTO> Consultations { get; set; }
        public IList<AppointmentMemberDTO> Appointments { get; set; }
    }
}