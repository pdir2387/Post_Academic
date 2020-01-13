package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.ContractStudii;
import ubb.ni.PostAcademic.domain.Disciplina;
import ubb.ni.PostAcademic.domain.Ora;

import java.util.List;

public interface ContractRepo extends CrudRepository<ContractStudii, Long> {
    ContractStudii findContractStudiiByAnStart(Integer anStart);
}
