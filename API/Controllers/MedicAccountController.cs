using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
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
            if (await MedicExists(medicRegisterDTO.UserName)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var medic = new Medic
            {
                UserName = medicRegisterDTO.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(medicRegisterDTO.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Medics.Add(medic);
            await _context.SaveChangesAsync();

            return new MedicDTO
            {
                UserName = medic.UserName,
                Token = _medicTokenService.CreateToken(medic)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<MedicDTO>> Login(MedicLoginDTO medicLoginDTO)
        {
            var medic = await _context.Medics.SingleOrDefaultAsync(x => x.UserName == medicLoginDTO.UserName.ToLower());

            if (medic == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(medic.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(medicLoginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != medic.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new MedicDTO
            {
                UserName = medic.UserName,
                Token = _medicTokenService.CreateToken(medic)
            };
        }

        private async Task<bool> MedicExists(string userName)
        {
            return await _context.Medics.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}
