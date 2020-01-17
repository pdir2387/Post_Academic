package ubb.ni.PostAcademic.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.repo.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
@Transactional
public class DBDataInsertion {
    @Autowired
    UserRepo userRepo;

    @Autowired
    FacultateRepo facultateRepo;

    @Autowired
    SpecializareRepo specializareRepo;

    @Autowired
    GrupaRepo grupaRepo;

    @Autowired
    ProfesorRepo profesorRepo;

    @Autowired
    DisciplinaRepo disciplinaRepo;

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    SalaRepo salaRepo;

    @Autowired
    OraRepo oraRepo;

    @Autowired
    ContractRepo contractRepo;

    List<User> users = new ArrayList<>();
    List<Facultate> facultati = new ArrayList<>();
    List<Specializare> specializari = new ArrayList<>();
    List<Grupa> grupe = new ArrayList<>();
    List<Profesor> profesori = new ArrayList<>();
    List<Disciplina> discipline = new ArrayList<>();
    List<Sala> sali = new ArrayList<>();
    List<Ora> ore = new ArrayList<>();
    List<ContractStudii> contracteStudii = new ArrayList<>();

    List<Student> students = new ArrayList<>();

    private final Random random = new Random();

    private final int BASE_COUNT = 20;

    public String run()
    {
        String message = "";
        message += addUsers();
        message += addFacultati();
        message += addSpecializari();
        message += addGrupe();
        message += addProfesori();
        message += addDiscipline();
        message += addSali();
        message += addOre();
        message += addContracte();
        message += addStudenti();

        return message;
    }

    private String addUsers()
    {
        List<User> userList = new ArrayList<>();

        for (int i = 0; i < BASE_COUNT * 20; i++)
        {
            if (i % 10 == 9)
                userList.add(new User("admin_" + i, "password", AccountType.admin));
            else if (i % 5 == 3)
                userList.add(new User("profesor_" + i, "password", AccountType.profesor));
            else
                userList.add(new User("user_" + i, "password", AccountType.student));
        }

        users = userList;

        if (userRepo.count() == 0)
        {
            userRepo.saveAll(userList);
            return "Added users\n";
        }
        else
            return "Skipped users\n";
    }

    private String addFacultati()
    {
        List<Facultate> facultateList = new ArrayList<>();

        for (int i = 0; i < BASE_COUNT / 2; i++)
            facultateList.add(new Facultate("Facultatea numarul " + i));

        facultati = facultateList;

        if (facultateRepo.count() == 0)
        {
            facultateRepo.saveAll(facultateList);
            return "Added facultati\n";
        }
        else
            return "Skipped facultati\n";
    }

    private String addSpecializari()
    {
        List<Specializare> specializareList = new ArrayList<>();

        for (int i = 0; i < BASE_COUNT * 2; i++)
            specializareList.add(new Specializare("Specializare " + i,
                    1 + random.nextInt(4),
                    facultateRepo.getFacultateByNume(facultati.get(i % (facultati.size())).getNume())));

        specializari = specializareList;

        if (specializareRepo.count() == 0)
        {
            specializareRepo.saveAll(specializareList);
            return "Added specializari\n";
        }
        else
            return "Skipped specializari\n";
    }

    private String addGrupe()
    {
        List<Grupa> grupaList = new ArrayList<>();

        for (int i = 0; i < BASE_COUNT * 10; i++)
        {
            Specializare specializare = specializari.get(i % specializari.size());
            grupaList.add(new Grupa("Grupa numarul " + i,
                    specializareRepo.getSpecializareByNumeAndFacultate(specializare.getNume(),
                            specializare.getFacultate()),
                    i % 5 + 1));
        }

        grupe = grupaList;

        if (grupaRepo.count() == 0)
        {
            grupaRepo.saveAll(grupaList);
            return "Added grupe\n";
        }
        else
            return "Skipped grupe\n";
    }

    private String addProfesori()
    {
        List<Profesor> profesorList = new ArrayList<>();

        int offset = 0;

        for (int i = 0; i < BASE_COUNT * 2; i++)
        {
            long nr = 740690000L + i;

            while (!users.get(offset).getAccountType().equals(AccountType.profesor))
            {
                if (offset >= users.size())
                    offset = 0;
                offset++;
            }
            User localProfesor = users.get(offset);

            User userTypeProfesor = userRepo.findUserByUsernameAndPassword(localProfesor.getUsername(),
                    users.get(i * 5 + 3).getPassword());
            profesorList.add(new Profesor("Profesor " + i,
                    "email" + i + "@cs.ubbcluj.ro",
                    "prof" + i + ".com",
                    "str. Romania, nr. " + (i + 1),
                    String.valueOf(nr),
                    "Facultate",
                    userTypeProfesor));

            offset++;
        }

        profesori = profesorList;

        if (profesorRepo.count() == 0)
        {
            profesorRepo.saveAll(profesorList);
            return "Added profesori\n";
        }
        else
            return "Skipped profesori\n";
    }

    private String addDiscipline()
    {
        List<Disciplina> disciplinaList = new ArrayList<>();

        for (int i = 0; i < BASE_COUNT; i++)
        {
            Specializare specializare = specializari.get(i % specializari.size());
            Specializare repoSpec = specializareRepo.getSpecializareByNumeAndFacultate(specializare.getNume(),
                    specializare.getFacultate());
            disciplinaList.add(new Disciplina("Disciplina " + i,
                    new ArrayList<>(),
                    i % 6 + 1,
                    i % 2 == 0 ? 4 : 6,
                    i % 3 == 0 ? TipDisciplina.obligatorie : i % 3 == 1 ? TipDisciplina.optionala : TipDisciplina.facultativa,
                    facultateRepo.getFacultateByNume(repoSpec.getFacultate().getNume()),
                    repoSpec,
                    "cod_" + i,
                    "MLPX63" + i + "2",
                    String.valueOf(5 * (i % BASE_COUNT + BASE_COUNT)),
                    i));
        }

        discipline = disciplinaList;

        if (disciplinaRepo.count() == 0)
        {
            disciplinaRepo.saveAll(disciplinaList);
            return "Added discipline\n";
        }
        else
            return "Skipped discipline\n";
    }

    private String addSali()
    {
        List<Sala> salaList = new ArrayList<>();

        for (int i = 0; i < BASE_COUNT * 2; i++)
        {
            if (i % 2 == 0)
                salaList.add(new Sala("Sala Johhanis " + i, "Cluj Arena"));
            else
                salaList.add(new Sala("Sala centru" + i, "PMV"));
        }

        sali = salaList;

        if (salaRepo.count() == 0)
        {
            salaRepo.saveAll(salaList);
            return "Added sali\n";
        }
        else
            return "Skipped sali\n";
    }

    private String getDay(int i)
    {
        i = i % 7;
        switch (i)
        {
            case 0:
                return "Luni";
            case 1:
                return "Marti";
            case 2:
                return "Miercuri";
            case 3:
                return "Joi";
            case 4:
                return "Vineri";
            case 5:
                return "Sambata";
            default:
                return "Duminica";
        }
    }

    private String addOre()
    {
        List<Ora> oraList = new ArrayList<>();
        List<Disciplina> disciplinaList = new ArrayList<>();
        List<Integer> oneToMany = new ArrayList<>();

        for (int i = 0; i < BASE_COUNT * 5; i++)
        {
            List<Grupa> formatie = new ArrayList<>();

            for (int j = 0; j < i % 3 + 1; j++)
                formatie.add(grupaRepo.getGrupaByNume(grupe.get((i + j) % grupe.size()).getNume()));

            oneToMany.add(i % discipline.size());

            //Disciplina disciplina = discipline.get(i % discipline.size());
            //disciplina.getOre().add(oraList.get(oraList.size() - 1));
            //disciplinaRepo.save(disciplina);

            oraList.add(new Ora(getDay(i),
                    (i % 5) * 2 + 8,
                    (i % 5) * 2 + 10,
                    i % 2 + 1,
                    salaRepo.getSalaByNume(sali.get(i % sali.size()).getNume()),
                    formatie,

                    null,
                    //NULL

                    profesorRepo.getProfesorByNume(profesori.get(i % profesori.size()).getNume()),
                    i % 3 == 0 ? TipOra.curs : i % 3 == 1 ? TipOra.seminar : TipOra.laborator,
                    "CFCFCF"));
        }

        ore = oraList;

        if (oraRepo.count() == 0)
        {
            oraRepo.saveAll(oraList);
            for (int i = 0; i < oneToMany.size(); i++)
            {
                Ora ora = oraList.get(i);
                Disciplina disciplina = discipline.get(oneToMany.get(i));
                disciplina.getOre().add(ora);
                ora.setDisciplina(disciplina);
                disciplinaRepo.save(disciplina);
                oraRepo.save(ora);
            }
            return "Added ore\n";
        }
        else
            return "Skipped ore\n";
    }

    private String addContracte()
    {
        List<ContractStudii> contractStudiiList = new ArrayList<>();

        for (int i = 0; i < BASE_COUNT / 2; i++)
        {
            List<Disciplina> disciplinaList = new ArrayList<>();
            ContractStudii contractStudii = new ContractStudii(i % 4 + 1);

            for (int j = 0; j < i % 3 + 2; j++)
                disciplinaList.add(disciplinaRepo.getFirstByCodDisciplina(discipline.get((i + j) % discipline.size())
                        .getNume()));

            contractStudii.setDiscipline(disciplinaList);
            contractStudiiList.add(contractStudii);
        }

        contracteStudii = contractStudiiList;

        if (contractRepo.count() == 0)
        {
            contractRepo.saveAll(contractStudiiList);
            return "Added contracte\n";
        }
        else
            return "Skipped contracte\n";
    }

    private String addStudenti()
    {
        List<Student> studentList = new ArrayList<>();

        int offset = 0;
        for (int i = 0; i < BASE_COUNT * 10; i++)
        {
            while (offset < users.size() && !users.get(offset).getAccountType().equals(AccountType.student))
            {
                if (offset >= users.size())
                    offset = 0;
                offset++;
            }

            User user = users.get(offset);
            ContractStudii contractStudii = contracteStudii.get(i % contracteStudii.size());
            List<ContractStudii> temp = new ArrayList<>();
            temp.add(contractRepo.findFirstByAnStart(contractStudii.getAnStart()));
            contractStudii = contracteStudii.get(i % contracteStudii.size());
            temp.add(contractRepo.findFirstByAnStart(contractStudii.getAnStart()));

            studentList.add(new Student("Student " + i,
                    "1234567890123",
                    "1234567890",
                    "std" + i,
                    grupaRepo.getGrupaByNume(grupe.get(i % grupe.size()).getNume()),
                    i % 6 + 1,
                    "email" + i + "@scs.ubccluj.ro",
                    i % 10 + 2010,
                    temp,
                    userRepo.findUserByUsernameAndPassword(user.getUsername(), user.getPassword())));
            offset++;
        }

        students = studentList;

        if (studentRepo.count() == 0)
        {
            studentRepo.saveAll(studentList);
            return "Added studenti\n";
        }
        else
            return "Skipped studenti\n";
    }
}