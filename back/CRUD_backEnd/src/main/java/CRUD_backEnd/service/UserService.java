package CRUD_backEnd.service;

import java.util.List;

import CRUD_backEnd.entities.User;

public interface UserService {
//crud basic
	public List<User> getAllUser();
	public User findUserById(Long id);
	public User createUtilisateur(User user);
	public User updateUser (User user);
	public void deleteUser(Long id);

}
