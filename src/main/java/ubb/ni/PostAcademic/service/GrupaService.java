package ubb.ni.PostAcademic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ubb.ni.PostAcademic.domain.AccountType;
import ubb.ni.PostAcademic.domain.Disciplina;
import ubb.ni.PostAcademic.domain.Grupa;
import ubb.ni.PostAcademic.domain.User;
import ubb.ni.PostAcademic.repo.GrupaRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class GrupaService {
    @Autowired
    GrupaRepo grupaRepo;
    @Autowired
    DisciplinaService disciplinaService;

    public Grupa findGrupa(String name){
        for(Grupa g: grupaRepo.findAll()){
            if(g.getNume().equals(name)){
                return g;
            }
        }
        return null;
    }

    public ArrayList<Grupa> getGrupeByMaterie(User user, String cod_materie){
        ArrayList<Grupa> grupe = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.profesor) && disciplinaService.findDisciplina(cod_materie)!= null){
            for(Grupa g: grupaRepo.findAll()){
                if(g.getSpecializare().equals(disciplinaService.findDisciplina(cod_materie).getSpecializare())){
                    grupe.add(g);
                }
            }
        }
        return grupe;
    }
}
