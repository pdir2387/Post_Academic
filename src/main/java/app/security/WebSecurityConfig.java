package app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.sql.DataSource;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	DataSource dataSource;


	@Override
	protected void configure(HttpSecurity http) throws Exception {
      http
      	.authorizeRequests()
			  .antMatchers(HttpMethod.GET, "/built/**", "/css/**").permitAll()
         	.anyRequest().permitAll()
            .and()
        .formLogin()
        	.permitAll()
			  .loginPage("/login")
			  .loginProcessingUrl("/login")
			  .and()
      	.logout()
				.permitAll()
				.logoutUrl("/logout")
				.logoutSuccessUrl("/login")
				.deleteCookies("JSESSIONID");

   }

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {

	  auth.jdbcAuthentication()
	  	.passwordEncoder(new BCryptPasswordEncoder())
	  	.dataSource(dataSource)
		.usersByUsernameQuery(
			"select username, password, 1 as enabled from users where username=?")
		.authoritiesByUsernameQuery(
			"select username, account_type as authority from users where username=?");
	}


}