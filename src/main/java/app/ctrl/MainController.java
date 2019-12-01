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
package app.ctrl;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Controller
public class MainController {

	@RequestMapping(value = "/login")
	public String index() {
		return "index";
	}

	@GetMapping(value = "/api/login/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String home(@PathVariable("username") String username) {
		return "{\"data\" : \"" + username + "\"}";
	}


	@GetMapping(value = "/api/test" , produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String test(){
		return "{\"data\" : \"test\"}";
	}







	// MARK: Prezente api

//	@GetMapping(value = "/api/prezenta" , produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public String getPrezente(){
//		return "{\"data\" : \"test\"}";
//	}

	// ENDMARK:

}
// end::code[]