package ubb.ni.PostAcademic.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.DisciplinaRepo;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class DisciplinaServiceTest {
    @Mock
    DisciplinaRepo disciplinaRepo;
    @Mock
    UserService userService;
    @InjectMocks
    DisciplinaService disciplinaService;

    private Student student = new Student("Mihai",
            "65443223452",
            "0723453654",
            "dfs3685",
            new Grupa("254",
                    new Specializare("Informatica",
                            3,
                            new Facultate("Matematica - Informatica")),
                    2),
            1,
            "any@email.com",
            2018,
            new ArrayList<>(),
            new User());

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        List<ContractStudii> contractStudiiList = new ArrayList<>();
        contractStudiiList.add(new ContractStudii(2018));
        contractStudiiList.add(new ContractStudii(2019));
        student.setContracteStudii(contractStudiiList);
    }

    @Test
    void testAddMateriiToContract_AcountTypeIncorect() {
        Student student = null;
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        disciplinaService.addMateriiToContract(new User("any", "pass", AccountType.profesor), new ArrayList<>());

        assertNull(student);
    }

    @Test
    void testAddMateriiToContract_NoContract() {
        student.setContracteStudii(new ArrayList<>());
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        disciplinaService.addMateriiToContract(new User("any", "pass", AccountType.student), new ArrayList<>());

        assertEquals(0, student.getContracteStudii().size());
    }

    @Test
    void testAddMateriiToContract_DisciplinaNotFound() {   //todo: for de add conditie add if not null
        ArrayList<Disciplina> discipline = new ArrayList<>();
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(disciplinaRepo.findAll()).thenReturn(discipline);

        ArrayList<String> materii = new ArrayList<>();
        materii.add("Algebra");
        disciplinaService.addMateriiToContract(new User("any", "pass", AccountType.student), materii);

        assertEquals(2, student.getContracteStudii().size());
        assertEquals(0, student.getContracteStudii().get(0).getDiscipline().size());
        assertEquals(0, student.getContracteStudii().get(1).getDiscipline().size());
    }

    @Test
    void testAddMateriiToContract_Add() {   //todo: for de add conditie add if not null
        ArrayList<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare(),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        when(userService.getStudentByUsername(anyString())).thenReturn(student);

        ArrayList<String> materii = new ArrayList<>();
        materii.add("baze_de_date");
        disciplinaService.addMateriiToContract(new User("any", "pass", AccountType.student), materii);

        assertEquals(2, student.getContracteStudii().size());
        assertEquals(1, student.getContracteStudii().get(0).getDiscipline().size());
        assertEquals(0, student.getContracteStudii().get(1).getDiscipline().size());
    }

    @Test
    void testFindDisciplina_NotExist() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        when(disciplinaRepo.findAll()).thenReturn(discipline);

        assertNull(disciplinaService.findDisciplina("cod"));
    }

    @Test
    void testFindDisciplina_NotFound() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare(),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        assertNull(disciplinaService.findDisciplina("cod"));
    }

    @Test
    void testFindDisciplina_Found() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare(),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        assertEquals(discipline.get(0), disciplinaService.findDisciplina("baze_de_date"));
    }

    @Test
    void testGetDisciplineBySemestru_AcountTypeIncorect() {
        Student student = null;
        when(userService.getStudentByUsername(anyString())).thenReturn(student);

        List<Disciplina> actual = disciplinaService.getDisciplineBySemestru(new User("any", "pass", AccountType.profesor), "1");
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetDisciplineBySemestru_NoCorectSemester() {
        student.getContracteStudii().get(0).getDiscipline().add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare(),
                "baze_de_date",
                "pachet",
                "200",
                199));
        Disciplina d = new Disciplina(
                "AI",
                new ArrayList<Ora>(),
                2,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare(),
                "a_i",
                "pachet",
                "200",
                199);
        student.getContracteStudii().get(0).getDiscipline().add(d);
        when(userService.getStudentByUsername(anyString())).thenReturn(student);

        List<Disciplina> actual = disciplinaService.getDisciplineBySemestru(new User("any", "pass", AccountType.student), "2");
        assertEquals(1, actual.size());
        assertEquals(d, actual.get(0));
    }

    @Test
    void testGetDisciplineBySemestru_Found() {
        when(userService.getStudentByUsername(anyString())).thenReturn(student);

        List<Disciplina> actual = disciplinaService.getDisciplineBySemestru(new User("any", "pass", AccountType.student), "1");
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetDisciplineBySpecializareAndSemestru_AcountTypeIncorect() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        List<Disciplina> actual = disciplinaService.getDisciplineBySpecializareAndSemestru(new User("any", "pass", AccountType.profesor), "Informatica", "1");
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetDisciplineBySpecializareAndSemestru_IncorectSpecializare() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare("info", 2, new Facultate()),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        List<Disciplina> actual = disciplinaService.getDisciplineBySpecializareAndSemestru(new User("any", "pass", AccountType.student), "Informatica", "1");
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetDisciplineBySpecializareAndSemestru_Add() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare("Informatica", 3, new Facultate()),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        List<Disciplina> actual = disciplinaService.getDisciplineBySpecializareAndSemestru(new User("any", "pass", AccountType.student), "Informatica", "1");
        assertEquals(1, actual.size());
        assertIterableEquals(discipline, actual);
    }

    @Test
    void testGetOptionalByPachet_AcountTypeIncorect() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        List<Disciplina> actual = disciplinaService.getOptionalByPachet(new User("any", "pass", AccountType.profesor), "pack");
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetOptionalByPachet_IncorrectPacket() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare("Informatica", 3, new Facultate()),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        List<Disciplina> actual = disciplinaService.getOptionalByPachet(new User("any", "pass", AccountType.student), "pack");
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetOptionalByPachet_OptionalIncorect() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare("Informatica", 3, new Facultate()),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        List<Disciplina> actual = disciplinaService.getOptionalByPachet(new User("any", "pass", AccountType.student), "pachet");
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetOptionalByPachet_Add() {
        ArrayList<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.optionala,
                new Facultate(),
                new Specializare("Informatica", 3, new Facultate()),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaRepo.findAll()).thenReturn(discipline);
        List<Disciplina> actual = disciplinaService.getOptionalByPachet(new User("any", "pass", AccountType.student), "pachet");
        assertEquals(1, actual.size());
        assertIterableEquals(discipline, actual);
    }
}