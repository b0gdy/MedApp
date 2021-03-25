using System.Collections.Generic;
using API.Entities;

namespace API.Repositories.MedicPacientRepository
{
    public interface IMedicPacientRepository
    {
        List<MedicPacient> GetAll();
        MedicPacient Get(int Id);
        // MedicPacient GetByMedicId(int MedicId);
        MedicPacient Create(MedicPacient MedicPacient);
        MedicPacient Update(MedicPacient MedicPacient);
        MedicPacient Delete(MedicPacient MedicPacient);
    }
}
