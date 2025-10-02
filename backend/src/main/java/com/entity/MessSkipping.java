package com.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="MessSkipping")
public class MessSkipping {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="skip_id")
    private Integer skipId;

    @Column(name="student_id", nullable=false)
    private Integer studentId;

    @Column(name="date", nullable=false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name="meal_type", nullable=false, length=10)
    private MealType mealType;

    @Column(name="skipped", nullable=false)
    private Boolean skipped;

    public enum MealType { BREAKFAST, LUNCH, DINNER }

    public MessSkipping() {}

    public MessSkipping(Integer studentId, LocalDate date, MealType mealType, Boolean skipped) {
        this.studentId = studentId;
        this.date = date;
        this.mealType = mealType;
        this.skipped = skipped;
    }

    public Integer getSkipId() {
        return skipId;
    }

    public void setSkipId(Integer skipId) {
        this.skipId = skipId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public MealType getMealType() {
        return mealType;
    }

    public void setMealType(MealType mealType) {
        this.mealType = mealType;
    }

    public Boolean getSkipped() {
        return skipped;
    }

    public void setSkipped(Boolean skipped) {
        this.skipped = skipped;
    }
}
