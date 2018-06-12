package com.pay.calculatorweb.controller;

import com.pay.calculatorweb.domain.presenter.CalculateParam;
import com.pay.calculatorweb.domain.presenter.CalculateResult;
import com.pay.calculatorweb.domain.presenter.CalculationDto;
import com.pay.calculatorweb.service.CalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Transactional
@RequestMapping("/calculate")
public class CalculationController {

    private final CalculationService calculationService;

    @PostMapping(value="/tax", produces = "application/json")
    public List<CalculateResult> calculate(@RequestBody CalculateParam param) {
        List<CalculateResult> result = new ArrayList<>();
        result.add(calculationService.calculate(param));
        return result;
    }

    @PostMapping(value="/deletehistory", produces = "application/json")
    public List<CalculationDto> calculate(@RequestBody List<Integer> ids) {
        return calculationService.deleteHistory(ids);
    }

    @GetMapping(value="/history", produces = "application/json")
    public List<CalculationDto> getHistory(@RequestParam String email) {
        return calculationService.getHistory(email);
    }


}