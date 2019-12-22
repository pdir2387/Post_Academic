package ubb.ni.PostAcademic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.Nota;
import ubb.ni.PostAcademic.repo.NotaRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class NotaService {
    @Autowired
    NotaRepo notaRepo;

    public ArrayList<Nota> getNote(){
        ArrayList<Nota> note = new ArrayList<>();
        for(Nota nota: notaRepo.findAll()){
            note.add(nota);
        }
        return note;
    }
}
