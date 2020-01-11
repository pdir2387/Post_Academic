package ubb.ni.PostAcademic.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import ubb.ni.PostAcademic.domain.AccountType;
import ubb.ni.PostAcademic.domain.Facultate;
import ubb.ni.PostAcademic.domain.Specializare;
import ubb.ni.PostAcademic.domain.User;
import ubb.ni.PostAcademic.repo.FacultateRepo;
import ubb.ni.PostAcademic.repo.SpecializareRepo;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class FacultateServiceTest {
    @Mock
    FacultateRepo facultateRepo;
    @Mock
    SpecializareRepo specializareRepo;

    @InjectMocks
    FacultateService facultateService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetListaFacultati_AcountTypeIncorect() {
        List<Facultate> facultati = new ArrayList<>();
        when(facultateRepo.findAll()).thenReturn(facultati);

        List<Facultate> actual =facultateService.getListaFacultati(new User("any","pass", AccountType.profesor));
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testGetListaFacultati_NoFaculati() {
        List<Facultate> facultati = new ArrayList<>();
        when(facultateRepo.findAll()).thenReturn(facultati);

        List<Facultate> actual =facultateService.getListaFacultati(new User("any","pass", AccountType.student));
        assertEquals(new ArrayList<>(), actual);
    }
    @Test
    void testGetListaFacultati_Founded() {
        List<Facultate> facultati = new ArrayList<>();
        facultati.add(new Facultate("Drept"));
        when(facultateRepo.findAll()).thenReturn(facultati);

        List<Facultate> actual =facultateService.getListaFacultati(new User("any","pass", AccountType.student));
        assertEquals(facultati, actual);
    }

    @Test
    void testGetSpecializariByFacultate_AcountTypeIncorect() {
        List<Specializare> specializari = new ArrayList<>();
        when(specializareRepo.findAll()).thenReturn(specializari);

        List<Specializare> actual =facultateService.getSpecializariByFacultate(new User("any","pass", AccountType.profesor), "Arte");
        assertEquals(new ArrayList<>(), actual);
    }
    @Test
    void testGetSpecializariByFacultate_NoSpecializari() {
        List<Specializare> specializari = new ArrayList<>();
        when(specializareRepo.findAll()).thenReturn(specializari);

        List<Specializare> actual =facultateService.getSpecializariByFacultate(new User("any","pass", AccountType.student), "Arte");
        assertEquals(new ArrayList<>(), actual);
    }
    @Test
    void testGetSpecializariByFacultate_Founded() {
        List<Specializare> specializari = new ArrayList<>();
        specializari.add(new Specializare("Caligrafie",3, new Facultate("Arte")));
        when(specializareRepo.findAll()).thenReturn(specializari);

        List<Specializare> actual =facultateService.getSpecializariByFacultate(new User("any","pass", AccountType.student), "Arte");
        assertEquals(specializari, actual);
    }
}