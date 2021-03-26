using System.Collections.Generic;
using API.DTOs;
using API.DTOs.MedicDTOs;
using API.Entities;

namespace API.Repositories.MedicRepository
{
    public interface IMedicRepository
    {
        List<Medic> GetAll();
        Medic Get(int Id);
        MedicMemberDTO GetByUserName(string UserName);
        Medic Create(Medic Medic);
        Medic Update(Medic Medic);
        Medic Delete(Medic Medic);
    }
}
