package CRUD_backEnd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import CRUD_backEnd.entities.User;
import CRUD_backEnd.repositories.UserRepository;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired 
	private UserRepository userRepository;
	
	
	@Override
	public List<User> getAllUser() {
		 return userRepository.findAll();
	}

	
	@Override
	public User findUserById(Long id) {
		 Optional<User> utOptional = userRepository.findById(id);
		if (utOptional.isEmpty()) {
			System.out.println("this user is not exist");
			return null;
		}else {
			return utOptional.get();
		}
				
	}
	
	@Override
	public User createUtilisateur(User user) {
		return userRepository.save(user);
	}
	
	@Override
	public User updateUser (User user) {
		Optional<User> utOptional = userRepository.findById(user.getId());
		 if (utOptional.isEmpty()) {
			 System.out.println("this user is not exist");
				return null;
			}else {
				System.out.println("utilisateur was updated");
				return userRepository.save(user);
			}
		
	}
	
	@Override
	public void deleteUser(Long id) {
		System.out.println("utilisateur was deleted");
		userRepository.deleteById(id);
	}

}
