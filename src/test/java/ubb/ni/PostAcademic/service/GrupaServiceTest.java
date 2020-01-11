package ubb.ni.PostAcademic.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.GrupaRepo;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class GrupaServiceTest {
    @Mock
    GrupaRepo grupaRepo;
    @Mock
    DisciplinaService disciplinaService;
    @InjectMocks
    GrupaService grupaService;
    Specializare specializare = new Specializare("Informatica", 3,new Facultate());
    private Disciplina disciplina = new Disciplina(
            "Baze de date",
            new ArrayList<Ora>(),
            1,
            6,
            TipDisciplina.obligatorie,
            new Facultate(),
            specializare,
            "baze_de_date",
            "pachet",
            "200",
            199);
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindGrupa_NoneInRepo() {
        List<Grupa> grupe = new ArrayList<>();
        when(grupaRepo.findAll()).thenReturn(grupe);
        Grupa founded = grupaService.findGrupa("284");
        assertNull(founded);
    }

    @Test
    void testFindGrupa_NotFound() {
        List<Grupa> grupe = new ArrayList<>();
        Grupa expected = new Grupa("30", new Specializare(), 2);
        grupe.add(expected);
        when(grupaRepo.findAll()).thenReturn(grupe);
        Grupa founded = grupaService.findGrupa("284");
        assertNull(founded);
    }

    @Test
    void testFindGrupa_Found() {
        List<Grupa> grupe = new ArrayList<>();
        Grupa expected = new Grupa("284", new Specializare(), 2);
        grupe.add(expected);
        when(grupaRepo.findAll()).thenReturn(grupe);
        Grupa founded = grupaService.findGrupa("284");
        assertEquals(expected, founded);
    }

    @Test
    void testGetGrupeByMaterie_AcountTypeIncorect() {
        List<Grupa> grupe = new ArrayList<>();
        when(grupaRepo.findAll()).thenReturn(grupe);
        when(disciplinaService.findDisciplina(anyString())).thenReturn(disciplina);

        ArrayList<Grupa> actual = grupaService.getGrupeByMaterie(new User("any", "pass", AccountType.student), "baze");

        assertIterableEquals(new ArrayList<>(), actual);
    }
    @Test
    void testGetGrupeByMaterie_DisciplinaIsNull() {
        List<Grupa> grupe = new ArrayList<>();
        when(grupaRepo.findAll()).thenReturn(grupe);
        Disciplina disciplina = null;
        when(disciplinaService.findDisciplina(anyString())).thenReturn(disciplina);

        ArrayList<Grupa> actual = grupaService.getGrupeByMaterie(new User("any", "pass", AccountType.profesor), "baze");

        assertIterableEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetGrupeByMaterie_NoGroups() {
        List<Grupa> grupe = new ArrayList<>();
        when(grupaRepo.findAll()).thenReturn(grupe);
        when(disciplinaService.findDisciplina(anyString())).thenReturn(disciplina);

        ArrayList<Grupa> actual = grupaService.getGrupeByMaterie(new User("any", "pass", AccountType.profesor), "baze");

        assertIterableEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetGrupeByMaterie_SpecializareNotFound() {
        List<Grupa> grupe = new ArrayList<>();

        grupe.add(new Grupa("284", specializare, 2));
        when(grupaRepo.findAll()).thenReturn(grupe);
        when(disciplinaService.findDisciplina(anyString())).thenReturn(disciplina);

        ArrayList<Grupa> actual = grupaService.getGrupeByMaterie(new User("any", "pass", AccountType.profesor), "baze");

        assertIterableEquals(grupe, actual);
    }
}