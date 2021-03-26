namespace API.Entities
{
    public class Consultation
    {
        public int Id { get; set; }
        public string Treatment { get; set; }

        public int MedicId { get; set; }
        public int PacientId { get; set; }

        public virtual Medic Medic { get; set; }
        public virtual Pacient Pacient { get; set; }
    }
}