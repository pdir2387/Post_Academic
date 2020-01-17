package ubb.ni.PostAcademic.ctrl;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.service.*;

import java.lang.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MainControllerTest {
    @Mock
    UserService userService;
    @Mock
    NotaService notaService;
    @Mock
    PrezentaService prezentaService;
    @Mock
    OraService oraService;
    @Mock
    DisciplinaService disciplinaService;
    @Mock
    FacultateService facultateService;
    @Mock
    GrupaService grupaService;

    @InjectMocks
    MainController mainController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    void testAuth_Anon() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        String responseEntity = mainController.auth();

        assertEquals(responseEntity, "anon");
    }

    @Test
    void testAuth_getAuthorise() {
        //todo:
        /*MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);

        Mockito.when(securityContext.getAuthentication().getAuthorities().toArray()).thenReturn(new Object[]{"ceva"});
        SecurityContextHolder.setContext(securityContext);
//
//        Collection<SimpleGrantedAuthority> oldAuthorities = (Collection<SimpleGrantedAuthority>)SecurityContextHolder.getContext().getAuthentication().getAuthorities();
//        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_ANOTHER");
//        List<SimpleGrantedAuthority> updatedAuthorities = new ArrayList<SimpleGrantedAuthority>();
//        updatedAuthorities.add(authority);
//        updatedAuthorities.addAll(oldAuthorities);
//
//        SecurityContextHolder.getContext().setAuthentication(
//                new UsernamePasswordAuthenticationToken(
//                        SecurityContextHolder.getContext().getAuthentication().getPrincipal(),
//                        SecurityContextHolder.getContext().getAuthentication().getCredentials(),
//                        updatedAuthorities)
//        );

        String responseEntity = mainController.auth();

        assertEquals(responseEntity, "anon");*/
    }

    @Test
    void addStudent() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(userService.getByUsername(any())).thenReturn(new User());
        when(userService.addStudent(any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any())).thenReturn("done");

        String responseEntity = mainController.addStudent("user",
                "nume",
                "123432523",
                "0754323453",
                "dfs65",
                "236",
                2,
                "user@email.com",
                2017,
                "parola");

        assertEquals("done", responseEntity);
    }

    @Test
    void addStudentCSV() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(userService.getByUsername(any())).thenReturn(new User());
        when(userService.addStudentCSV(any(), any())).thenReturn("done");
        MultipartFile file = mock(MockMultipartFile.class);
        String responseEntity = mainController.addStudentCSV(file);

        assertEquals("done", responseEntity);
    }

    @Test
    void deleteStudent() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(userService.getByUsername(any())).thenReturn(new User());
        when(userService.deleteStudent(any(), any())).thenReturn("done");
        String responseEntity = mainController.deleteStudent("nume");

        assertEquals("done", responseEntity);
    }

    @Test
    void addProfesor() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);       //todo: mock when done with auth
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(userService.addProfesor(any(), any(), any(), any(), any(), any(), any(), any(), any())).thenReturn("done");
        String responseEntity = mainController.addProfesor("user",
                "nume",
                "parola",
                "user@email.com",
                "http://www.user.ubbcluj.ro",
                "FSEGA sala 324",
                "0754323453",
                "Algebra Geometrie");

        assertEquals("done", responseEntity);
    }

    @Test
    void addProfesorCSV() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(userService.getByUsername(any())).thenReturn(new User());
        when(userService.addProfesorCSV(any(), any())).thenReturn("done");
        MultipartFile file = mock(MockMultipartFile.class);
        String responseEntity = mainController.addProfesorCSV(file);

        assertEquals("done", responseEntity);
    }

    @Test
    void deleteProfesor() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(userService.deleteProfesor(any(), any())).thenReturn("done");
        String responseEntity = mainController.deleteProfesor("user");

        assertEquals("done", responseEntity);
    }

    @Test
    void addMateriiToContract() {
        /*MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        doNothing().when(disciplinaService).addMateriiToContract(any(), any());

        mainController.addMateriiToContract("[]");  //todo: err jsonarray does not have toList()

        assertTrue(true);*/
    }

    @Test
    void getNoteByMaterie() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Nota> note = new ArrayList<>();
        LocalDateTime localDateTime = LocalDateTime.of(2010, 9, 13, 13, 50);
        Disciplina d = new Disciplina();
        note.add(new Nota(localDateTime, new Ora("", 14, 16, 1, new Sala(), new ArrayList<>(), d, new Profesor(), TipOra.seminar, "red"), 10, "-", new Student()));
        when(notaService.getNoteByMaterie(any(), any())).thenReturn(note);

        String respone = mainController.getNoteByMaterie("disciplina");
        assertEquals("[{\"observatii\":\"-\",\"data\":\"2010-09-13T13:50\",\"materie\":\"" + d + "\",\"tip\":\"seminar\",\"nota\":10}]", respone);
    }

    @Test
    void getPrezenteByMaterie() {
       /* MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<ArrayList<Boolean>> prezente = new ArrayList<>();
        prezente.add(new ArrayList<>());
        prezente.add(new ArrayList<>());
        prezente.add(new ArrayList<>());
        prezente.get(0).add(true);
        prezente.get(1).add(false);         //todo: put not found
        prezente.get(2).add(true);
        when(prezentaService.getPrezenteByMaterie(any(), any())).thenReturn(prezente);

        String respone =mainController.getPrezenteByMaterie("disciplina");

        assertEquals("{}",respone);*/

    }

    @Test
    void getMedii() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Medie> medii = new ArrayList<>();
        Medie m = new Medie(2020, 2, 10, new Student(), new Disciplina(), LocalDate.of(2021, 1, 1), true);
        medii.add(m);
        when(notaService.getMedii(any())).thenReturn(medii);

        String respone = mainController.getMedii();
        assertEquals("[{\"date\":\"01-01-2021\",\"year\":\"2020\\/2021\",\"grade\":10,\"semester\":2}]", respone);

    }

    @Test
    void getMedii_None() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Medie> medii = new ArrayList<>();

        when(notaService.getMedii(any())).thenReturn(medii);

        String respone = mainController.getMedii();
        assertEquals("[]", respone);

    }

    @Test
    void getAni() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getStudentByUsername(any())).thenReturn(new Student("Mihai",
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
                new User()));

        String respone = mainController.getAni();
        assertEquals("{\"durata\":3,\"semestru\":1,\"inceput\":2018}", respone);

    }

    @Test
    void getMateriiBySemestru_NoDiscipla() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());

        ArrayList<Disciplina> disciplinas = new ArrayList<>();
        when(disciplinaService.getDisciplineBySemestru(any(), any())).thenReturn(disciplinas);

        String respone = mainController.getMateriiBySemestru("1");
        assertEquals("[]", respone);

    }

    @Test
    void getMateriiBySemestru_NoNote() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());

        ArrayList<Disciplina> disciplinas = new ArrayList<>();
        disciplinas.add(new Disciplina());
        when(disciplinaService.getDisciplineBySemestru(any(), any())).thenReturn(disciplinas);

        when(notaService.getMediiBySemestre(any(), any())).thenReturn(new ArrayList<>());
        String respone = mainController.getMateriiBySemestru("1");
        assertEquals("[{\"promovat\":false}]", respone);

    }

    @Test
    void getMateriiBySemestru() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());

        ArrayList<Disciplina> disciplinas = new ArrayList<>();
        Disciplina d = new Disciplina();
        disciplinas.add(d);
        when(disciplinaService.getDisciplineBySemestru(any(), any())).thenReturn(disciplinas);
        ArrayList<Medie> medii = new ArrayList<>();
        Medie m = new Medie();
        m.setDisciplina(d);
        medii.add(m);
        when(notaService.getMediiBySemestre(any(), any())).thenReturn(medii);
        String respone = mainController.getMateriiBySemestru("1");
        assertEquals("[{}]", respone);

    }

    @Test
    void getMaterii() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        Student student = new Student();
        student.setSemestru(10);
        when(userService.getStudentByUsername(any())).thenReturn(student);

        ArrayList<Disciplina> disciplinas = new ArrayList<>();
        Disciplina d = new Disciplina();
        disciplinas.add(d);
        when(disciplinaService.getDisciplineBySemestru(any(), any())).thenReturn(disciplinas);
        String respone = mainController.getMaterii();
        assertEquals("[{}]", respone);
    }

    @Test
    void getMediiBySemestre_noNote() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());

        when(notaService.getMediiBySemestre(any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getMediiBySemestre("1");
        assertEquals("[]", respone);
    }

    @Test
    void getMediiBySemestre() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Medie> medii = new ArrayList<>();
        Disciplina disciplina = new Disciplina();
        Medie medie = new Medie(2020, 2, 10, new Student(), disciplina, LocalDate.of(2020, 1, 1), true);
        medii.add(medie);

        medie.setDisciplina(disciplina);
        when(notaService.getMediiBySemestre(any(), any())).thenReturn(medii);

        String respone = mainController.getMediiBySemestre("1");
        assertEquals("[{\"date\":\"2020-01-01\",\"year\":\"2020\\/2021\",\"grade\":10,\"semester\":2}]", respone);
    }

    @Test
    void getInformatiiPersonale() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getStudentByUsername(any())).thenReturn(new Student("Mihai",
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
                new User()));

        String respone = mainController.getInformatiiPersonale();
        assertEquals("{\"cnp\":\"65443223452\",\"name\":\"Mihai\",\"cod\":\"65443223452\",\"grupa\":\"254\",\"semestru\":1,\"an\":1}", respone);

    }

    @Test
    void getOreByMaterie_NoOra() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(oraService.getOreByMaterie(any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getOreByMaterie("disciplina");
        assertEquals("[]", respone);

    }

    @Test
    void getOreByMaterie() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Ora> ore = new ArrayList<>();
        Disciplina disciplina = new Disciplina();
        Ora ora = new Ora("", 14, 16, 1, new Sala(), new ArrayList<>(), disciplina, new Profesor(), TipOra.seminar, "red");
        ore.add(ora);

        when(oraService.getOreByMaterie(any(), any())).thenReturn(ore);

        String respone = mainController.getOreByMaterie("disciplina");
        assertEquals("[{\"color\":\"red\",\"durata\":2,\"start\":14,\"tip\":\"seminar\",\"zi\":\"\"}]", respone);

    }

    @Test
    void getOrar() {
        String respone = mainController.getOrar();
        assertEquals("[{\"zi\":\"luni\",\"color\":\"red\",\"nume\":\"Limbaje formale si tehnici de compilare\",\"start\":12,\"durata\":2,\"tip\":\"curs\",\"optional\":false},{\"zi\":\"luni\",\"color\":\"green\",\"nume\":\"Programare paralela\",\"start\":14,\"durata\":2,\"tip\":\"curs\",\"optional\":false},{\"zi\":\"miercuri\",\"color\":\"yellow\",\"nume\":\"IT IS WEDNESDAY MY DUDES\",\"start\":14,\"durata\":2,\"tip\":\"laborator\",\"optional\":true}]", respone);
    }

    @Test
    void getOre_noOre() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(oraService.getOre(any())).thenReturn(new ArrayList<>());

        String respone = mainController.getOre("disciplina");
        assertEquals("[]", respone);

    }

    @Test
    void getOre() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Ora> ore = new ArrayList<>();
        Disciplina disciplina = new Disciplina();
        Ora ora = new Ora("", 14, 16, 1, new Sala(), new ArrayList<>(), disciplina, new Profesor(), TipOra.seminar, "red");
        ore.add(ora);

        when(oraService.getOre(any())).thenReturn(ore);

        String respone = mainController.getOre("disciplina");
        assertEquals("[{\"color\":\"red\",\"durata\":2,\"start\":14,\"tip\":\"seminar\",\"zi\":\"\"}]", respone);

    }

    @Test
    void getListaFacultati_noFacultati() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(facultateService.getListaFacultati(any())).thenReturn(new ArrayList<>());

        String respone = mainController.getListaFacultati();
        assertEquals("[]", respone);

    }

    @Test
    void getListaFacultati() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Facultate> facultati = new ArrayList<>();
        Facultate facultate = new Facultate("Mate info");
        facultati.add(facultate);
        when(facultateService.getListaFacultati(any())).thenReturn(facultati);

        String respone = mainController.getListaFacultati();
        assertEquals("[{\"facultate\":\"Mate info\"}]", respone);

    }

    @Test
    void getSpecializariByFacultate_NoSpecializari() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(facultateService.getSpecializariByFacultate(any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getSpecializariByFacultate("facultate");
        assertEquals("[]", respone);
    }

    @Test
    void getSpecializariByFacultate() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Specializare> specializari = new ArrayList<>();
        specializari.add(new Specializare());
        when(facultateService.getSpecializariByFacultate(any(), any())).thenReturn(specializari);

        String respone = mainController.getSpecializariByFacultate("facultate");
        assertEquals("[{}]", respone);
    }

    @Test
    void getMateriiBySpecializareAndSemestru_NoDisciplina() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(disciplinaService.getDisciplineBySpecializareAndSemestru(any(), any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getMateriiBySpecializareAndSemestru("facultate", "semestru");
        assertEquals("[]", respone);
    }

    @Test
    void getMateriiBySpecializareAndSemestru() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Disciplina> discipline = new ArrayList<>();
        Facultate facultate = new Facultate("Informatica");
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                facultate,
                new Specializare("Informatica", 2020, facultate),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaService.getDisciplineBySpecializareAndSemestru(any(), any(), any())).thenReturn(discipline);

        String respone = mainController.getMateriiBySpecializareAndSemestru("facultate", "semestru");
        assertEquals("[{\"\":\"\"}]", respone);
    }

    @Test
    void getOptionaleByPachet_NoDiscipline() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(disciplinaService.getOptionalByPachet(any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getOptionaleByPachet("pachet");
        assertEquals("[]", respone);
    }

    @Test
    void getOptionaleByPachet() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Disciplina> discipline = new ArrayList<>();
        Facultate facultate = new Facultate("Informatica");
        discipline.add(new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                facultate,
                new Specializare("Informatica", 2020, facultate),
                "baze_de_date",
                "pachet",
                "200",
                199));
        when(disciplinaService.getOptionalByPachet(any(), any())).thenReturn(discipline);

        String respone = mainController.getOptionaleByPachet("pachet");
        assertEquals("[{\"\":\"\"}]", respone);
    }

    @Test
    void getGrupeByMaterie_NoGrupe() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(grupaService.getGrupeByMaterie(any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getGrupeByMaterie("pachet");
        assertEquals("[]", respone);
    }

    @Test
    void getGrupeByMaterie() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Grupa> grupe = new ArrayList<>();
        grupe.add(new Grupa());
        when(grupaService.getGrupeByMaterie(any(), any())).thenReturn(grupe);

        String respone = mainController.getGrupeByMaterie("pachet");
        assertEquals("[{}]", respone);
    }

    @Test
    void getMediiByMaterie_NoMedii() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(notaService.getMediiByMaterie(any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getMediiByMaterie("pachet");
        assertEquals("[]", respone);
    }

    @Test
    void getMediiByMaterie() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Medie> medii = new ArrayList<>();
        Disciplina disciplina = new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate("Informatica"),
                new Specializare("Informatica", 2020, new Facultate("Informatica")),
                "baze_de_date",
                "pachet",
                "200",
                199);
        Medie m = new Medie(2020, 2, 10, new Student(), disciplina, LocalDate.of(2021, 1, 1), true);
        medii.add(m);
        when(notaService.getMediiByMaterie(any(), any())).thenReturn(medii);

        String respone = mainController.getMediiByMaterie("pachet");
        assertEquals("[{\"date\":\"2021-01-01\",\"code\":\"baze_de_date\",\"year\":\"2020\\/2021\",\"credits\":6,\"grade\":10,\"name\":\"Baze de date\",\"semester\":2}]", respone);
    }

    @Test
    void getMediiByMaterieAndGrupa_NoMedie() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(notaService.getMediiByMaterieAndGrupa(any(), any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getMediiByMaterieAndGrupa("materii", "Grupe");
        assertEquals("[]", respone);
    }

    @Test
    void getMediiByMaterieAndGrupa() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Medie> medii = new ArrayList<>();
        Disciplina disciplina = new Disciplina(
                "Baze de date",
                new ArrayList<Ora>(),
                1,
                6,
                TipDisciplina.obligatorie,
                new Facultate("Informatica"),
                new Specializare("Informatica", 2020, new Facultate("Informatica")),
                "baze_de_date",
                "pachet",
                "200",
                199);
        Medie m = new Medie(2020, 2, 10, new Student(), disciplina, LocalDate.of(2021, 1, 1), true);
        medii.add(m);
        when(notaService.getMediiByMaterieAndGrupa(any(), any(), any())).thenReturn(medii);

        String respone = mainController.getMediiByMaterieAndGrupa("materii", "Grupe");
        assertEquals("[{\"date\":\"2021-01-01\",\"code\":\"baze_de_date\",\"year\":\"2020\\/2021\",\"credits\":6,\"grade\":10,\"name\":\"Baze de date\",\"semester\":2}]", respone);
    }

    @Test
    void getNoteByStudentAndMaterie_NoNota() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(notaService.getNoteByStudentAndMaterie(any(), any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getNoteByStudentAndMaterie("student", "disciplina");
        assertEquals("[]", respone);
    }

    @Test
    void getNoteByStudentAndMaterie() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Nota> note = new ArrayList<>();
        LocalDateTime localDateTime = LocalDateTime.of(2020, 1, 1, 12, 43);
        Disciplina d = new Disciplina();
        note.add(new Nota(localDateTime, new Ora("", 14, 16, 1, new Sala(), new ArrayList<>(), d, new Profesor(), TipOra.seminar, "red"), 10, "-", new Student()));
        when(notaService.getNoteByStudentAndMaterie(any(), any(), any())).thenReturn(note);
        String respone = mainController.getNoteByStudentAndMaterie("student", "disciplina");
        assertEquals("[{\"observatii\":\"-\",\"data\":\"2020-01-01T12:43\",\"materie\":\""+d+"\",\"tip\":\"seminar\",\"nota\":10}]", respone);
    }

    @Test
    void getPrezenteByMaterieAndTip() {
        /*MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<ArrayList<Boolean>> prezente =new ArrayList<>();
        prezente.add(new ArrayList<>());
        prezente.add(new ArrayList<>());
        prezente.add(new ArrayList<>());
        prezente.get(0).add(true);
        prezente.get(0).add(false);
        prezente.get(1).add(false);
        prezente.get(1).add(true);
        prezente.get(2).add(true);
        prezente.get(2).add(true);


        when(  prezentaService.getPrezenteByMaterie(any(), any())).thenReturn(prezente);
        String respone = mainController.getPrezenteByMaterieAndTip("disciplina", "tip");
        assertEquals("[{\"observatii\":\"-\",\"data\":\"2020-01-01T12:43\",\"materie\":\"ubb.ni.PostAcademic.domain.Disciplina@70d2e40b\",\"tip\":\"seminar\",\"nota\":10}]", respone);
*/  //todo: json put
    }

    @Test
    void getNoteByMaterieAndTip_NoNota() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        when(notaService.getNoteByMaterieAndTipAndGrupa(any(), any(), any(), any())).thenReturn(new ArrayList<>());

        String respone = mainController.getNoteByMaterieAndTip("disciplina", "tip", "grupa");
        assertEquals("[]", respone);
    }

    @Test
    void getNoteByMaterieAndTip() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Authentication authentication = Mockito.mock(AnonymousAuthenticationToken.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userService.getByUsername(any())).thenReturn(new User());
        ArrayList<Nota> note = new ArrayList<>();
        LocalDateTime localDateTime = LocalDateTime.of(2020, 1, 1, 12, 43);
        Disciplina d = new Disciplina();
        note.add(new Nota(localDateTime, new Ora("", 14, 16, 1, new Sala(), new ArrayList<>(), d, new Profesor(), TipOra.seminar, "red"), 10, "-", new Student()));
        when(notaService.getNoteByMaterieAndTipAndGrupa(any(), any(), any(), any())).thenReturn(note);

        String respone = mainController.getNoteByMaterieAndTip("disciplina", "tip", "grupa");
        assertEquals("[{\"observatii\":\"-\",\"data\":\"2020-01-01T12:43\",\"materie\":\""+d+"\",\"tip\":\"seminar\",\"nota\":10}]", respone);
    }
}