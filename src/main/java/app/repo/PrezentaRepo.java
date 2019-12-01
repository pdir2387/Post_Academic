package app.repo;

import app.domain.Prezenta;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "prezente", path = "prezente")
public interface PrezentaRepo extends PagingAndSortingRepository<Prezenta, Long> {

    List<Prezenta> findByStudent(@Param("student") Long student);
}
