package com.pay.calculatorweb.repository;

import com.pay.calculatorweb.domain.entity.Calculation;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CalculationRepository extends CrudRepository<Calculation, Integer> {
    List<Calculation> findByEmail(String email);

    void deleteByIdIn(List<Integer> ids);
}
