package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.Medie;
import ubb.ni.PostAcademic.domain.Nota;

public interface MedieRepo extends CrudRepository<Medie, Long> {
}
