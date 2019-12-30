package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.Student;

public interface StudentRepo extends CrudRepository<Student, Long> {
}
