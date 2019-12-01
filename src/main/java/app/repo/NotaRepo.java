package app.repo;

import app.domain.Nota;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "ore", path = "ore")
public interface NotaRepo extends PagingAndSortingRepository<Nota, Long> {

    List<Nota> findByStudent(@Param("student") Long student);
}
