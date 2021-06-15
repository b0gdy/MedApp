using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.AppointmentDTOs;
using API.Entities;
using API.Repositories.AppointmentRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.AppointmentControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppointmentController : ControllerBase
    {
        public IAppointmentRepository IAppointmentRepository { get; set; }
        public AppointmentController(IAppointmentRepository repository)
        {
            IAppointmentRepository = repository;
        }

        // GET: api/Provider
        [HttpGet]
        public ActionResult<IEnumerable<Appointment>> Get()
        {
            return IAppointmentRepository.GetAll();
        }

        // GET: api/Provider/5
        [HttpGet("{id}")]
        public ActionResult<Appointment> Get(int id)
        {
            return IAppointmentRepository.Get(id);
        }

        // POST: api/Provider
        [HttpPost]
        public Appointment Post(AppointmentDTO value)
        {
            Appointment model = new Appointment()
            {
                Date = value.Date,
                MedicId = value.MedicId,
                PacientId = value.PacientId,
            };
            return IAppointmentRepository.Create(model);
        }

        // PUT: api/Provider/5
        [HttpPut]
        public Appointment Put(AppointmentDTO value)
        {
            Appointment model = IAppointmentRepository.Get(value.Id);
            if (value.Date != null)
            {
                model.Date = value.Date;
            }
            if (value.MedicId != 0)
            {
                model.MedicId = value.MedicId;
            }
            if (value.PacientId != 0)
            {
                model.PacientId = value.PacientId;
            }
            return IAppointmentRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Appointment Delete(int id)
        {
            Appointment Appointment = IAppointmentRepository.Get(id);
            return IAppointmentRepository.Delete(Appointment);
        }
    }
}