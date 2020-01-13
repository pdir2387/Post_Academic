package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.Sala;

public interface SalaRepo extends CrudRepository<Sala, Long>
{
    Sala getSalaByNume(String nume);
}
