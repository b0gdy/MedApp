using System.Collections.Generic;

namespace API.Entities
{
    public class Medic
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Specialty { get; set; }
        //public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public List<Consultation> Consultations { get; set; }
        public List<Appointment> Appointments { get; set; }
    }
}
