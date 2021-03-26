using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.DTOs;
using API.DTOs.MedicDTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.MedicRepository
{
    public class MedicRepository : IMedicRepository
    {
        public DataContext _context { get; set; }
        public IMapper _mapper {get; set; }

        public MedicRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Medic Create(Medic Medic)
        {
            var result = _context.Add<Medic>(Medic);
            _context.SaveChanges();
            return result.Entity;
            
        }

       public Medic Get(int Id)
        {
            return _context.Medics.SingleOrDefault(x => x.Id == Id);
        }

        public MedicMemberDTO GetByUserName(string UserName)
        {
            return _context.Medics
                .Where(x => x.UserName == UserName)
                .ProjectTo<MedicMemberDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefault();
        }

        public List<Medic> GetAll()
        {
            return _context.Medics.ToList();
        }

        public Medic Update(Medic Medic)
        {
            _context.Entry(Medic).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return Medic;
        }
        
        public Medic Delete(Medic Medic)
        {
            var result = _context.Remove(Medic);
            _context.SaveChanges();
            return result.Entity;
        }   
    }
}