package app.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	DataSource dataSource;
	
	@Autowired
	private TotpWebAuthenticationDetailsSource totpWebAuthenticationDetailsSource;

	@Autowired
	private AuthenticationSuccessHandler authenticationSuccessHandler;
	
	@Autowired
	private TotpUserDetailsService userDetailsService;
	
	@Override
   protected void configure(HttpSecurity http) throws Exception {
      http
      	.authorizeRequests()
      		
      		.antMatchers("/customer/**").hasAnyAuthority("customer", "administrator")
      		
         	.antMatchers("/home").hasAuthority("administrator")
         	.antMatchers("/users/**").hasAuthority("administrator")
         	.antMatchers("/accounts/**").hasAuthority("administrator")
         	.antMatchers("/payments/**").hasAuthority("administrator")
         	.antMatchers("/balances/**").hasAuthority("administrator")
         	
         	
         	.anyRequest().authenticated()
         	
            .and()
        .formLogin()
        	.permitAll()
        	.loginPage("/login")
            .authenticationDetailsSource(this.totpWebAuthenticationDetailsSource)
            .successHandler(authenticationSuccessHandler)
            .and()
      	.logout()
      		.permitAll()
      		.logoutUrl("/appLogout")
      		.logoutSuccessUrl("/login")
      		.deleteCookies("JSESSIONID");
//      		.and()
//      	.headers()
//      		.contentSecurityPolicy("script-src 'self'")
      
   }
   	
	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		
	  auth.jdbcAuthentication()
	  	.passwordEncoder(new BCryptPasswordEncoder())
	  	.dataSource(dataSource)
		.usersByUsernameQuery(
			"select username,password, 1 as enabled from users where username=? and deleted=false")
		.authoritiesByUsernameQuery(
			"select username, profile as authority from users where username=? and deleted=false");
	}
	
	@Override
	  public void configure(AuthenticationManagerBuilder builder)
	          throws Exception {
	      builder.authenticationProvider(new TotpAuthenticationProvider(userDetailsService));
	  }
	
	
}