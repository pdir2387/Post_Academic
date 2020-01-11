package ubb.ni.PostAcademic.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.ContractRepo;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class OraServiceTest {

    @Mock
    UserService userService;
    @InjectMocks
    OraService oraService;

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
    private List<Ora> ore = new ArrayList<>();
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        List<ContractStudii> contractStudiiList = new ArrayList<>();
        ContractStudii cs = new ContractStudii(1);
        ore.add(new Ora("Luni",
                12,
                14,
                1,
                new Sala("A321","Avram Iancu"),
                new ArrayList<Grupa>(),
                new Disciplina(),
                new Profesor(),
                TipOra.curs,
                "blue"));

        List<Disciplina> discipline = new ArrayList<>();
        discipline.add(new Disciplina(
                "Baze de date",
                ore,
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare(),
                "baze_de_date",
                "pachet",
                "200",
                199));
        List<Disciplina> discipline2 = new ArrayList<>();
        discipline2.add(new Disciplina(
                "AI",
                ore,
                2,
                6,
                TipDisciplina.obligatorie,
                new Facultate(),
                new Specializare(),
                "a_i",
                "pachet",
                "200",
                199));
        cs.setDiscipline(discipline);
        ContractStudii cs2 = new ContractStudii(2);
        cs2.setDiscipline(discipline2);
        contractStudiiList.add(cs);
        contractStudiiList.add(cs2);
        student.setContracteStudii(contractStudiiList);
    }

    @Test
    void testGetOre_UserNotStudent() {
        Student student = null;
        user.setAccountType(AccountType.profesor);
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        ArrayList<Ora> ore =oraService.getOre(user);

        assertEquals(ore.size(),0);
        assertIterableEquals(ore,new ArrayList<Ora>());
    }
    @Test
    void testGetOre_StudentNotFound() {
        Student student = null;
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        ArrayList<Ora> ore =oraService.getOre(user);

        assertEquals(0,ore.size());
    }
    @Test
    void testGetOre_StudentFound() {
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        ArrayList<Ora> ore =oraService.getOre(user);

        assertEquals(1,ore.size());
        assertIterableEquals(this.ore,ore);
    }

    @Test
    void testGetOreByMaterie_UserNotStudent() {
        Student student = null;
        user.setAccountType(AccountType.profesor);
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        ArrayList<Ora> ore =oraService.getOreByMaterie(user,"baze_de_date");

        assertEquals(0,ore.size());
    }
    @Test
    void testGetOreByMaterie_StudentNotFound() {
        Student student = null;
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        ArrayList<Ora> ore =oraService.getOreByMaterie(user,"baze_de_date");

        assertEquals(0,ore.size());
    }
    @Test
    void testGetOreByMaterie_StudentFound() {
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        ArrayList<Ora> ore =oraService.getOreByMaterie(user,"baze_de_date");

        assertEquals(1,ore.size());
        assertIterableEquals(this.ore,ore);
    }
    @Test
    void testGetOreByMaterie_ZeroOre() {
        when(userService.getStudentByUsername(anyString())).thenReturn(student);
        ArrayList<Ora> ore =oraService.getOreByMaterie(user,"baze");

        assertEquals(0,ore.size());
    }
}