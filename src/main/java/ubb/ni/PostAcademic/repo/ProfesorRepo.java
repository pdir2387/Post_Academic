package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.Profesor;
import ubb.ni.PostAcademic.domain.Student;

public interface ProfesorRepo extends CrudRepository<Profesor, Long> {
    Profesor getProfesorByNume(String nume);
}