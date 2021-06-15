using System.Collections.Generic;
using API.DTOs;
using API.DTOs.PacientDTOs;
using API.Entities;
using API.Repositories.PacientRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PacientController : ControllerBase
    {
        public IPacientRepository IPacientRepository { get; set; }
        public PacientController(IPacientRepository repository)
        {
            IPacientRepository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Pacient>> Get()
        {
            return IPacientRepository.GetAll();
        }

        [HttpGet("{id:int}")]
        public ActionResult<Pacient> Get(int id)
        {
            return IPacientRepository.Get(id);
        }

        [HttpGet("{userName}")]
        public ActionResult<PacientMemberDTO> GetByUserName(string userName)
        {
            return IPacientRepository.GetByUserName(userName);
        }

        // POST: api/Provider
        [HttpPost]
        public Pacient Post(PacientDTO value)
        {
            Pacient model = new Pacient()
            {
                UserName = value.UserName,
                FirstName = value.FirstName,
                LastName = value.LastName,
                Gender = value.Gender,
                BirthDate = value.BirthDate,
                // Password = value.Password,
            };
            return IPacientRepository.Create(model);
        }

        // PUT: api/Provider/5
        [HttpPut]
        public Pacient Put(PacientDTO value)
        {
            Pacient model = IPacientRepository.Get(value.Id);
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
            if (value.Gender != null)
            {
                model.Gender = value.Gender;
            }
            if (value.BirthDate != null)
            {
                model.BirthDate = value.BirthDate;
            }
            /*
            if (value.Password != null)
            {
                model.Password = value.Password;
            }
            */
            return IPacientRepository.Update(model);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public Pacient Delete(int id)
        {
            Pacient Pacient = IPacientRepository.Get(id);
            return IPacientRepository.Delete(Pacient);
        }
    }
}
