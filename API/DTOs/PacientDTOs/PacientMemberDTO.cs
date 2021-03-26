using System.Collections.Generic;
using API.DTOs.ConsultationsDTOs;

namespace API.DTOs.PacientDTOs
{
    public class PacientMemberDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public IList<ConsultationMemberDTO> Consultations { get; set; }
    }
}