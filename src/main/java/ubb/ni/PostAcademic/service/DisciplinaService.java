package ubb.ni.PostAcademic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.AccountType;
import ubb.ni.PostAcademic.domain.Disciplina;
import ubb.ni.PostAcademic.domain.TipDisciplina;
import ubb.ni.PostAcademic.domain.User;
import ubb.ni.PostAcademic.repo.DisciplinaRepo;
import ubb.ni.PostAcademic.repo.UserRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class DisciplinaService {
    @Autowired
    DisciplinaRepo disciplinaRepo;


    public Disciplina findDisciplina(String cod_disciplina){
        for(Disciplina d: disciplinaRepo.findAll()){
            if(d.getCodDisciplina().equals(cod_disciplina)){
                return d;
            }
        }
        return null;
    }

    public ArrayList<Disciplina> getDisciplineBySemestru(User user, String semestru){
        ArrayList<Disciplina> discipline = new ArrayList<>();

        if(user.getAccountType().equals(AccountType.student)){
            for(Disciplina d : disciplinaRepo.findAll()){
                if(d.getSemestru() == Integer.parseInt(semestru)){
                    discipline.add(d);
                }
            }
        }

        return discipline;
    }

    public ArrayList<Disciplina> getDisciplineBySpecializareAndSemestru(User user, String specializare, String semestru){
        ArrayList<Disciplina> discipline = new ArrayList<>();

        if(user.getAccountType().equals(AccountType.student)){
            for(Disciplina d : disciplinaRepo.findAll()){
                if(d.getSpecializare().equals(specializare) && d.getSemestru().equals(Integer.getInteger(semestru))){
                    discipline.add(d);
                }
            }
        }
        return discipline;
    }

    public ArrayList<Disciplina> getOptionalByPachet(User user, String pachet){
        ArrayList<Disciplina> discipline = new ArrayList<>();

        if(user.getAccountType().equals(AccountType.student)){
            for(Disciplina d : disciplinaRepo.findAll()){
                if(d.getTipDisciplina().equals(TipDisciplina.optionala) && d.getPachet().equals(pachet)){
                    discipline.add(d);
                }
            }
        }

        return discipline;
    }

}
