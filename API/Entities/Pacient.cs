using System.Collections.Generic;

namespace API.Entities
{
    public class Pacient
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        //public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        // public List<Appointment> Appointment { get; set; }
        // public List<PacientMedic> PacientMedic { get; set; }
    }
}
