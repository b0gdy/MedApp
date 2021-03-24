using API.Entities;

namespace API.Interfaces
{
    public interface IPacientTokenService
    {
        string CreateToken(Pacient pacient);
    }
}
