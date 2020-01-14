package ubb.ni.PostAcademic.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.DisciplinaRepo;
import ubb.ni.PostAcademic.repo.OraRepo;
import ubb.ni.PostAcademic.repo.UserRepo;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class DisciplinaService {
    @Autowired
    DisciplinaRepo disciplinaRepo;
    @Autowired
    UserService userService;
    @Autowired
    OraRepo oraRepo;

    public String getContract(User user){
        Student student = userService.getStudentByUsername(user.getUsername());
        System.out.println("contract");
        if(user.getAccountType().equals(AccountType.student)){
            for(ContractStudii c : student.getContracteStudii()){
                if(c.getAnStart() == student.getAnulInscrierii() +  (student.getSemestru()-1)/2){
                    try {
                        File tempFile = File.createTempFile("contract-", ".pdf");
                        Document document = new Document();
                        PdfWriter.getInstance(document, new FileOutputStream(tempFile));
                        document.open();
                        for(Disciplina d: c.getDiscipline()){
                            document.add(new Paragraph(d.getCodDisciplina() + " - " + d.getNume() + " - " + d.getSpecializare().getNume() + " - " + d.getCredite()));
                        }

                        document.close();



                        byte[] byteArray = IOUtils.toByteArray(new FileInputStream(tempFile));
                        String bytes = new String(Base64.getEncoder().encode(byteArray));

                        System.out.println(bytes);

                        tempFile.delete();

                        return bytes;
                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (DocumentException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return "";
    }


    public void addMateriiToContract(User user, ArrayList<String> materii){
        Student student = userService.getStudentByUsername(user.getUsername());

        if(user.getAccountType().equals(AccountType.student)){
            for(ContractStudii c : student.getContracteStudii()){
                if(c.getAnStart() == student.getAnulInscrierii() +  (student.getSemestru()-1)/2){
                    c.getDiscipline().clear();

                    for(String materie : materii){
                        c.getDiscipline().add(findDisciplina(materie));
                    }
                }
            }
        }
    }


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

        Student student = userService.getStudentByUsername(user.getUsername());

        if(user.getAccountType().equals(AccountType.student)){
            for(ContractStudii c : student.getContracteStudii()){
                if(c.getAnStart() == student.getAnulInscrierii() + (student.getSemestru()-1)/2){
                    for(Disciplina d : c.getDiscipline()){
                        if(d.getSemestru() == Integer.parseInt(semestru)){
                            discipline.add(d);
                        }
                    }
                }
            }

        }

        return discipline;
    }

    public ArrayList<Disciplina> getDisciplineProf(User user){
        HashSet<Disciplina> discipline = new HashSet<>();

        if(user.getAccountType().equals(AccountType.profesor)){
            for(Ora o: oraRepo.findAll()){
                if(o.getProfesor().getUser().equals(user)){
                    discipline.add(o.getDisciplina());
                }
            }

        }

        return new ArrayList<>(discipline);
    }

//    public ArrayList<Disciplina> getAllDisciplineBySemestru(User user, String semestru){
//        ArrayList<Disciplina> discipline = new ArrayList<>();
//
//        Student student = userService.getStudentByUsername(user.getUsername());
//
//        if(user.getAccountType().equals(AccountType.student)){
//            for(Disciplina d : disciplinaRepo.findAll()){
//                if(d.getTipDisciplina().equals(TipDisciplina.obligatorie) && d.getSpecializare().equals(student.getGrupa().getSpecializare()) && d.getSemestru() == Integer.parseInt(semestru)){
//                    discipline.add(d);
//                }
//            }
//        }
//
//        return discipline;
//    }

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
