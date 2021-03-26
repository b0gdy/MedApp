using System.Collections.Generic;
using API.DTOs;
using API.DTOs.PacientDTOs;
using API.Entities;

namespace API.Repositories.PacientRepository
{
    public interface IPacientRepository
    {
        List<Pacient> GetAll();
        Pacient Get(int Id);
        PacientMemberDTO GetByUserName(string UserName);
        Pacient Create(Pacient Pacient);
        Pacient Update(Pacient Pacient);
        Pacient Delete(Pacient Pacient);
    }
}
