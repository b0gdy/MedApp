using System.Collections.Generic;
using API.Entities;

namespace API.Repositories.MedicRepository
{
    public interface IMedicRepository
    {
        List<Medic> GetAll();
        Medic Get(int Id);
        Medic Create(Medic Pacient);
        Medic Update(Medic Pacient);
        Medic Delete(Medic Pacient);
    }
}
