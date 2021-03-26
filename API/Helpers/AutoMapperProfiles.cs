using API.DTOs.ConsultationsDTOs;
using API.DTOs.MedicDTOs;
using API.DTOs.PacientDTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Pacient, PacientMemberDTO>();
            CreateMap<Medic, MedicMemberDTO>();
            // CreateMap<Pacient, PacientMemberDTO>();
            CreateMap<Consultation, ConsultationMemberDTO>();
        }
    }
}