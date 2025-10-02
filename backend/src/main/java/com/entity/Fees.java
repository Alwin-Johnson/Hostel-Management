package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Fees")
public class Fees {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fee_id")
    private Integer feeId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "due_date", nullable = false)
    private String dueDate;

    @Column(name = "paid_date", nullable = true)
    private String paidDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20, columnDefinition = "VARCHAR(20) CHECK (status IN ('PAID', 'PENDING'))")
    private String status;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode", nullable = true)
    private String paymentMode;

    public enum Status { PAID, PENDING }
    public enum PaymentMode { CASH, ONLINE }

    public Fees() {}
    
    public Fees(Student student, Double amount, String dueDate, String paidDate, String status, String paymentMode) {
        this.student = student;
        this.amount = amount;
        this.dueDate = dueDate;
        this.paidDate = paidDate;
        this.status = status;
        this.paymentMode = paymentMode;
    }

    public Integer getFeeId() {
        return feeId;
    } 

    public void setFeeId(Integer feeId) {
        this.feeId = feeId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(String paidDate) {
        this.paidDate = paidDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }
}