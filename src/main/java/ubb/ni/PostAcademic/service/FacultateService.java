package ubb.ni.PostAcademic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.AccountType;
import ubb.ni.PostAcademic.domain.Facultate;
import ubb.ni.PostAcademic.domain.Specializare;
import ubb.ni.PostAcademic.domain.User;
import ubb.ni.PostAcademic.repo.FacultateRepo;
import ubb.ni.PostAcademic.repo.SpecializareRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class FacultateService {
    @Autowired
    FacultateRepo facultateRepo;
    @Autowired
    SpecializareRepo specializareRepo;

    public ArrayList<Facultate> getListaFacultati(User user){
        ArrayList<Facultate> facultati = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.student)){
            for(Facultate facultate : facultateRepo.findAll()){
                facultati.add(facultate);
            }
        }
        return facultati;
    }

    public ArrayList<Specializare> getSpecializariByFacultate(User user, String facultate){
        ArrayList<Specializare> specializari = new ArrayList<>();
        if(user.getAccountType().equals(AccountType.student)) {
            for (Specializare specializare : specializareRepo.findAll()) {
                if (specializare.getFacultate().getNume().equals(facultate)) {
                    specializari.add(specializare);
                }
            }
        }
        return specializari;
    }
}
