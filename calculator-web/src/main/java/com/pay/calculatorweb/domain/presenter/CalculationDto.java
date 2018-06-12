package com.pay.calculatorweb.domain.presenter;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CalculationDto {
    private int id;

    private String email;

    private double income;

    private String taxYear;

    private double superPercent;

    private double gross;

    private double grossNSuper;

    private double superannuation;

    private double taxAmount;

    private double netAmount;

    private double netNSuper;

    private boolean includeSuper;
}
