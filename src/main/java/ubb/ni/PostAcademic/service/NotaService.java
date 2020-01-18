package ubb.ni.PostAcademic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.DisciplinaRepo;
import ubb.ni.PostAcademic.repo.MedieRepo;
import ubb.ni.PostAcademic.repo.NotaRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class NotaService {
    @Autowired
    NotaRepo notaRepo;
    @Autowired
    MedieRepo medieRepo;
    @Autowired
    UserService userService;
    @Autowired
    OraService oraService;
    @Autowired
    DisciplinaService disciplinaService;


    public ArrayList<Nota> getNoteByMaterie(User user, String disciplina){
        System.out.println(user.getUsername());
        ArrayList<Nota> note = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.student)){
            for(Nota nota: notaRepo.findAll()){
                if(nota.getStudent().getUser().equals(user) && nota.getOra().getDisciplina().getCodDisciplina().equals(disciplina)){
                    note.add(nota);
                }
            }
        }
        return note;
    }

    public ArrayList<Medie> getMedii(User user){
        ArrayList<Medie> medii = new ArrayList<>();

        Student student = userService.getStudentByUsername(user.getUsername());

        if(user.getAccountType().equals(AccountType.student)){
            for(Medie medie: medieRepo.findAll()){
                if(medie.getStudent().equals(student)){
                    medii.add(medie);
                }
            }
        }
        return medii;
    }

    public ArrayList<Medie> getMediiBySemestre(User user, String[] semestre){
        ArrayList<Medie> medii = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.student)){
            Student student = userService.getStudentByUsername(user.getUsername());
            for(Medie medie: medieRepo.findAll()){
                if(medie.getStudent().equals(student)){
                    for(String semestru : semestre){
                        if(medie.getSmestru() == Integer.parseInt(semestru)){
                            medii.add(medie);
                        }
                    }
                }
            }
        }
        return medii;
    }

    public ArrayList<Medie> getMediiByMaterie(User user, String materie){
        ArrayList<Medie> medii = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.profesor)){
            for(Medie medie: medieRepo.findAll()){
                if(medie.getDisciplina().getCodDisciplina().equals(materie)){
                    medii.add(medie);
                }
            }
        }
        return medii;
    }


    public ArrayList<Medie> getMediiByMaterieAndGrupa(User user, String materie, String grupa){
        ArrayList<Medie> medii = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.profesor)){
            for(Medie medie: medieRepo.findAll()){
                if(medie.getDisciplina().getCodDisciplina().equals(materie) && medie.getStudent().getGrupa().getNume().equals(grupa)){
                    medii.add(medie);
                }
            }
        }
        return medii;
    }

    public ArrayList<Nota> getNoteByStudentAndMaterie(User user,String student, String disciplina){
        ArrayList<Nota> note = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.profesor)){
            for(Nota nota: notaRepo.findAll()){
                if(nota.getStudent().getUser().getUsername().equals(student) && nota.getOra().getDisciplina().getCodDisciplina().equals(disciplina)){
                    note.add(nota);
                }
            }
        }
        return note;
    }

    public ArrayList<Nota> getNoteByMaterieAndTip(User user,String disciplina, String tip){
        ArrayList<Nota> note = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.profesor)){
            for(Nota nota: notaRepo.findAll()){
                if(nota.getOra().getDisciplina().getCodDisciplina().equals(disciplina) && nota.getOra().getTipOra().equals(TipOra.valueOf(tip))){
                    note.add(nota);
                }
            }
        }
        return note;
    }

    public ArrayList<Nota> getNoteByMaterieAndTipAndGrupa(User user,String disciplina, String tip, String grupa){
        ArrayList<Nota> note = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.profesor)) {
            for(Nota nota: notaRepo.findAll()){
                if(nota.getOra().getDisciplina().getCodDisciplina().equals(disciplina) && nota.getOra().getTipOra().equals(TipOra.valueOf(tip)) && nota.getStudent().getGrupa().getNume().equals(grupa)){
                    note.add(nota);
                }
            }
        }
        return note;
    }

    public String addNota(User user, Disciplina materie, Student student, String saptamana, String nota, String tip, String observatii){
        String error = "";
        if(user.getAccountType().equals(AccountType.profesor)) {
            System.out.println(oraService.getOraByMaterieAndTip(user, materie.getCodDisciplina(), tip).getId());
            notaRepo.save(new Nota(Integer.parseInt(saptamana), oraService.getOraByMaterieAndTip(user, materie.getCodDisciplina(), tip), Integer.parseInt(nota), observatii, student));
        }
        return error;
    }


    public String addMedie(User user, String materie, String student, String nota, String grupa){
        String error = "";
        if(user.getAccountType().equals(AccountType.profesor)) {
            Student s = userService.getStudentByCod(student);
            System.out.println(materie + " " + student + " " + nota + " " + grupa);
            for(Medie m: medieRepo.findAll()){
                if(m.getStudent().equals(s) && m.getDisciplina().getCodDisciplina().equals(materie)){
                    return "Medie deja existenta!";
                }
            }
            medieRepo.save(new Medie(s.getAnulInscrierii()+(s.getSemestru()/2), s.getSemestru(), Integer.parseInt(nota), s, disciplinaService.findDisciplina(materie), Integer.parseInt(nota)>5));
        }
        return error;
    }


}
