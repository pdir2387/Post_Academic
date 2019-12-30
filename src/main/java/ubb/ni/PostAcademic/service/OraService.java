package ubb.ni.PostAcademic.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.ContractRepo;
import ubb.ni.PostAcademic.repo.OraRepo;
import ubb.ni.PostAcademic.repo.PrezentaRepo;
import ubb.ni.PostAcademic.repo.UserRepo;

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
}