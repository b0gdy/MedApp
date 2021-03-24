using API.Entities;

namespace API.Interfaces
{
    public interface IMedicTokenService
    {
        string CreateToken(Medic medic);
    }
}
