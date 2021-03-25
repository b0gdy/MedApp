using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;

namespace API.Repositories.MedicPacientRepository
{
    public class MedicPacientRepository : IMedicPacientRepository
    {
        public DataContext _context { get; set; }

        public MedicPacientRepository(DataContext context)
        {
            _context = context;
        }

        public MedicPacient Create(MedicPacient MedicPacient)
        {
            var result = _context.Add<MedicPacient>(MedicPacient);
            _context.SaveChanges();
            return result.Entity;
            
        }

        public MedicPacient Get(int Id)
        {
            return _context.MedicPacients.SingleOrDefault(x => x.Id == Id);
        }

        /*
        public MedicPacient GetByMedicId(int MedicId)
        {
            return _context.MedicPacients.SingleOrDefault(x => x.MedicId == MedicId);
        }
        */

        public List<MedicPacient> GetAll()
        {
            return _context.MedicPacients.ToList();
        }

        public MedicPacient Update(MedicPacient MedicPacient)
        {
            _context.Entry(MedicPacient).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return MedicPacient;
        }
        
        public MedicPacient Delete(MedicPacient MedicPacient)
        {
            var result = _context.Remove(MedicPacient);
            _context.SaveChanges();
            return result.Entity;
        }   
    }
}