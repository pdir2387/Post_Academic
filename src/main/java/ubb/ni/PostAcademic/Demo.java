package ubb.ni.PostAcademic;

import org.springframework.beans.factory.annotation.Autowired;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.StudentRepo;
import ubb.ni.PostAcademic.repo.UserRepo;

import java.util.ArrayList;
import java.util.List;

public class Demo {
    @Autowired
    UserRepo userRepo;

    @Autowired
    StudentRepo studentRepo;

    List<User> users = new ArrayList<>();
    List<Student> students = new ArrayList<>();

    public void run(){
        addUsers();
        addStudents();
    }

    private void addUsers() {
        //todo sa nu te uiti doar la constructor ci si la clasa in caz a uitat sa bage ceva in constructor
        User user = new User("mih2312", "pass", AccountType.student);   //todo: incepi cu Obiectele care nu au dependinte de alte obiecte (nu au alte obiecte in constructor sau in clasa

        userRepo.save(user);
    }

    private void addStudents() {
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
                new User());

        User user =userRepo.findUserByUsernameAndPassword(users.get(0).getUsername(),users.get(0).getPassword());

        student.setUser(user);      //todo: sa faci astfel conxiunea si pentru grupa si fiecare in parte
        studentRepo.save(student);
        students.add(student);
    }
}
