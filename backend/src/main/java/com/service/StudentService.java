package com.service;

import com.entity.Student;
import com.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class StudentService {
    
    private final StudentRepository studentRepository;
    
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    
    // ===== REGISTRATION METHOD =====
    public Student registerStudent(String collegeId, String name, String gender, 
                                 String course, String stream, String year,
                                 String email, String contactNo, String guardianName,
                                 String guardianContact) {
        
        // Default values
        String password = "defaultPassword";
        LocalDate admissionDate = LocalDate.now();
        LocalDateTime createdAt = LocalDateTime.now();
        Boolean admissionFee = false;
        
        // Insert student
        int result = studentRepository.insertStudent(
            collegeId, name, gender, null, admissionDate, course, stream, year,
            email, contactNo, null, guardianName, guardianContact, 
            null, null, null, admissionFee, password, createdAt
        );
        
        if (result <= 0) {
            throw new RuntimeException("Failed to register student");
        }
        
        return studentRepository.findByEmail(email).orElse(null);
    }
    
    // ===== LOGIN METHOD =====
    public Student login(String email, String password) {
        Student student = studentRepository.findByEmail(email).orElse(null);
            
        if (student == null) {
            throw new IllegalArgumentException("Invalid email");
        }
        
        if (!password.equals(student.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        
        return student;
    }

    // ===== UTILITY METHODS =====
    public Student findByEmail(String email) {
        return studentRepository.findByEmail(email).orElse(null);
    }

    public Student findById(Integer studentId) {
        return studentRepository.findById(studentId).orElse(null);
    }

    public void changePassword(Integer studentId, String newPassword) {
        int updated = studentRepository.changePassword(newPassword, studentId);
        if (updated <= 0) {
            throw new RuntimeException("Failed to change password");
        }
    }

    public List<Student> findAllStudents() {
        return studentRepository.findAllStudents();
    }

    public Long countAllStudents() {
        return studentRepository.countAllStudents();
    }

    public boolean existsByEmail(String email) {
        return studentRepository.existsByEmail(email);
    }
    
    public List<Student> findStudentsByRoom(Integer roomId) {
        return studentRepository.findStudentsByRoom(roomId);
    }
    
    int updateAdmissionFee(Boolean admissionFee, Integer studentId) {
        int updated = studentRepository.updateAdmissionFee(admissionFee, studentId);
        if (updated <= 0) {
            throw new RuntimeException("Failed to update admission fee status");
        }
        return updated;
    }
    public int assignRoom(Integer roomId, Integer studentId) {
        int updated = studentRepository.assignRoom(roomId, studentId);
        if (updated <= 0) {
            throw new RuntimeException("Failed to assign room");
        }
        return updated;
    }
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}


