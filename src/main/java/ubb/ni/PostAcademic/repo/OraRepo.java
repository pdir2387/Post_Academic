package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.Ora;


public interface OraRepo extends CrudRepository<Ora, Long> {
    Ora findFirstByZiAndOraStart(String zi, Integer oraStart);
}
