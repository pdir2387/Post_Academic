package ubb.ni.PostAcademic.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.ProfesorRepo;
import ubb.ni.PostAcademic.repo.StudentRepo;
import ubb.ni.PostAcademic.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    StudentRepo studentRepo;
    @Autowired
    ProfesorRepo profesorRepo;
    @Autowired
    GrupaService grupaService;

    public User getByUsername(String username){
        for(User u : userRepo.findAll()){
            if(u.getUsername().equals(username)){
                return u;
            }
        }
        return null;
    }

    public Student getStudentByUsername(String username){
        for(Student s : studentRepo.findAll()){
            if(s.getUser().getUsername().equals(username)){
                return s;
            }
        }
        return null;
    }

    public Profesor getProfesorByUsername(String username){
        for(Profesor p : profesorRepo.findAll()){
            if(p.getUser().getUsername().equals(username)){
                return p;
            }
        }
        return null;
    }

    //TODO: Validation
    public String addStudent(User user, String username, String nume, String cnp, String telefon, String cod_student, String grupa, Integer semestru, String email, Integer anulInscrierii, String password){
        String error = "";
        if(user.getAccountType().equals(AccountType.admin)){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if(error.isEmpty()){
                Grupa g = grupaService.findGrupa(grupa);

                User user_nou = new User(username, passwordEncoder.encode(password), AccountType.student);
                userRepo.save(user_nou);

                List<ContractStudii> contracteStudii = new ArrayList<>();
                for(int i=0; i<g.getSpecializare().getDurata_studii(); i++){
                    ContractStudii c = new ContractStudii(anulInscrierii+i);
                    contracteStudii.add(c);
                }
                studentRepo.save(new Student(nume, cnp, telefon, cod_student, g, semestru, email, anulInscrierii, contracteStudii, user_nou));
            }
        }
        return error;
    }


    //TODO: Validation
    public String addProfesor(User user, String username, String nume, String password, String email, String website, String adresa, String telefon, String domenii_de_interes){
        String error = "";
        if(user.getAccountType().equals(AccountType.admin)){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if(error.isEmpty()){
                User user_nou = new User(username, passwordEncoder.encode(password), AccountType.profesor);
                userRepo.save(user_nou);


                profesorRepo.save(new Profesor(nume, email, website, adresa, telefon, domenii_de_interes, user));
            }
        }
        return error;
    }

    public String addStudentCSV(User user, MultipartFile file){
        String error = "";
        if(user.getAccountType().equals(AccountType.admin)){
            String fileString = "";
            try {
                fileString = new String(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            for(String elem : fileString.split("\n")){
                String[] userDetails = elem.split(",");

                error += addStudent(user, userDetails[0], userDetails[1], userDetails[2], userDetails[3], userDetails[4], userDetails[5], Integer.getInteger(userDetails[6]), userDetails[7], Integer.getInteger(userDetails[8]), userDetails[9])  + "\n";
            }

        }
        return error;
    }

    public String addProfesorCSV(User user, MultipartFile file){
        String error = "";
        if(user.getAccountType().equals(AccountType.admin)){
            String fileString = "";
            try {
                fileString = new String(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            for(String elem : fileString.split("\n")){
                String[] userDetails = elem.split(",");

                error += addProfesor(user, userDetails[0], userDetails[1], userDetails[2], userDetails[3], userDetails[4], userDetails[5], userDetails[6], userDetails[7]) + "\n";
            }

        }
        return error;
    }

    //TODO: Validation
    public String deleteStudent(User user, String username){
        String error = "";
        if(user.getAccountType().equals(AccountType.admin)){

            if(error.isEmpty()){
                userRepo.delete(getByUsername(username));
            }
        }
        return error;
    }

    //TODO: Validation
    public String deleteProfesor(User user, String username){
        String error = "";
        if(user.getAccountType().equals(AccountType.admin)){

            if(error.isEmpty()){
                profesorRepo.delete(getProfesorByUsername(username));
            }
        }
        return error;
    }
}
