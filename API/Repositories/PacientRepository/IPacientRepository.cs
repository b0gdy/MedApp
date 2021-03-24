using System.Collections.Generic;
using API.Entities;

namespace API.Repositories.PacientRepository
{
    public interface IPacientRepository
    {
        List<Pacient> GetAll();
        Pacient Get(int Id);
        Pacient Create(Pacient Pacient);
        Pacient Update(Pacient Pacient);
        Pacient Delete(Pacient Pacient);
    }
}
