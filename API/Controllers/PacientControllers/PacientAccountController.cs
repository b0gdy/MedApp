using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.PacientDTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PacientAccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IPacientTokenService _pacientTokenService;
        public PacientAccountController(DataContext context, IPacientTokenService pacientTokenService)
        {
            _pacientTokenService = pacientTokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<PacientDTO>> Register(PacientRegisterDTO pacientRegisterDTO)
        {
            if (await PacientExists(pacientRegisterDTO.UserName)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var pacient = new Pacient
            {
                UserName = pacientRegisterDTO.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pacientRegisterDTO.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Pacients.Add(pacient);
            await _context.SaveChangesAsync();

            return new PacientDTO
            {
                UserName = pacient.UserName,
                Token = _pacientTokenService.CreateToken(pacient)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<PacientDTO>> Login(PacientLoginDTO pacientLoginDTO)
        {
            var pacient = await _context.Pacients.SingleOrDefaultAsync(x => x.UserName == pacientLoginDTO.UserName.ToLower());

            if (pacient == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(pacient.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pacientLoginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != pacient.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new PacientDTO
            {
                UserName = pacient.UserName,
                FirstName = pacient.FirstName,
                LastName = pacient.LastName,
                Token = _pacientTokenService.CreateToken(pacient)
            };
        }

        private async Task<bool> PacientExists(string userName)
        {
            return await _context.Pacients.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}