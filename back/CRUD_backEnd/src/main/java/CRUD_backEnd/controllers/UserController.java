package CRUD_backEnd.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CRUD_backEnd.entities.User;
import CRUD_backEnd.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	
	@GetMapping()
	 
	 @CrossOrigin
	public List<User> getAllUtilisateur() {
		return userService.getAllUser();
	}
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<User>  findUserById(@PathVariable Long id) {
		User user = userService.findUserById(id);
		if (user==null) {
			return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		}else {
			return new ResponseEntity<User>(user,HttpStatus.OK);
		}
		
	}
	@PostMapping
	public User CreateUser(@RequestBody User user) {
		return userService.createUtilisateur(user);
	}
	
	@DeleteMapping(path = "/{id}")
	public void deleteAllUser(@PathVariable Long id) {
		 userService.deleteUser(id);
		 System.out.println("utilisateur was deleted");
	}
	@PutMapping
	public User updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}
}
