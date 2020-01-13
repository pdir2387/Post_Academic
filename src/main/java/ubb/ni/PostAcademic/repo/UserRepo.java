package ubb.ni.PostAcademic.repo;

import ubb.ni.PostAcademic.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Long> {

    User findUserByUsernameAndPassword(String username, String password);
}
