using System.Threading.Tasks;
using API.Data;
using API.DTOs.AppointmentDTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.AppointmentControllers
{
    [Authorize]
    public class AppointmentMemberController : BaseApiController
    {
        private readonly DataContext _context;
        public AppointmentMemberController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppointmentDTO>> Register(AppointmentDTO appointmentDTO)
        {
            if (await AppointmentExists(appointmentDTO.Date)) return BadRequest("Date is taken");
            
            var appointment = new Appointment
            {
                Date = appointmentDTO.Date,
                MedicId = appointmentDTO.MedicId,
                PacientId = appointmentDTO.PacientId,
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return new AppointmentDTO
            {
                Date = appointment.Date,
                MedicId = appointment.MedicId,
                PacientId = appointment.PacientId,
            };
        }

        private async Task<bool> AppointmentExists(string date)
        {
            return await _context.Appointments.AnyAsync(x => x.Date == date);
        }
    }
}