using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;

namespace API.Repositories.ConsultationRepository
{
    public class ConsultationRepository : IConsultationRepository
    {
        public DataContext _context { get; set; }

        public ConsultationRepository(DataContext context)
        {
            _context = context;
        }

        public Consultation Create(Consultation Consultation)
        {
            var result = _context.Add<Consultation>(Consultation);
            _context.SaveChanges();
            return result.Entity;
            
        }

        public Consultation Get(int Id)
        {
            return _context.Consultations.SingleOrDefault(x => x.Id == Id);
        }

        public List<Consultation> GetAll()
        {
            return _context.Consultations.ToList();
        }

        public Consultation Update(Consultation Consultation)
        {
            _context.Entry(Consultation).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return Consultation;
        }
        
        public Consultation Delete(Consultation Consultation)
        {
            var result = _context.Remove(Consultation);
            _context.SaveChanges();
            return result.Entity;
        }   
    }
}
