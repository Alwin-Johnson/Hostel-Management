package com.service;

import com.entity.Fees;
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
    public Fees createMonthlyFee(Integer studentId, Double amount) {
        Fees fees = new Fees();
        fees.setStudent(studentId);
        fees.setAmount(amount);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String today = LocalDate.now().format(formatter);
        fees.setDueDate(today);

        fees.setPaidDate(null);
        fees.setStatus("PENDING");

        return feesRepository.save(fees);
    }
}
