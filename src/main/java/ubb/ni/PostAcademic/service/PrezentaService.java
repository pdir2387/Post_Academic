package ubb.ni.PostAcademic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.Prezenta;
import ubb.ni.PostAcademic.repo.PrezentaRepo;
import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class PrezentaService {
    @Autowired
    PrezentaRepo prezentaRepo;

    public ArrayList<Prezenta> getPrezente(){
        ArrayList<Prezenta> prezente = new ArrayList<>();
        for(Prezenta prezenta: prezentaRepo.findAll()){
            prezente.add(prezenta);
        }
        return prezente;
    }
}