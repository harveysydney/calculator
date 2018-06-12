package com.pay.calculatorweb.domain.presenter;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CalculateResult {
    private double superAnnuation;
    private double gross;
    private double grossNSuper;
    private double taxAmount;
    private double netAmount;
    private double netNSuper;
}
