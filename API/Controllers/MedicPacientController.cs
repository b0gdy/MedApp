using System.Collections.Generic;
using API.DTOs;
using API.Entities;
using API.Repositories.MedicPacientRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicPacientController : ControllerBase
    {
        public IMedicPacientRepository IMedicPacientRepository { get; set; }
        public MedicPacientController(IMedicPacientRepository repository)
        {
            IMedicPacientRepository = repository;
        }

        // GET: api/Provider
        [HttpGet]
        public ActionResult<IEnumerable<MedicPacient>> Get()
        {
            return IMedicPacientRepository.GetAll();
        }

        // GET: api/Provider/5
        [HttpGet("{id}")]
        public ActionResult<MedicPacient> Get(int id)
        {
            return IMedicPacientRepository.Get(id);
        }

        /*
        [HttpGet("{medicId}", Name = "GetByMedicId")]
        public ActionResult<MedicPacient> GetByMedicId(int MedicId)
        {
            return IMedicPacientRepository.GetByMedicId(MedicId);
        }
        */

        // POST: api/Provider
        [HttpPost]
        public MedicPacient Post(MedicPacientDTO value)
        {
            MedicPacient model = new MedicPacient()
            {
                MedicId= value.MedicId,
                PacientId=value.PacientId
            };
            return IMedicPacientRepository.Create(model);
        }

        // PUT: api/Provider/5
        [HttpPut("{id}")]
        public MedicPacient Put(int id, MedicPacientDTO value)
        {
            MedicPacient model = IMedicPacientRepository.Get(id);
            if (value.MedicId!= 0)
            {
                model.MedicId = value.MedicId;
            }
            if (value.PacientId != 0)
            {
                model.PacientId = value.PacientId;
            }
            return IMedicPacientRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public MedicPacient Delete(int id)
        {
            MedicPacient MedicPacient = IMedicPacientRepository.Get(id);
            return IMedicPacientRepository.Delete(MedicPacient);
        }
    }
}
