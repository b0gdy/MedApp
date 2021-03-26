using System.Collections.Generic;
using API.DTOs;
using API.DTOs.ConsultationsDTOs;
using API.Entities;
using API.Repositories.ConsultationRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultationController : ControllerBase
    {
        public IConsultationRepository IConsultationRepository { get; set; }
        public ConsultationController(IConsultationRepository repository)
        {
            IConsultationRepository = repository;
        }

        // GET: api/Provider
        [HttpGet]
        public ActionResult<IEnumerable<Consultation>> Get()
        {
            return IConsultationRepository.GetAll();
        }

        // GET: api/Provider/5
        [HttpGet("{id}")]
        public ActionResult<Consultation> Get(int id)
        {
            return IConsultationRepository.Get(id);
        }

        // POST: api/Provider
        [HttpPost]
        public Consultation Post(ConsultationDTO value)
        {
            Consultation model = new Consultation()
            {
                Treatment = value.Treatment,
                MedicId = value.MedicId,
                PacientId = value.PacientId
            };
            return IConsultationRepository.Create(model);
        }

        // PUT: api/Provider/5
        [HttpPut("{id}")]
        public Consultation Put(int id, ConsultationDTO value)
        {
            Consultation model = IConsultationRepository.Get(id);
            if (value.Treatment != null)
            {
                model.Treatment = value.Treatment;
            }
            if (value.MedicId != 0)
            {
                model.MedicId = value.MedicId;
            }
            if (value.PacientId != 0)
            {
                model.PacientId = value.PacientId;
            }
            return IConsultationRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Consultation Delete(int id)
        {
            Consultation Consultation = IConsultationRepository.Get(id);
            return IConsultationRepository.Delete(Consultation);
        }
    }
}
