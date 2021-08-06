using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.MedicDTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MedicAccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMedicTokenService _medicTokenService;
        public MedicAccountController(DataContext context, IMedicTokenService medicTokenService)
        {
            _medicTokenService = medicTokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<MedicDTO>> Register(MedicRegisterDTO medicRegisterDTO)
        {
            if (await MedicExists(medicRegisterDTO.UserName)) return BadRequest("Username folosit!");

            using var hmac = new HMACSHA512();

            var medic = new Medic
            {
                Id = medicRegisterDTO.Id,
                UserName = medicRegisterDTO.UserName.ToLower(),
                FirstName = medicRegisterDTO.FirstName,
                LastName = medicRegisterDTO.LastName,
                Specialty = medicRegisterDTO.Specialty,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(medicRegisterDTO.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Medics.Add(medic);
            await _context.SaveChangesAsync();

            return new MedicDTO
            {
                Id = medic.Id,
                UserName = medic.UserName,
                FirstName = medic.FirstName,
                LastName = medic.LastName,
                Specialty = medic.Specialty,
                Token = _medicTokenService.CreateToken(medic)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<MedicDTO>> Login(MedicLoginDTO medicLoginDTO)
        {
            var medic = await _context.Medics.SingleOrDefaultAsync(x => x.UserName == medicLoginDTO.UserName.ToLower());

            if (medic == null) return Unauthorized("Username invalid!");

            using var hmac = new HMACSHA512(medic.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(medicLoginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != medic.PasswordHash[i]) return Unauthorized("Parolă invalidă!");
            }

            return new MedicDTO
            {
                Id = medic.Id,
                UserName = medic.UserName,
                FirstName = medic.FirstName,
                LastName = medic.LastName,
                Specialty = medic.Specialty,
                Token = _medicTokenService.CreateToken(medic)
            };
        }

        private async Task<bool> MedicExists(string userName)
        {
            return await _context.Medics.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}
