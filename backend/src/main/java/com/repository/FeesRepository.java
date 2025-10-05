package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.entity.Fees;


@Repository
public interface FeesRepository extends JpaRepository<Fees, Integer> {

    @Modifying
    @Query(value = """
        INSERT INTO Fees (student_id, amount, due_date, paid_date, status, payment_mode) 
        VALUES (?1, ?2, ?3, ?4, ?5, ?6)
        """, nativeQuery = true)
    int insertFees(Integer studentId, Double amount, String dueDate, String paidDate, String status, String paymentMode);

    @Query(value = "SELECT * FROM Fees WHERE student_id = ?1", nativeQuery = true)
    Fees findByStudentId(Integer studentId);

    @Modifying
    @Query(value = """
        UPDATE Fees 
        SET amount = ?2, due_date = ?3, paid_date = ?4, status = ?5, payment_mode = ?6 
        WHERE student_id = ?1
        """, nativeQuery = true)
    int updateFees(Integer studentId, Double amount, String dueDate, String paidDate, String status, String paymentMode);

    @Query(value = "SELECT SUM(amount) FROM Fees WHERE status = 'PENDING'", nativeQuery = true)
    double pendingFees();

    @Query(value = "SELECT SUM(amount) FROM Fees WHERE status = 'PAID'", nativeQuery = true)
    Long paidFees();

    @Query(value = "SELECT SUM(amount) FROM Fees", nativeQuery = true)
    Long totalFees();

    @Query(value = "SELECT COUNT(*) FROM Fees WHERE status = 'PENDING'", nativeQuery = true)
    Long countPendingFees();
    
    @Modifying
    @Query(value = "DELETE FROM Fees WHERE student_id = ?1", nativeQuery = true)
    int deleteByStudentId(Integer studentId);
    
}