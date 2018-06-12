package com.pay.calculatorweb.domain.presenter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalculateParam {
    private double income;
    private boolean includeSuper;
    private String taxYear;
    private double superAnnuation;
    private String email;
}
