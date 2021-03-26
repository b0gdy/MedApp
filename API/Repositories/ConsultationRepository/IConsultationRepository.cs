using System.Collections.Generic;
using API.Entities;

namespace API.Repositories.ConsultationRepository
{
    public interface IConsultationRepository
    {
        List<Consultation> GetAll();
        Consultation Get(int Id);
        Consultation Create(Consultation Consultation);
        Consultation Update(Consultation Consultation);
        Consultation Delete(Consultation Consultation);
    }
}