using System.Collections.Generic;
using API.DTOs;
using API.Entities;

namespace API.Repositories.MedicRepository
{
    public interface IMedicRepository
    {
        List<Medic> GetAll();
        Medic GetById(int Id);
        MedicMemberDTO GetByUserName(string UserName);
        Medic Create(Medic Medic);
        Medic Update(Medic Medic);
        Medic Delete(Medic Medic);
    }
}
