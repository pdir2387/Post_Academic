package ubb.ni.PostAcademic.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;

@Service
@Transactional
public class OraService {
    @Autowired
    ContractRepo contractRepo;
    @Autowired
    UserService userService;
    @Autowired
    OraRepo oraRepo;

    public ArrayList<Ora> getOre(User user){
        ArrayList<Ora> ore = new ArrayList<Ora>();
        if(user.getAccountType().equals(AccountType.student)){
            Student student = userService.getStudentByUsername(user.getUsername());
            for(ContractStudii c : student.getContracteStudii()){
                for(Disciplina d : c.getDiscipline()){
                    if(d.getSemestru().equals(student.getSemestru())){
                        ore.addAll(d.getOre());
                    }
                }
            }
        }
        return ore;
    }

    public ArrayList<Ora> getOreProfesor(User user){
        ArrayList<Ora> ore = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.profesor)){
            Profesor profesor = userService.getProfesorByUsername(user.getUsername());
            for(Ora o : oraRepo.findAll()){
                if(o.getDisciplina().getSemestru().equals(profesor.getSemestru())){
                    ore.add(o);
                }
            }
        }
        return ore;
    }

    public ArrayList<TipOra> getTipuriOraProf(User user, String disciplina){
        ArrayList<TipOra> tipuri = new ArrayList<>();

        if(user.getAccountType().equals(AccountType.profesor)) {
            Profesor prof = userService.getProfesorByUsername(user.getUsername());

            boolean foundCurs = false;
            boolean foundSeminar = false;
            boolean foundLab = false;
            for (Ora ora : oraRepo.findAll()) {
                if (foundCurs && foundSeminar && foundLab) {
                    break;
                }

                if (ora.getProfesor().equals(prof) && ora.getDisciplina().getCodDisciplina().equals(disciplina)) {
                    if (!foundCurs && ora.getTipOra().equals(TipOra.curs)) {
                        tipuri.add(TipOra.curs);
                        foundCurs = true;
                        continue;
                    }
                    if (!foundSeminar && ora.getTipOra().equals(TipOra.seminar)) {
                        tipuri.add(TipOra.seminar);
                        foundSeminar = true;
                        continue;
                    }
                    if (!foundLab && ora.getTipOra().equals(TipOra.laborator)) {
                        tipuri.add(TipOra.laborator);
                        foundLab = true;
                    }
                }
            }
        }
        return tipuri;

    }

    public ArrayList<Ora> getOreByMaterie(User user, String disciplina){
        if(user.getAccountType().equals(AccountType.student)){
            Student student = userService.getStudentByUsername(user.getUsername());
            for(ContractStudii c : student.getContracteStudii()){
                for(Disciplina d : c.getDiscipline()){
                    if(d.getCodDisciplina().equals(disciplina)){
                        return (ArrayList)d.getOre();
                    }
                }
            }
        }
        return new ArrayList<>();
    }

    public Ora getOraByMaterieAndTip(User user, String disciplina, String tip){
        if(user.getAccountType().equals(AccountType.profesor)){
            for(Ora d: oraRepo.findAll()){
                if(d.getDisciplina().getCodDisciplina().equals(disciplina) && d.getTipOra().toString().equals(tip)){
                    return d;
                }
            }
        }
        return null;
    }
}