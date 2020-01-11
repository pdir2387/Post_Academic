package ubb.ni.PostAcademic.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.MedieRepo;
import ubb.ni.PostAcademic.repo.NotaRepo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class NotaServiceTest {
    @Mock
    NotaRepo notaRepo;
    @Mock
    MedieRepo medieRepo;
    @Mock
    UserService userService;

    @InjectMocks
    NotaService notaService;

    private Disciplina disciplina = new Disciplina(
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
            199);
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
    private Nota nota = new Nota(LocalDateTime.now(),
            new Ora("Luni",
                    12,
                    14,
                    1,
                    new Sala("A321", "Avram Iancu"),
                    new ArrayList<Grupa>(),
                    disciplina,
                    new Profesor(),
                    TipOra.curs,
                    "blue"),
            10,
            "notita",
            student);

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        student.setId(123l);
        nota.setId(student.getId());
    }

    @Test
    void testGetNoteByMaterie_AcountTypeIncorect() {
        List<Nota> note = new ArrayList<>();
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByMaterie(new User("any", "pass", AccountType.profesor), "Baze de date");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetNoteByMaterie_NotFound() {
        List<Nota> note = new ArrayList<>();
        note.add(nota);
        when(notaRepo.findAll()).thenReturn(note);
        User user = new User("any", "pass", AccountType.student);
        user.setId(student.getId());
        List<Nota> actual = notaService.getNoteByMaterie(user, "Baze de date");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetNoteByMaterie_Found() {
        List<Nota> note = new ArrayList<>();
        note.add(nota);
        when(notaRepo.findAll()).thenReturn(note);
        User user = new User("any", "pass", AccountType.student);
        user.setId(student.getId());
        List<Nota> actual = notaService.getNoteByMaterie(user, "baze_de_date");

        assertIterableEquals(note, actual);
    }

    @Test
    void testGetMedii_AcountTypeIncorect() {
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        List<Medie> actual = notaService.getMedii(new User("any", "pass", AccountType.profesor));

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMedii_NotFound() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, new Disciplina(), LocalDate.now(), true));
        when(userService.getStudentByUsername(anyString())).thenReturn(new Student());
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMedii(new User("any", "pass", AccountType.student));

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMedii_Found() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, new Disciplina(), LocalDate.now(), true));
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMedii(new User("any", "pass", AccountType.student));

        assertIterableEquals(medii, actual);
    }

    @Test
    void testGetMediiBySemestre_AcountTypeIncorect() {
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        List<Medie> actual = notaService.getMediiBySemestre(new User("any", "pass", AccountType.profesor), new String[]{"2"});

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMediiBySemestre_StudentNotFound() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, new Disciplina(), LocalDate.now(), true));
        when(userService.getStudentByUsername(anyString())).thenReturn(new Student());
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiBySemestre(new User("any", "pass", AccountType.student), new String[]{"1", "2"});

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMediiBySemestre_NotFound() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, new Disciplina(), LocalDate.now(), true));
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiBySemestre(new User("any", "pass", AccountType.student), new String[]{"1"});

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMediiBySemestre_Found() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, new Disciplina(), LocalDate.now(), true));
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiBySemestre(new User("any", "pass", AccountType.student), new String[]{"1", "2"});

        assertIterableEquals(medii, actual);
    }

    @Test
    void testGetMediiByMaterie_AcountTypeIncorect() {
        List<Medie> medii = new ArrayList<>();
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiByMaterie(new User("any", "pass", AccountType.student), "baze de date");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMediiByMaterie_NotFound() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, disciplina, LocalDate.now(), true));
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiByMaterie(new User("any", "pass", AccountType.profesor), "baze de date");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMediiByMaterie_Found() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, disciplina, LocalDate.now(), true));
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiByMaterie(new User("any", "pass", AccountType.profesor), "baze_de_date");

        assertIterableEquals(medii, actual);
    }

    @Test
    void testGetMediiByMaterieAndGrupa_AcountTypeIncorect() {
        List<Medie> medii = new ArrayList<>();
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiByMaterieAndGrupa(new User("any", "pass", AccountType.student), "baze de date", "223");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMediiByMaterieAndGrupa_NotFound() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, disciplina, LocalDate.now(), true));
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiByMaterieAndGrupa(new User("any", "pass", AccountType.profesor), "baze de date", "223");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetMediiByMaterieAndGrupa_Found() {
        List<Medie> medii = new ArrayList<>();
        medii.add(new Medie(2019, 2, 10, student, disciplina, LocalDate.now(), true));
        when(medieRepo.findAll()).thenReturn(medii);
        List<Medie> actual = notaService.getMediiByMaterieAndGrupa(new User("any", "pass", AccountType.profesor), "baze_de_date", "254");

        assertIterableEquals(medii, actual);
    }

    @Test
    void testGetNoteByStudentAndMaterie_AcountTypeIncorect() {
        List<Nota> note = new ArrayList<>();
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByStudentAndMaterie(new User("any", "pass", AccountType.student), "Mihai", "223");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetNoteByStudentAndMaterie_NotFound() {
        User user = new User("any", "pass", AccountType.profesor);
        student.setUser(user);
        List<Nota> note = new ArrayList<>();
        note.add(nota);
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByStudentAndMaterie(user, "Mihai", "223");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetNoteByStudentAndMaterie_Found() {
        User user = new User("any", "pass", AccountType.profesor);
        student.setUser(user);
        List<Nota> note = new ArrayList<>();
        note.add(nota);
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByStudentAndMaterie(user, user.getUsername(), "baze_de_date");

        assertIterableEquals(note, actual);
    }

    @Test
    void testGetNoteByMaterieAndTip_AcountTypeIncorect() {
        List<Nota> note = new ArrayList<>();
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByMaterieAndTip(new User("any", "pass", AccountType.student), "baze de date", "curs");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetNoteByMaterieAndTip_NotFound() {
        User user = new User("any", "pass", AccountType.profesor);
        student.setUser(user);
        List<Nota> note = new ArrayList<>();
        note.add(nota);
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByMaterieAndTip(new User("any", "pass", AccountType.profesor), "baze de date", "curs");

        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetNoteByMaterieAndTip_Found() {
        User user = new User("any", "pass", AccountType.profesor);
        student.setUser(user);
        List<Nota> note = new ArrayList<>();
        note.add(nota);
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByMaterieAndTip(new User("any", "pass", AccountType.profesor), "Baze de date", "curs");

        assertIterableEquals(note, actual);
    }

    @Test
    void testGetNoteByMaterieAndTipAndGrupa_AcountTypeIncorect() {
        List<Nota> note = new ArrayList<>();
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByMaterieAndTipAndGrupa(new User("any", "pass", AccountType.student), "baze de date", "curs", "231");

        assertEquals(new ArrayList<>(), actual);
    }
    @Test
    void testGetNoteByMaterieAndTipAndGrupa_NotFound() {
        User user = new User("any", "pass", AccountType.profesor);
        student.setUser(user);
        List<Nota> note = new ArrayList<>();
        note.add(nota);
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByMaterieAndTipAndGrupa(user, "baze de date", "curs", "231");

        assertEquals(new ArrayList<>(), actual);
    }
    @Test
    void testGetNoteByMaterieAndTipAndGrupa_Found() {
        User user = new User("any", "pass", AccountType.profesor);
        student.setUser(user);
        List<Nota> note = new ArrayList<>();
        note.add(nota);
        when(notaRepo.findAll()).thenReturn(note);
        List<Nota> actual = notaService.getNoteByMaterieAndTipAndGrupa(new User("any", "pass", AccountType.profesor), "Baze de date", "curs","254");

        assertIterableEquals(note, actual);
    }
}