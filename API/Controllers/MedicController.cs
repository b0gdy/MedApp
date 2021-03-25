using System.Collections.Generic;
using API.DTOs;
using API.Entities;
using API.Repositories.MedicPacientRepository;
using API.Repositories.MedicRepository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicController : ControllerBase
    {
        public IMedicRepository IMedicRepository { get; set; }

        public MedicController(IMedicRepository repository)
        {
            IMedicRepository = repository;
        }

        // GET: api/Provider
        [HttpGet]
        public ActionResult<IEnumerable<Medic>> GetAll()
        {
            return IMedicRepository.GetAll();
        }

        // GET: api/Provider/5
        [HttpGet("{id:int}", Name = "GetById")]
        public ActionResult<Medic> GetById(int id)
        {
            return IMedicRepository.GetById(id);
        }

        [HttpGet("{userName}", Name = "GetByUserName")]
        public ActionResult<MedicMemberDTO> GetByUserName(string userName)
        {
            return IMedicRepository.GetByUserName(userName);
        }

        // POST: api/Provider
        [HttpPost]
        public Medic Post(MedicDTO value)
        {
            Medic model = new Medic()
            {
                UserName = value.UserName,
                FirstName = value.FirstName,
                LastName = value.LastName,
                // Password = value.Password,
            };
            return IMedicRepository.Create(model);
        }

        // PUT: api/Provider/5
        [HttpPut("{id}")]
        public Medic Put(int id, MedicDTO value)
        {
            Medic model = IMedicRepository.GetById(id);
            if (value.UserName != null)
            {
                model.UserName = value.UserName;
            }
            if (value.FirstName != null)
            {
                model.FirstName = value.FirstName;
            }
            if (value.LastName != null)
            {
                model.LastName = value.LastName;
            }
            /*
            if (value.Password != null)
            {
                model.Password = value.Password;
            }
            */
            return IMedicRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Medic Delete(int id)
        {
            Medic Medic = IMedicRepository.GetById(id);
            return IMedicRepository.Delete(Medic);
        }
    }
}
