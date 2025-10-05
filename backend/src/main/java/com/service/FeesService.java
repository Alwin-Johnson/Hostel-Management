package com.service;

import com.entity.Fees;
import com.entity.Student;
import com.repository.FeesRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@Transactional
public class FeesService {

    private final FeesRepository feesRepository;

    public FeesService(FeesRepository feesRepository) {
        this.feesRepository = feesRepository;
    }

    // ===== CREATE MONTHLY FEE RECORD =====
   /* public Fees createMonthlyFee(Student student, Double amount) {
        Fees fees = new Fees();
        fees.setStudent(student);
        fees.setAmount(amount);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String today = LocalDate.now().format(formatter);
        fees.setDueDate(today);

        fees.setPaidDate(null);
        fees.setStatus("PENDING");

        return feesRepository.save(fees);
    }*/

    public Double getCollectionPercent() {
    try {
        Double paid = feesRepository.paidFees();
        Double total = feesRepository.totalFees();

        // Handle null or zero values
        if (paid == null || total == null || total == 0) {
            return 0.0;
        }

        double percent = (paid / total) * 100;
        return Math.round(percent * 100.0) / 100.0; // round to 2 decimal places

        } catch (Exception e) {
            // Log the exception and return 0 to keep the app stable
            System.err.println("Error calculating collection percent: " + e.getMessage());
            return 0.0;
        }
    }

}
