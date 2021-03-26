using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.DTOs;
using API.DTOs.PacientDTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace API.Repositories.PacientRepository
{
    public class PacientRepository : IPacientRepository
    {
        public DataContext _context { get; set; }
        public IMapper _mapper {get; set; }

        public PacientRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

        public PacientMemberDTO GetByUserName(string UserName)
        {
            return _context.Pacients
                .Where(x => x.UserName == UserName)
                .ProjectTo<PacientMemberDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefault();
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
