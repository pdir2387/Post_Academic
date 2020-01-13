package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.Facultate;
import ubb.ni.PostAcademic.domain.Specializare;

public interface SpecializareRepo extends CrudRepository<Specializare, Long> {

    Specializare getSpecializareByNumeAndFacultate(String nume, Facultate facultate);
}
