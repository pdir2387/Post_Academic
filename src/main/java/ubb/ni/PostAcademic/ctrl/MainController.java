/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ubb.ni.PostAcademic.ctrl;

import java.sql.SQLOutput;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;


import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ubb.ni.PostAcademic.domain.*;
import ubb.ni.PostAcademic.service.*;


@RestController
public class MainController {
	@Autowired
	UserService userService;
	@Autowired
	NotaService notaService;
	@Autowired
	PrezentaService prezentaService;
	@Autowired
	OraService oraService;
	@Autowired
	DisciplinaService disciplinaService;
	@Autowired
	FacultateService facultateService;
	@Autowired
	GrupaService grupaService;

	@GetMapping(value = "/api/authority")
	@ResponseBody
	public String auth() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth instanceof AnonymousAuthenticationToken) {
			return "anon";
		}
		return auth.getAuthorities().toArray()[0].toString();
	}

	//ADMIN
	@PostMapping("/api/admin/addStudent")
	public String addStudent(@RequestParam String username, @RequestParam String nume, @RequestParam String cnp, @RequestParam String telefon, @RequestParam String cod_student, @RequestParam String grupa, @RequestParam Integer semestru, @RequestParam String email, @RequestParam Integer anulInscrierii, @RequestParam String password) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());
		return userService.addStudent(user, username, nume, cnp, telefon, cod_student, grupa, semestru, email, anulInscrierii, password);
	}

	@PostMapping("/api/admin/addStudentCSV")
	public String addStudentCSV(@RequestParam MultipartFile file) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		return userService.addStudentCSV(user, file);
	}

	@PostMapping("/api/admin/deleteStudent")
	public String deleteStudent(@RequestParam String username) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		return userService.deleteStudent(user, username);
	}

	@PostMapping("/api/admin/addProfesor")
	public String addProfesor(@RequestParam String username, @RequestParam String nume, @RequestParam String password, @RequestParam String email, @RequestParam String website, @RequestParam String adresa, @RequestParam String telefon, @RequestParam String domenii_de_interes) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());
		return userService.addProfesor(user, username, nume, password, email, website, adresa, telefon, domenii_de_interes);
	}

	@PostMapping("/api/admin/addProfesorCSV")
	public String addProfesorCSV(@RequestParam MultipartFile file) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		return userService.addProfesorCSV(user, file);
	}

	@PostMapping("/api/admin/deleteProfesor")
	public String deleteProfesor(@RequestParam String username) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		return userService.deleteProfesor(user, username);
	}




	//STUDENT
	@PostMapping(value = "/api/student/contract/add", consumes = "text/plain")
	public void addMateriiToContract(@RequestBody String materii) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray json = new JSONArray(materii);

		ArrayList<String> materii_list = new ArrayList<>();

		for(Object object : json.toList()){
			materii_list.add(object.toString());
		}


		disciplinaService.addMateriiToContract(user, materii_list);
	}


	@GetMapping(value = "/api/student/note/{disciplina}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getNoteByMaterie(@PathVariable("disciplina") String disciplina) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();

		for (Nota nota : notaService.getNoteByMaterie(user, disciplina)) {
			JSONObject nota_object = new JSONObject();
			nota_object.put("materie", nota.getOra().getDisciplina());
			nota_object.put("data", nota.getData().toString());
			nota_object.put("nota", nota.getNota());
			nota_object.put("tip", nota.getOra().getTipOra().toString());
			nota_object.put("observatii", nota.getNotita());

			wrapper.put(nota_object);
		}

		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/prezente/{disciplina}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getPrezenteByMaterie(@PathVariable("disciplina") String disciplina) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONObject wrapper = new JSONObject();

		ArrayList<ArrayList<Boolean>> prezenteByMaterie = prezentaService.getPrezenteByMaterie(user, disciplina);

		for (int i = 0; i < 3; i++) {
			ArrayList<Boolean> lista_prezente = prezenteByMaterie.get(i);



			wrapper.put(TipOra.values()[i].toString(), lista_prezente);
		}

		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/medii", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getMedii() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();

		DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy");


		for (Medie m : notaService.getMedii(user)) {
			JSONObject medie_json = new JSONObject();

			medie_json.put("year", m.getAn_universitar() + "/" + ((m.getAn_universitar() + 1)));
			medie_json.put("semester", m.getSmestru());
			medie_json.put("code", m.getDisciplina().getCodDisciplina());
			medie_json.put("name", m.getDisciplina().getNume());
			medie_json.put("grade", m.getNota());
			medie_json.put("credits", m.getDisciplina().getCredite());
			medie_json.put("date", format.format(m.getData_promovarii()));

			wrapper.put(medie_json);
		}


		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/ani", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getAni() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Student user = userService.getStudentByUsername(auth.getName());

		JSONObject wrapper = new JSONObject();

		wrapper.put("inceput", user.getAnulInscrierii());
		wrapper.put("durata", user.getGrupa().getSpecializare().getDurata_studii());
		wrapper.put("semestru", user.getSemestru());

		return wrapper.toString();
	}

//	@GetMapping(value = "/api/student/materii/all/{semestru}", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public String getAllMateriiBySemestru(@PathVariable("semestru") String semestru) {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		User user = userService.getByUsername(auth.getName());
//
//		JSONArray wrapper = new JSONArray();
//
//		for (Disciplina m : disciplinaService.getAllDisciplineBySemestru(user, semestru)) {
//			JSONObject disciplina_json = new JSONObject();
//
//			Boolean promovat = false;
//
//			String[] semestre = {semestru};
//
//			System.out.println(semestre);
//
//			for(Medie a: notaService.getMediiBySemestre(user, semestre)){
//				System.out.println(a.getId());
//				if(a.getDisciplina().equals(m)){
//					promovat = a.getPromovat();
//				}
//			}
//
//			disciplina_json.put("code", m.getCodDisciplina());
//            disciplina_json.put("name", m.getNume());
//            disciplina_json.put("occupiedPlaces", m.getNumar_studenti_inscrisi());
//            disciplina_json.put("totalPlaces", m.getNumar_locuri());
//            disciplina_json.put("type", m.getTipDisciplina());
//            disciplina_json.put("credits", m.getCredite());
//			disciplina_json.put("promovat", promovat);
//
//
//			wrapper.put(disciplina_json);
//		}
//
//
//		return wrapper.toString();
//	}

	@GetMapping(value = "/api/student/materii/{semestru}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getMateriiBySemestru(@PathVariable("semestru") String semestru) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();

		for (Disciplina m : disciplinaService.getDisciplineBySemestru(user, semestru)) {
			JSONObject disciplina_json = new JSONObject();

			Boolean promovat = false;

			String[] semestre = {semestru};

			System.out.println(semestre);

			for(Medie a: notaService.getMediiBySemestre(user, semestre)){
				System.out.println(a.getId());
				if(a.getDisciplina().equals(m)){
					promovat = a.getPromovat();
				}
			}

			disciplina_json.put("code", m.getCodDisciplina());
			disciplina_json.put("name", m.getNume());
			disciplina_json.put("occupiedPlaces", m.getNumar_studenti_inscrisi());
			disciplina_json.put("totalPlaces", m.getNumar_locuri());
			disciplina_json.put("type", m.getTipDisciplina());
			disciplina_json.put("credits", m.getCredite());
			disciplina_json.put("promovat", promovat);


			wrapper.put(disciplina_json);
		}


		return wrapper.toString();
	}


	@GetMapping(value = "/api/student/materii/", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getMaterii() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();

		for (Disciplina m : disciplinaService.getDisciplineBySemestru(user, userService.getStudentByUsername(user.getUsername()).getSemestru().toString())) {
			JSONObject disciplina_json = new JSONObject();


			disciplina_json.put("code", m.getCodDisciplina());
			disciplina_json.put("name", m.getNume());
			disciplina_json.put("occupiedPlaces", m.getNumar_studenti_inscrisi());
			disciplina_json.put("totalPlaces", m.getNumar_locuri());
			disciplina_json.put("type", m.getTipDisciplina());
			disciplina_json.put("credits", m.getCredite());


			wrapper.put(disciplina_json);
		}


		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/medii/{semestre}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getMediiBySemestre(@PathVariable("semestre") String semestre) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();

		String[] semestre_separate = semestre.split("&");

		for (Medie m : notaService.getMediiBySemestre(user, semestre_separate)) {
			JSONObject medie_json = new JSONObject();

			medie_json.put("year", m.getAn_universitar() + "/" + ((m.getAn_universitar() + 1)));
			medie_json.put("semester", m.getSmestru());
			medie_json.put("code", m.getDisciplina().getCodDisciplina());
			medie_json.put("name", m.getDisciplina().getNume());
			medie_json.put("grade", m.getNota());
			medie_json.put("credits", m.getDisciplina().getCredite());
			medie_json.put("date", m.getData_promovarii());

			wrapper.put(medie_json);
		}


		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/informatii_personale", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getInformatiiPersonale() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Student user = userService.getStudentByUsername(auth.getName());


		JSONObject wrapper = new JSONObject();

		wrapper.put("name", user.getNume());
		wrapper.put("cnp", user.getCnp());
		wrapper.put("cod", user.getCnp());
		wrapper.put("grupa", user.getGrupa().getNume());
		wrapper.put("an", user.getSemestru() / 2 + 1);
		wrapper.put("semestru", user.getSemestru());


		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/ore/{disciplina}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getOreByMaterie(@PathVariable("disciplina") String disciplina) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();


		for (Ora o : oraService.getOreByMaterie(user, disciplina)) {
			JSONObject medie_json = new JSONObject();

			medie_json.put("zi", o.getZi());
			medie_json.put("color", o.getColor());
			medie_json.put("nume", o.getDisciplina().getNume());
			medie_json.put("start", o.getOraStart());
			medie_json.put("durata", o.getOraEnd() - o.getOraStart());
			medie_json.put("tip", o.getTipOra());
			medie_json.put("tipDisciplina", o.getDisciplina().getTipDisciplina());

			wrapper.put(medie_json);
		}


		return wrapper.toString();
	}

	//TO DO - DELETE THIS ENDPOINT WHEN EVERYTHING IS FUNCTIONAL
	@GetMapping(value = "/api/orar", produces = MediaType.APPLICATION_JSON_VALUE)
	public String getOrar() {
		return "[{\"zi\":\"luni\",\"color\":\"red\",\"nume\":\"Limbaje formale si tehnici de compilare\",\"start\":12,\"durata\":2,\"tip\":\"curs\",\"optional\":false},{\"zi\":\"luni\",\"color\":\"green\",\"nume\":\"Programare paralela\",\"start\":14,\"durata\":2,\"tip\":\"curs\",\"optional\":false},{\"zi\":\"miercuri\",\"color\":\"yellow\",\"nume\":\"IT IS WEDNESDAY MY DUDES\",\"start\":14,\"durata\":2,\"tip\":\"laborator\",\"optional\":true}]";
	}

	@GetMapping(value = "/api/student/ore", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getOre(@PathVariable("disciplina") String disciplina) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();


		for (Ora o : oraService.getOre(user)) {
			JSONObject medie_json = new JSONObject();

			medie_json.put("zi", o.getZi());
			medie_json.put("color", o.getColor());
			medie_json.put("nume", o.getDisciplina().getNume());
			medie_json.put("start", o.getOraStart());
			medie_json.put("durata", o.getOraEnd() - o.getOraStart());
			medie_json.put("tip", o.getTipOra());
			medie_json.put("tipDisciplina", o.getDisciplina().getTipDisciplina());

			wrapper.put(medie_json);
		}


		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/facultati", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getListaFacultati() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();


		for (Facultate f: facultateService.getListaFacultati(user)) {
			JSONObject facultate_json = new JSONObject();

			facultate_json.put("facultate", f.getNume());

			wrapper.put(facultate_json);
		}


		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/specializari/{facultate}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getSpecializariByFacultate(@PathVariable("facultate") String facultate) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();


		for (Specializare s: facultateService.getSpecializariByFacultate(user, facultate)) {
			JSONObject facultate_json = new JSONObject();

			facultate_json.put("specializare", s.getNume());

			wrapper.put(facultate_json);
		}


		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/materii/{semestru}{specializare}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getMateriiBySpecializareAndSemestru(@PathVariable("specializare") String specializare, @PathVariable("semestru") String semestru) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();


		for (Disciplina d: disciplinaService.getDisciplineBySpecializareAndSemestru(user, specializare, semestru)) {
			JSONObject disciplina_json = new JSONObject();

			disciplina_json.put("","");

			wrapper.put(disciplina_json);
		}


		return wrapper.toString();
	}

	@GetMapping(value = "/api/student/optionale/{pachet}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getOptionaleByPachet(@PathVariable("pachet") String pachet) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();


		for (Disciplina d: disciplinaService.getOptionalByPachet(user, pachet)) {
			JSONObject disciplina_json = new JSONObject();

			disciplina_json.put("","");

			wrapper.put(disciplina_json);
		}


		return wrapper.toString();
	}

	//PROFESOR

	@GetMapping(value = "/api/profesor/grupe/{materie}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getGrupeByMaterie(@PathVariable("materie") String materie) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.getByUsername(auth.getName());

		JSONArray wrapper = new JSONArray();


		for (Grupa g: grupaService.getGrupeByMaterie(user, materie)) {
			JSONObject grupa_json = new JSONObject();

			grupa_json.put("grupa", g.getNume());

			wrapper.put(grupa_json);
		}


		return wrapper.toString();
	}

    @GetMapping(value = "/api/profesor/medii/{materie}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getMediiByMaterie(@PathVariable("materie") String materie) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getByUsername(auth.getName());

        JSONArray wrapper = new JSONArray();


        for (Medie m: notaService.getMediiByMaterie(user, materie)) {
            JSONObject medie_json = new JSONObject();

            medie_json.put("year", m.getAn_universitar() + "/" + ((m.getAn_universitar() + 1)));
            medie_json.put("semester", m.getSmestru());
            medie_json.put("code", m.getDisciplina().getCodDisciplina());
            medie_json.put("name", m.getDisciplina().getNume());
            medie_json.put("grade", m.getNota());
            medie_json.put("credits", m.getDisciplina().getCredite());
            medie_json.put("date", m.getData_promovarii());

            wrapper.put(medie_json);
        }


        return wrapper.toString();
    }

    @GetMapping(value = "/api/profesor/medii/{materie}/{grupa}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getMediiByMaterieAndGrupa(@PathVariable("materie") String materie, @PathVariable("materie") String grupa) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getByUsername(auth.getName());

        JSONArray wrapper = new JSONArray();


        for (Medie m: notaService.getMediiByMaterieAndGrupa(user, materie, grupa)) {
            JSONObject medie_json = new JSONObject();

            medie_json.put("year", m.getAn_universitar() + "/" + ((m.getAn_universitar() + 1)));
            medie_json.put("semester", m.getSmestru());
            medie_json.put("code", m.getDisciplina().getCodDisciplina());
            medie_json.put("name", m.getDisciplina().getNume());
            medie_json.put("grade", m.getNota());
            medie_json.put("credits", m.getDisciplina().getCredite());
            medie_json.put("date", m.getData_promovarii());

            wrapper.put(medie_json);
        }


        return wrapper.toString();
    }

    @GetMapping(value = "/api/profesor/note/{student}/{materie}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getNoteByStudentAndMaterie(@PathVariable("student") String student, @PathVariable("disciplina") String disciplina) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getByUsername(auth.getName());

        JSONArray wrapper = new JSONArray();

        for (Nota nota : notaService.getNoteByStudentAndMaterie(user, student, disciplina)) {
            JSONObject nota_object = new JSONObject();
            nota_object.put("materie", nota.getOra().getDisciplina());
            nota_object.put("data", nota.getData().toString());
            nota_object.put("nota", nota.getNota());
            nota_object.put("tip", nota.getOra().getTipOra().toString());
            nota_object.put("observatii", nota.getNotita());

            wrapper.put(nota_object);
        }

        return wrapper.toString();
    }

    @GetMapping(value = "/api/profesor/prezente/{disciplina}/{tip}" , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getPrezenteByMaterieAndTip(@PathVariable("disciplina") String disciplina, @PathVariable("tip") String tip) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getByUsername(auth.getName());

        JSONObject wrapper = new JSONObject();

        ArrayList<ArrayList<Boolean>> prezenteByMaterie = prezentaService.getPrezenteByMaterie(user, disciplina);

        for (int i = 0; i < 3; i++) {
            ArrayList<Boolean> lista_prezente = prezenteByMaterie.get(i);
            ArrayList<String> prezente = new ArrayList<>();
            for (Boolean p : lista_prezente) {
                if (p) {
                    prezente.add("x");
                } else {
                    prezente.add("");
                }
            }


            wrapper.put(TipOra.values()[i].toString(), prezente);
        }

        return wrapper.toString();
    }

    @GetMapping(value = "/api/profesor/note/{disciplina}/{tip}/{grupa}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getNoteByMaterieAndTip(@PathVariable("disciplina") String disciplina, @PathVariable("tip") String tip, @PathVariable("grupa") String grupa) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getByUsername(auth.getName());

        JSONArray wrapper = new JSONArray();

        for (Nota nota : notaService.getNoteByMaterieAndTipAndGrupa(user, disciplina, tip, grupa)) {
            JSONObject nota_object = new JSONObject();
            nota_object.put("materie", nota.getOra().getDisciplina());
            nota_object.put("student", nota.getStudent().getNume());
            nota_object.put("data", nota.getData().toString());
            nota_object.put("nota", nota.getNota());
            nota_object.put("tip", nota.getOra().getTipOra().toString());
            nota_object.put("observatii", nota.getNotita());

            wrapper.put(nota_object);
        }

        return wrapper.toString();
    }

}