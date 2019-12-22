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

import java.util.Date;


import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ubb.ni.PostAcademic.domain.Nota;
import ubb.ni.PostAcademic.domain.Prezenta;
import ubb.ni.PostAcademic.service.NotaService;
import ubb.ni.PostAcademic.service.PrezentaService;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@RestController
public class MainController {
	@Autowired
	NotaService notaService;
	@Autowired
	PrezentaService prezentaService;

	@GetMapping(value = "/api/login/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String home(@PathVariable("username") String username) {
		return "{\"data\" : \"" + username + "\"}";
	}

    @GetMapping(value = "/api/hello")
    public String hello() {
        return "Hello, the time at the server is now " + new Date() + "\n";
    }

    @GetMapping(value = "/api/authority")
	@ResponseBody
	public String auth() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth instanceof AnonymousAuthenticationToken){
			return "anon";
		}
		return auth.getAuthorities().toArray()[0].toString();
	}

	@GetMapping(value = "/api/student/note", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String note_student(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		JSONArray json = new JSONArray();

		for(Nota nota: notaService.getNote()){
			JSONObject nota_object = new JSONObject();
			nota_object.put("materie", nota.getOra().getDisciplina());
			nota_object.put("data", nota.getData().toString());
			nota_object.put("nota", nota.getNota());
			nota_object.put("tip", nota.getOra().getTipul());
			nota_object.put("notita", nota.getNotita());

			json.put(nota_object);
		}

		return json.toString();
	}

	@GetMapping(value = "/api/student/prezente", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String prezente_student(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		JSONArray json = new JSONArray();

		for(Prezenta prezenta: prezentaService.getPrezente()){
			JSONObject nota_object = new JSONObject();



			json.put(nota_object);
		}

		return json.toString();
	}

}
// end::code[]