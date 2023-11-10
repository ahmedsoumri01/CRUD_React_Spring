package CRUD_backEnd.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CRUD_backEnd.entities.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {

}
