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


    public ArrayList<Nota> getNoteByMaterie(User user, String disciplina){
        ArrayList<Nota> note = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.student)){
            for(Nota nota: notaRepo.findAll()){
                if(nota.getStudent().getId().equals(user.getId()) && nota.getOra().getDisciplina().getCodDisciplina().equals(disciplina)){
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
                if(nota.getOra().getDisciplina().getNume().equals(disciplina) && nota.getOra().getTipOra().equals(TipOra.valueOf(tip))){
                    note.add(nota);
                }
            }
        }
        return note;
    }

    public ArrayList<Nota> getNoteByMaterieAndTipAndGrupa(User user,String disciplina, String tip, String grupa){
        ArrayList<Nota> note = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.profesor)){
            for(Nota nota: notaRepo.findAll()){
                if(nota.getOra().getDisciplina().getNume().equals(disciplina) && nota.getOra().getTipOra().equals(TipOra.valueOf(tip)) && nota.getStudent().getGrupa().getNume().equals(grupa)){
                    note.add(nota);
                }
            }
        }
        return note;
    }
}
