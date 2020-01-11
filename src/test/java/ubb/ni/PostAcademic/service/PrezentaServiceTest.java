package ubb.ni.PostAcademic.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.PrezentaRepo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class PrezentaServiceTest {

    @Mock
    PrezentaRepo prezentaRepo;
    @Mock
    UserService userService;

    @InjectMocks
    PrezentaService prezentaService;


    private User user = new User("any", "pass", AccountType.student);
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
            user);
    private Ora ora = new Ora("Luni",
            12,
            14,
            1,
            new Sala("A321","Avram Iancu"),
            new ArrayList<Grupa>(),
            new Disciplina(
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
                    199),
            new Profesor(),
            TipOra.curs,
            "blue");

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetPrezenteByMaterie_Profesor() {

        List<Prezenta> prezente = new ArrayList<>();
        Student student = null;
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(prezentaRepo.findAll()).thenReturn(prezente);

        ArrayList<ArrayList<Boolean>> rezultat = prezentaService.getPrezenteByMaterie(new User("any", "pass", AccountType.profesor), "Baze de date");

        assertEquals(rezultat.size(), 0);
    }

    @Test
    void testGetPrezenteByMaterie_Admin() {

        List<Prezenta> prezente = new ArrayList<>();
        Student student = null;
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(prezentaRepo.findAll()).thenReturn(prezente);

        ArrayList<ArrayList<Boolean>> rezultat = prezentaService.getPrezenteByMaterie(new User("any", "pass", AccountType.admin), "Baze de date");

        assertEquals(rezultat.size(), 0);
    }

    @Test
    void testGetPrezenteByMaterie_StudentHasNone() {

        List<Prezenta> prezente = new ArrayList<>();
        Student student = null;
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(prezentaRepo.findAll()).thenReturn(prezente);

        ArrayList<ArrayList<Boolean>> rezultat = prezentaService.getPrezenteByMaterie(new User("any", "pass", AccountType.student), "Baze de date");

        List<List<Boolean>> expected = new ArrayList<>(Collections.nCopies(3, new ArrayList<>(Collections.nCopies(14, false))));
        assertEquals(rezultat.size(), 3);
        assertIterableEquals(rezultat, expected);
    }

    @Test
    void testGetPrezenteByMaterie_StudentHasPrezenteCurs() {

        List<Prezenta> prezente = new ArrayList<>();
        prezente.add(new Prezenta(1, true, ora, student));
        prezente.add(new Prezenta(3, true, ora, student));
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(prezentaRepo.findAll()).thenReturn(prezente);

        ArrayList<ArrayList<Boolean>> rezultat = prezentaService.getPrezenteByMaterie(user, "baze_de_date");

        List<List<Boolean>> expected = new ArrayList<>(3);
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.get(0).set(0,true);
        expected.get(0).set(2,true);
        assertEquals(rezultat.size(), 3);
        assertIterableEquals(rezultat, expected);
    }
    @Test
    void testGetPrezenteByMaterie_StudentHasPrezenteSeminar() {

        List<Prezenta> prezente = new ArrayList<>();
        ora.setTipOra(TipOra.seminar);
        prezente.add(new Prezenta(1, true, ora, student));
        prezente.add(new Prezenta(3, true, ora, student));
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(prezentaRepo.findAll()).thenReturn(prezente);

        ArrayList<ArrayList<Boolean>> rezultat = prezentaService.getPrezenteByMaterie(user, "baze_de_date");

        List<List<Boolean>> expected = new ArrayList<>(3);
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.get(1).set(0,true);
        expected.get(1).set(2,true);
        assertEquals(rezultat.size(), 3);
        assertIterableEquals(rezultat, expected);
    }
    @Test
    void testGetPrezenteByMaterie_StudentHasPrezenteLaborator() {

        List<Prezenta> prezente = new ArrayList<>();
        ora.setTipOra(TipOra.laborator);
        prezente.add(new Prezenta(1, true, ora, student));
        prezente.add(new Prezenta(3, true, ora, student));
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(prezentaRepo.findAll()).thenReturn(prezente);

        ArrayList<ArrayList<Boolean>> rezultat = prezentaService.getPrezenteByMaterie(user, "baze_de_date");

        List<List<Boolean>> expected = new ArrayList<>(3);
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.add(new ArrayList<>(Collections.nCopies(14, false)));
        expected.get(2).set(0,true);
        expected.get(2).set(2,true);
        assertEquals(rezultat.size(), 3);
        assertIterableEquals(rezultat, expected);
    }
}