package com.pay.calculatorweb.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaxTier {

    private double from;
    private double to;
    private double baseTax;
    private double taxPerDollar;
}