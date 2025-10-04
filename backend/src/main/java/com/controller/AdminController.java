

    
package com.controller;

import com.entity.Student;
import com.service.StudentService;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class AdminController {
    
    private final StudentService studentService;
    
    public AdminController(StudentService studentService) {
        this.studentService = studentService;
    }
    
    @PostMapping("/register")
public ResponseEntity<?> registerStudent(@RequestBody Map<String, String> params) {
    
    System.out.println("Received parameters: " + params);
    
    try {
        String collegeId = params.get("collegeId");
        String name = params.get("name");
        String gender = params.get("gender");
        String course = params.get("course");
        String stream = params.get("stream");
        String year = params.get("year");
        String email = params.get("email");
        String contactNo = params.get("contactNo");
        String guardianName = params.get("guardianName");
        String guardianContact = params.get("guardianContact");
        
        System.out.println("Calling studentService.registerStudent with parameters:");
        System.out.println("Email: " + email);
        
        if (studentService.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        
        Student student = studentService.registerStudent(
            collegeId, name, gender, null, course, stream, year,
            email, contactNo, null, guardianName, guardianContact, null, null
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(student);
            
    } catch (Exception e) {
        System.out.println("Full exception:");
        e.printStackTrace();
        return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
    }
}

    // ===== LOGIN ENDPOINT (GET) =====
    @GetMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestParam String email, 
                                        @RequestParam String password) {
        try {
            Student student = studentService.login(email, password);
            return ResponseEntity.ok(student);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }
}


