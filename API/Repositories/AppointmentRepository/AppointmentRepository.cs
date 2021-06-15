using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;

namespace API.Repositories.AppointmentRepository
{
    public class AppointmentRepository : IAppointmentRepository
    {
        public DataContext _context { get; set; }

        public AppointmentRepository(DataContext context)
        {
            _context = context;
        }

        public Appointment Create(Appointment Appointment)
        {
            var result = _context.Add<Appointment>(Appointment);
            _context.SaveChanges();
            return result.Entity;
            
        }

        public Appointment Get(int Id)
        {
            return _context.Appointments.SingleOrDefault(x => x.Id == Id);
        }

        public List<Appointment> GetAll()
        {
            return _context.Appointments.ToList();
        }

        public Appointment Update(Appointment Appointment)
        {
            _context.Entry(Appointment).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return Appointment;
        }
        
        public Appointment Delete(Appointment Appointment)
        {
            var result = _context.Remove(Appointment);
            _context.SaveChanges();
            return result.Entity;
        }  
    }
}