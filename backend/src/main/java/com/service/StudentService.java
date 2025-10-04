package com.service;

import com.entity.Student;
import com.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
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
    
    // ===== REGISTRATION METHOD (FIXED) =====
   // ===== REGISTRATION METHOD (FIXED) =====
public Student registerStudent(String collegeId, String name, String gender, Date dob,
                             String course, String stream, String year,
                             String email, String contactNo, String address, String guardianName,
                             String guardianContact, String parentName, String parentContact) {
    
    try {
        // Convert String parameters to Enum types
        Student.Gender genderEnum = Student.Gender.valueOf(gender);
        Student.Course courseEnum = Student.Course.valueOf(course);
        Student.Stream streamEnum = Student.Stream.valueOf(stream);
        Student.Year yearEnum = Student.Year.valueOf(year);
        
        // Create student entity with proper enum types
        Student student = new Student();
        student.setCollegeId(collegeId);
        student.setName(name);
        student.setGender(genderEnum);
        student.setCourse(courseEnum);
        student.setStream(streamEnum);
        student.setYear(yearEnum);
        student.setEmail(email);
        student.setContactNo(contactNo);
        student.setAddress(address);
        student.setGuardianName(guardianName);
        student.setGuardianContact(guardianContact);
        student.setParentName(parentName);
        student.setParentContact(parentContact);
        
        // Set defaults
        student.setPassword("defaultPassword");
        student.setAdmissionDate(LocalDate.now());
        student.setCreatedAt(LocalDateTime.now());
        student.setAdmissionFee(false);
        
        // Use standard JPA save (avoids the casting issue)
        return studentRepository.save(student);
        
    } catch (IllegalArgumentException e) {
        throw new RuntimeException("Invalid enum value: " + e.getMessage());
    } catch (Exception e) {
        throw new RuntimeException("Failed to register student: " + e.getMessage());
    }
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
    
    public int updateAdmissionFee(Boolean admissionFee, Integer studentId) {
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


