package ubb.ni.PostAcademic.repo;

import org.springframework.data.repository.CrudRepository;
import ubb.ni.PostAcademic.domain.Disciplina;

public interface DisciplinaRepo extends CrudRepository<Disciplina, Long> {
    Disciplina getDisciplinaByCodDisciplina(String codDisciplina);

    Disciplina getFirstByCodDisciplina(String codDisciplina);
}

