using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;

namespace API.Repositories.PacientRepository
{
    public class PacientRepository : IPacientRepository
    {
        public DataContext _context { get; set; }

        public PacientRepository(DataContext context)
        {
            _context = context;
        }

        public Pacient Create(Pacient Pacient)
        {
            var result = _context.Add<Pacient>(Pacient);
            _context.SaveChanges();
            return result.Entity;
            
        }

        public Pacient Get(int Id)
        {
            return _context.Pacients.SingleOrDefault(x => x.Id == Id);
        }

        public List<Pacient> GetAll()
        {
            return _context.Pacients.ToList();
        }

        public Pacient Update(Pacient Pacient)
        {
            _context.Entry(Pacient).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return Pacient;
        }
        
        public Pacient Delete(Pacient Pacient)
        {
            var result = _context.Remove(Pacient);
            _context.SaveChanges();
            return result.Entity;
        }
    }
}
