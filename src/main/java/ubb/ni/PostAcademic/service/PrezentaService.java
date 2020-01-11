package ubb.ni.PostAcademic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.PrezentaRepo;
import ubb.ni.PostAcademic.repo.UserRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;

@Service
@Transactional
public class PrezentaService {
    @Autowired
    PrezentaRepo prezentaRepo;
    @Autowired
    UserService userService;

    public ArrayList<ArrayList<Boolean>> getPrezenteByMaterie(User user, String disciplina){
        ArrayList<ArrayList<Boolean>> prezente = new ArrayList<>();
        ArrayList<Boolean> prezente_curs = new ArrayList<>(Arrays.asList(false, false, false, false, false, false, false, false, false, false, false, false, false, false));
        ArrayList<Boolean> prezente_seminar = new ArrayList<>(Arrays.asList(false, false, false, false, false, false, false, false, false, false, false, false, false, false));
        ArrayList<Boolean> prezente_lab = new ArrayList<>(Arrays.asList(false, false, false, false, false, false, false, false, false, false, false, false, false, false));

        Student student = userService.getStudentByUsername(user.getUsername());


        if(user.getAccountType().equals(AccountType.student)){
            for(int i=0; i<14;i++){
                for(Prezenta prezenta: prezentaRepo.findAll()) {
                    if (prezenta.getStudent().equals(student) && prezenta.getOra().getDisciplina().getCodDisciplina().equals(disciplina) && prezenta.getSaptamana() == i+1) {
                        if (prezenta.getOra().getTipOra().equals(TipOra.curs)) {
                            prezente_curs.set(i, prezenta.getPrezent());
                        } else if (prezenta.getOra().getTipOra().equals(TipOra.seminar)) {
                            prezente_seminar.set(i, prezenta.getPrezent());
                        } else if (prezenta.getOra().getTipOra().equals(TipOra.laborator)) {
                            prezente_lab.set(i, prezenta.getPrezent());
                        }
                    }
                }
            }

            prezente.add(prezente_curs);

            prezente.add(prezente_seminar);

            prezente.add(prezente_lab);
        }

        return prezente;
    }
}