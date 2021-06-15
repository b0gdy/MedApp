using System.Collections.Generic;
using API.Entities;

namespace API.Repositories.AppointmentRepository
{
    public interface IAppointmentRepository
    {
        List<Appointment> GetAll();
        Appointment Get(int Id);
        Appointment Create(Appointment Appointment);
        Appointment Update(Appointment Appointment);
        Appointment Delete(Appointment Appointment); 
    }
}