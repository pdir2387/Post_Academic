package ubb.ni.PostAcademic.service;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.hibernate.mapping.Any;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.invocation.InvocationOnMock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.ProfesorRepo;
import ubb.ni.PostAcademic.repo.StudentRepo;
import ubb.ni.PostAcademic.repo.UserRepo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

//import static com.sun.beans.decoder.NewElementHandler.getArguments;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
//import static org.mockito.Mockito.when;

class UserServiceTest {

    @Mock
    UserRepo userRepo;
    @Mock
    StudentRepo studentRepo;
    @Mock
    ProfesorRepo profesorRepo;
    @Mock
    GrupaService grupaService;

    @InjectMocks
    UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetByUsername_NotDataInRepo() {
        when(userRepo.findAll()).thenReturn(new ArrayList<User>());
        assertNull(userService.getByUsername("any"));
    }

    @Test
    void testGetByUsername_NotFound() {
        User user = new User("any", "parola", AccountType.student);
        List<User> users = new ArrayList<>();
        users.add(user);
        users.add(new User("Daniel", "pass32", AccountType.student));
        users.add(new User("Muresan", "mur0123", AccountType.profesor));
        when(userRepo.findAll()).thenReturn(users);

        assertNull(userService.getByUsername("nope"));
    }

    @Test
    void testGetByUsername_Found() {
        User user = new User("any", "parola", AccountType.student);
        List<User> users = new ArrayList<>();
        users.add(user);
        users.add(new User("Daniel", "pass32", AccountType.student));
        users.add(new User("Muresan", "mur0123", AccountType.profesor));
        when(userRepo.findAll()).thenReturn(users);

        User founded = userService.getByUsername("any");

        assertEquals(user.getUsername(), founded.getUsername());
        assertEquals(user.getPassword(), founded.getPassword());
        assertEquals(user.getAccountType(), founded.getAccountType());
    }

    @Test
    void testGetStudentByUsername_NoDataInRepo() {
        when(studentRepo.findAll()).thenReturn(new ArrayList<Student>());
        assertNull(userService.getStudentByUsername("any"));
    }

    @Test
    void testGetStudentByUsername_NotFound() {
        Student student = new Student("Mihai",
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
                new User("any", "pass21", AccountType.student));
        List<Student> students = new ArrayList<>();
        students.add(student);
        when(studentRepo.findAll()).thenReturn(students);
        assertNull(userService.getStudentByUsername("nope"));
    }

    @Test
    void testGetStudentByUsername_Found() {
        Student student = new Student("Mihai",
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
                new User("any", "pass21", AccountType.student));
        List<Student> students = new ArrayList<>();
        students.add(student);
        when(studentRepo.findAll()).thenReturn(students);

        Student founded = userService.getStudentByUsername("any");

        assertEquals(student.getNume(), founded.getNume());
        assertEquals(student.getCnp(), founded.getCnp());
        assertEquals(student.getTelofon(), founded.getTelofon());
        assertEquals(student.getCod_student(), founded.getCod_student());
        assertEquals(student.getGrupa(), founded.getGrupa());
        assertEquals(student.getSemestru(), founded.getSemestru());
        assertEquals(student.getEmail(), founded.getEmail());
        assertEquals(student.getAnulInscrierii(), founded.getAnulInscrierii());
        assertEquals(student.getContracteStudii(), founded.getContracteStudii());
        assertEquals(student.getUser(), founded.getUser());
    }

    @Test
    void testGetProfesorByUsername_NoDataInRepo() {
        when(profesorRepo.findAll()).thenReturn(new ArrayList<Profesor>());
        assertNull(userService.getProfesorByUsername("any"));
    }

    @Test
    void testGetProfesorByUsername_NotFound() {
        Profesor profesor = new Profesor("Mihael",
                "mih@email.com",
                "michael.ubbcluj.ro",
                "adresa",
                "0734234543",
                "Performanta inalta\n Inteligenta artificiala",
                new User("any", "pass21", AccountType.profesor));
        List<Profesor> profesori = new ArrayList<>();
        profesori.add(profesor);
        when(profesorRepo.findAll()).thenReturn(profesori);
        assertNull(userService.getProfesorByUsername("nope"));
    }

    @Test
    void testGetProfesorByUsername_Found() {
        Profesor profesor = new Profesor("Mihael",
                "mih@email.com",
                "michael.ubbcluj.ro",
                "adresa",
                "0734234543",
                "Performanta inalta\n Inteligenta artificiala",
                new User("any", "pass21", AccountType.profesor));
        List<Profesor> profesori = new ArrayList<>();
        profesori.add(profesor);
        when(profesorRepo.findAll()).thenReturn(profesori);

        Profesor founded = userService.getProfesorByUsername("any");

        assertEquals(profesor.getNume(), founded.getNume());
        assertEquals(profesor.getEmail(), founded.getEmail());
        assertEquals(profesor.getWebsite(), founded.getWebsite());
        assertEquals(profesor.getAdresa(), founded.getAdresa());
        assertEquals(profesor.getTelefon(), founded.getTelefon());
        assertEquals(profesor.getDomeniiDeInteres(), founded.getDomeniiDeInteres());
        assertEquals(profesor.getUser(), founded.getUser());
    }


    @Test
    void testAddStudent() {
        Grupa grupa = new Grupa("236", new Specializare("Informatica", 3, new Facultate("Mate Info")), 2);
        when(grupaService.findGrupa(anyString())).then(invocationOnMock -> {
            assertEquals("236", invocationOnMock.getArgument(0));
            return grupa;
        });

        when(userRepo.save(isA(User.class))).then(invocationOnMock -> {
            User user = invocationOnMock.getArgument(0);
            assertEquals("user", user.getUsername());
            assertEquals(AccountType.student, user.getAccountType());
            return null;
        });
        when(studentRepo.save(isA(Student.class))).then(invocationOnMock -> {
            Student student = invocationOnMock.getArgument(0);
            assertEquals("user", student.getUser().getUsername());
            assertEquals("nume", student.getNume());
            assertEquals("123432523", student.getCnp());
            assertEquals("0754323453", student.getTelofon());
            assertEquals("dfs65", student.getCod_student());
            assertEquals("236", student.getGrupa().getNume());
            assertEquals(2, student.getSemestru());
            assertEquals("user@email.com", student.getEmail());
            assertEquals(2017, student.getAnulInscrierii());
            return null;
        });
        String s = userService.addStudent(new User("any", "pass", AccountType.admin),
                "user",
                "nume",
                "123432523",
                "0754323453",
                "dfs65",
                "236",
                2,
                "user@email.com",
                2017,
                "parola");

        assertEquals("", s);
    }

    @Test
    void testAddProfesor() {
        Grupa grupa = new Grupa("236", new Specializare("Informatica", 3, new Facultate("Mate Info")), 2);
        when(grupaService.findGrupa(anyString())).then(invocationOnMock -> {
            assertEquals("236", invocationOnMock.getArgument(0));
            return grupa;
        });

        when(userRepo.save(isA(User.class))).then(invocationOnMock -> {
            User user = invocationOnMock.getArgument(0);
            assertEquals("user", user.getUsername());
            assertEquals(AccountType.profesor, user.getAccountType());
            return null;
        });
        when(profesorRepo.save(isA(Profesor.class))).then(invocationOnMock -> {
            Profesor profesor = invocationOnMock.getArgument(0);
            assertEquals("any", profesor.getUser().getUsername());
            assertEquals("nume", profesor.getNume());
            assertEquals("user@email.com", profesor.getEmail());
            assertEquals("http://www.user.ubbcluj.ro", profesor.getWebsite());
            assertEquals("FSEGA sala 324", profesor.getAdresa());
            assertEquals("0754323453", profesor.getTelefon());
            assertEquals("Algebra Geometrie", profesor.getDomeniiDeInteres());
            return null;
        });
        String s = userService.addProfesor(new User("any", "pass", AccountType.admin),
                "user",
                "nume",
                "parola",
                "user@email.com",
                "http://www.user.ubbcluj.ro",
                "FSEGA sala 324",
                "0754323453",
                "Algebra Geometrie");

        assertEquals("", s);
    }

    @Test
    void testAddStudentCSV_IOException() throws IOException {

        UserService spy = spy(userService);
        Mockito.doReturn("").when(spy).addStudent(any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any());
        MultipartFile file =mock(MockMultipartFile.class);

        when(file.getBytes()).thenThrow(new IOException());
        assertThrows(IndexOutOfBoundsException.class,()->spy.addStudentCSV(new User("any", "pass", AccountType.admin), file));
    }
    @Test
    void testAddStudentCSV_NormalExec() {

        UserService spy = spy(userService);
        Mockito.doReturn("").when(spy).addStudent(any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any());
        MultipartFile file = new MockMultipartFile("nume", new byte[]{65,',', 66,',',67,',',68,',',69,',',70,',',71,',',72,',',73,',',74,',',75,',',76});
        String s = spy.addStudentCSV(new User("any", "pass", AccountType.admin), file);
        assertEquals("\n", s);
    }

    @Test
    void testAddProfesorCSV_IOException() throws IOException {
        UserService spy = spy(userService);
        Mockito.doReturn("").when(spy).addProfesor(any(), any(), any(), any(), any(), any(), any(), any(), any());
        MultipartFile file =mock(MockMultipartFile.class);

        when(file.getBytes()).thenThrow(new IOException());
        assertThrows(IndexOutOfBoundsException.class,()->spy.addProfesorCSV(new User("any", "pass", AccountType.admin), file));

    }
    @Test
    void testAddProfesorCSV_NormalExec() {
        UserService spy = spy(userService);
        Mockito.doReturn("").when(spy).addProfesor(any(), any(), any(), any(), any(), any(), any(), any(), any());
        MultipartFile file = new MockMultipartFile("nume", new byte[]{65,',', 66,',',67,',',68,',',69,',',70,',',71,',',72,',',73,',',74,',',75,',',76});
        String s = spy.addProfesorCSV(new User("any", "pass", AccountType.admin), file);
        assertEquals("\n", s);
    }

    @Test
    void testAeleteStudent_Normal() {
        Mockito.doNothing().when(userRepo).delete(any());
        String s=userService.deleteStudent(new User("any", "pass", AccountType.admin),"nume");
        assertEquals("",s);
    }
    @Test
    void testAeleteStudent_WrongAccountType() {
        Mockito.doNothing().when(userRepo).delete(any());
        String s=userService.deleteStudent(new User("any", "pass", AccountType.student),"nume");
        assertEquals("",s);
    }

    @Test
    void testDeleteProfesor_WrongAccountType() {
        Mockito.doNothing().when(profesorRepo).delete(any());
        String s=userService.deleteProfesor(new User("any", "pass", AccountType.profesor),"nume");
        assertEquals("",s);
    }
    @Test
    void testDeleteProfesor_Normal() {
        Mockito.doNothing().when(profesorRepo).delete(any());
        String s=userService.deleteProfesor(new User("any", "pass", AccountType.admin),"nume");
        assertEquals("",s);
    }
}