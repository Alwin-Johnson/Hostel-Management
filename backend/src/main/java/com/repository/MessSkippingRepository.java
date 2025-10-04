package com.repository;

import com.entity.MessSkipping;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


@Repository
public interface MessSkippingRepository extends JpaRepository<MessSkipping, Long> {
    
    @Modifying
    @Query(value = """
        INSERT INTO MessSkipping (skip_id, student_id, date, meal_type, skipped) 
        VALUES (?1, ?2, ?3, ?4, ?5) 
        """, nativeQuery = true)
    int insertSkipRecord(Integer skipId, Integer studentId, String date, String mealType, Boolean skipped);

    @Modifying
    @Query(value = """ 
        UPDATE MessSkipping 
        SET student_id = ?2, date = ?3, meal_type = ?4, skipped = ?5
        WHERE skip_id = ?1 
        """, nativeQuery = true)
    int updateSkipRecord(Integer skipId, Integer studentId, String date, String mealType, Boolean skipped);

    @Query(value = "SELECT * FROM MessSkipping WHERE student_id = ?1 AND date = ?2 AND meal_type = ?3", nativeQuery = true)
    MessSkipping findByStudentDateMeal(Integer studentId, String date, String mealType);

    @Query(value = "SELECT * FROM MessSkipping WHERE student_id = ?1", nativeQuery = true)
    List<MessSkipping> findByStudentId(Integer studentId);

    @Query(value = "SELECT * FROM MessSkipping", nativeQuery = true)
    List<MessSkipping> findAllSkipRecords();
    
}
