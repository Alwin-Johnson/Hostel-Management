package com.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.entity.Student;




@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    
    // ===== INSERT OPERATIONS =====
    @Modifying
    @Query(value = """
        INSERT INTO Student (college_id, name, gender, dob, admission_date, course, 
                           stream, year, email, contact_no, address, guardian_name, 
                           guardian_contact, parent_name, parent_contact, room_id, 
                           admission_fee, password, created_at) 
        VALUES (?1  , ?2, ?3, ?4, ?5, ?6, ?7, ?8    , ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19)
        """, nativeQuery = true)
    int insertStudent(String collegeId, String name, String gender, LocalDate dob, 
                     LocalDate admissionDate, String course, String stream, String year,
                     String email, String contactNo, String address, String guardianName,
                     String guardianContact, String parentName, String parentContact,
                     Integer roomId, Boolean admissionFee, String password, LocalDateTime createdAt);
    
    // ===== SELECT OPERATIONS =====
    @Query(value = "SELECT * FROM Student WHERE email = ?1", nativeQuery = true)
    Optional<Student> findByEmail(String email);
    
    
    @Query(value = "SELECT * FROM Student WHERE student_id = ?1", nativeQuery = true)
    Optional<Student> findById(Integer studentId);
    
    @Query(value = "SELECT * FROM Student", nativeQuery = true)
    List<Student> findAllStudents();
    
    @Query(value = "SELECT COUNT(*) FROM Student", nativeQuery = true)
    Long countAllStudents();
    
    @Query(value = "SELECT COUNT(*) > 0 FROM Student WHERE email = ?1", nativeQuery = true)
    boolean existsByEmail(String email);
    
    @Query(value = "SELECT COUNT(*) > 0 FROM Student WHERE college_id = ?1", nativeQuery = true)
    boolean existsByCollegeId(String collegeId);
    
    @Query(value = "SELECT * FROM Student WHERE room_id IS NULL", nativeQuery = true)
    List<Student> findStudentsWithoutRooms();
    
    @Query(value = "SELECT * FROM Student WHERE room_id = ?1", nativeQuery = true)
    List<Student> findStudentsByRoom(Integer roomId);
    
    @Query(value = "SELECT * FROM Student WHERE admission_fee = true", nativeQuery = true)
    List<Student> findPaidStudents();
    
    @Query(value = "SELECT * FROM Student WHERE admission_fee = false", nativeQuery = true)
    List<Student> findUnpaidStudents();
    
    @Query(value = "SELECT * FROM Student WHERE course = ?1", nativeQuery = true)
    List<Student> findStudentsByCourse(String course);
    
    @Query(value = "SELECT * FROM Student WHERE stream = ?1", nativeQuery = true)
    List<Student> findStudentsByStream(String stream);
    
    @Query(value = "SELECT * FROM Student WHERE year = ?1", nativeQuery = true)
    List<Student> findStudentsByYear(String year);
    
    // ===== UPDATE OPERATIONS =====
    @Modifying
    @Query(value = "UPDATE Student SET admission_fee = ?1 WHERE student_id = ?2", nativeQuery = true)
    int updateAdmissionFee(Boolean admissionFee, Integer studentId);
    
    @Modifying
    @Query(value = "UPDATE Student SET room_id = ?1 WHERE student_id = ?2", nativeQuery = true)
    int assignRoom(Integer roomId, Integer studentId);
    
    @Modifying
    @Query(value = "UPDATE Student SET room_id = NULL WHERE student_id = ?1", nativeQuery = true)
    int removeFromRoom(Integer studentId);
    
    @Modifying
    @Query(value = "UPDATE Student SET password = ?1 WHERE student_id = ?2", nativeQuery = true)
    int changePassword(String newPassword, Integer studentId);
    
    @Modifying
    @Query(value = "UPDATE Student SET contact_no = ?1 WHERE student_id = ?2", nativeQuery = true)
    int updateContactNumber(String contactNo, Integer studentId);
    
    @Modifying
    @Query(value = "UPDATE Student SET address = ?1 WHERE student_id = ?2", nativeQuery = true)
    int updateAddress(String address, Integer studentId);
    
    @Modifying
    @Query(value = "UPDATE Student SET parent_name = ?1, parent_contact = ?2 WHERE student_id = ?3", nativeQuery = true)
    int updateParentInfo(String parentName, String parentContact, Integer studentId);
    
    // ===== DELETE OPERATIONS =====
    @Modifying
    @Query(value = "DELETE FROM Student WHERE student_id = ?1", nativeQuery = true)
    int deleteStudentById(Integer studentId);
    
    @Modifying
    @Query(value = "DELETE FROM Student WHERE email = ?1", nativeQuery = true)
    int deleteStudentByEmail(String email);
    
    @Modifying
    @Query(value = "DELETE FROM Student WHERE college_id = ?1", nativeQuery = true)
    int deleteStudentByCollegeId(String collegeId);
    
    @Modifying
    @Query(value = "DELETE FROM Student WHERE room_id = ?1", nativeQuery = true)
    int deleteStudentsByRoom(Integer roomId);
    
    @Modifying
    @Query(value = "DELETE FROM Student WHERE admission_fee = false AND created_at < ?1", nativeQuery = true)
    int deleteUnpaidOldStudents(LocalDateTime cutoffDate);
    
    @Modifying
    @Query(value = "DELETE FROM Student", nativeQuery = true)
    int deleteAllStudents();
    
    // ===== COMPLEX QUERIES =====
    @Query(value = """
        SELECT s.*, r.room_number, r.capacity 
        FROM Student s 
        LEFT JOIN Rooms r ON s.room_id = r.room_id 
        WHERE s.stream = ?1
        """, nativeQuery = true)
    List<Object[]> findStudentsWithRoomDetails(String stream);
    
    @Query(value = """
        SELECT course, stream, COUNT(*) as student_count 
        FROM Student 
        GROUP BY course, stream 
        ORDER BY course, stream
        """, nativeQuery = true)
    List<Object[]> getStudentCountBycourseAndStream();
    
    @Query(value = """
        SELECT * FROM Student 
        WHERE course = ?1 
        AND admission_fee = true 
        AND room_id IS NULL 
        ORDER BY created_at
        """, nativeQuery = true)
    List<Student> findEligibleStudentsForRoomAllocation(String course);
}