package ubb.ni.PostAcademic.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@Import({ WebSecurityConfig.class })
public class AppConfig  {

	@Bean(name = "dataSource")
	public DriverManagerDataSource dataSource() {
	    DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
	    driverManagerDataSource.setDriverClassName("org.postgresql.Driver");
	    driverManagerDataSource.setUrl("jdbc:postgresql://localhost:5432/postacademic");
	    driverManagerDataSource.setUsername("postgres");
	    driverManagerDataSource.setPassword("123");
	    return driverManagerDataSource;
	}
	
//	@Bean
//	public InternalResourceViewResolver viewResolver() {
//	    InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
//	    viewResolver.setViewClass(JstlView.class);
//	    viewResolver.setPrefix("/WEB-INF/jsp/");
//	    viewResolver.setSuffix(".jsp");
//	    return viewResolver;
//	}
	
}