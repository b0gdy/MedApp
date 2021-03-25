using System.Collections.Generic;

namespace API.DTOs
{
    public class MedicMemberDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public List<MedicPacientDTO> MedicPacient { get; set; }
    }
}