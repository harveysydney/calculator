package com.pay.calculatorweb.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "CALCULATION")
@Getter
@Setter
@AllArgsConstructor
@Builder
public class Calculation {

    public Calculation() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private int id;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "INCOME")
    private double income;

    @Column(name = "TAX_YEAR")
    private String taxYear;

    @Column(name = "SUPER_PERCENT")
    private double superPercent;

    @Column(name = "GROSS")
    private double gross;

    @Column(name = "GROSSNSUPER")
    private double grossNSuper;

    @Column(name = "SUPERANNUATION")
    private double superannuation;

    @Column(name = "TAX_AMOUNT")
    private double taxAmount;

    @Column(name = "NET_AMOUNT")
    private double netAmount;

    @Column(name = "NETNSUPER")
    private double netNSuper;

    @Column(name = "INCLUDE_SUPER")
    private boolean includeSuper;
}
