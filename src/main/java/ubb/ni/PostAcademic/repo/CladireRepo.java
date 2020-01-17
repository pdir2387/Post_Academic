package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.Cladire;

import java.util.Optional;

public interface CladireRepo extends CrudRepository<Cladire, Long> {
    Cladire findByNume(String nume);
}
