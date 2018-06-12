package com.pay.calculatorweb.service;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.pay.calculatorweb.domain.entity.Calculation;
import com.pay.calculatorweb.domain.entity.TaxRate;
import com.pay.calculatorweb.domain.entity.TaxTier;
import com.pay.calculatorweb.domain.presenter.CalculateParam;
import com.pay.calculatorweb.domain.presenter.CalculateResult;
import com.pay.calculatorweb.domain.presenter.CalculationDto;
import com.pay.calculatorweb.repository.CalculationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;

@Service
@RequiredArgsConstructor
public class CalculationService {

    private final RestTemplate restTemplate;
    private final CalculationRepository calculationRepository;
    private final ModelMapper modelMapper;

    private static double scale = Math.pow(10, 2);

    public CalculateResult calculate(CalculateParam param) {
        double gross;
        double grossNSuper;
        double netAmount;
        double netNSuper;
        double superAnnuation;
        double taxAmount;

        if (param.isIncludeSuper()) {
            gross = Math.round((param.getIncome() / (100 + param.getSuperAnnuation())) * 100 * scale) / scale;
            superAnnuation = BigDecimal.valueOf(param.getIncome()).subtract(BigDecimal.valueOf(gross)).doubleValue();
            taxAmount = calculateTax(gross, param.getTaxYear());
            netAmount = BigDecimal.valueOf(gross).subtract(BigDecimal.valueOf(taxAmount)).doubleValue();
            grossNSuper = param.getIncome();
            netNSuper = netAmount + superAnnuation;
        } else {
            gross = param.getIncome();
            superAnnuation = Math.round(gross * param.getSuperAnnuation() / 100 * scale) / scale;
            taxAmount = calculateTax(gross, param.getTaxYear());
            netAmount = BigDecimal.valueOf(gross).subtract(BigDecimal.valueOf(taxAmount)).doubleValue();
            grossNSuper = gross + superAnnuation;
            netNSuper = netAmount + superAnnuation;
        }

        if (!StringUtils.isEmpty(param.getEmail())) {
            Calculation calculation = Calculation.builder()
                    .email(param.getEmail())
                    .income(param.getIncome())
                    .taxYear(param.getTaxYear())
                    .superPercent(param.getSuperAnnuation())
                    .gross(gross)
                    .grossNSuper(grossNSuper)
                    .superannuation(superAnnuation)
                    .taxAmount(taxAmount)
                    .netAmount(netAmount)
                    .netNSuper(netNSuper)
                    .build();
            calculationRepository.save(calculation);
        }

        return CalculateResult.builder()
                .gross(gross)
                .grossNSuper(grossNSuper)
                .netAmount(netAmount)
                .netNSuper(netNSuper)
                .superAnnuation(superAnnuation)
                .taxAmount(taxAmount)
                .build();
    }

    private double calculateTax(double gross, String taxYear) {
        double taxAmount = 0;
        String url = "http://localhost:8089/taxrate/" + taxYear;
        WireMockServer wireMockServer = new WireMockServer(wireMockConfig().port(8089));
        wireMockServer.start();
        WireMock.configureFor("localhost", 8089);
        stubFor(get(anyUrl()).willReturn(okJson("{" +
                "\"taxTiers\": [" +
                    "{" +
                        "\"from\": 0," +
                        "\"to\": 18200," +
                        "\"baseTax\": 0," +
                        "\"taxPerDollar\": 0" +
                    "}," +
                    "{" +
                        "\"from\": 18201," +
                        "\"to\": 37000," +
                        "\"baseTax\": 0," +
                        "\"taxPerDollar\": 0.19" +
                    "}," +
                    "{" +
                        "\"from\": 37001," +
                        "\"to\": 87000," +
                        "\"baseTax\": 3572," +
                        "\"taxPerDollar\": 0.325" +
                    "}," +
                    "{" +
                        "\"from\": 87001," +
                        "\"to\": 180000," +
                        "\"baseTax\": 19822," +
                        "\"taxPerDollar\": 0.37" +
                    "}," +
                    "{" +
                        "\"from\": 180001," +
                        "\"to\": -1," +
                        "\"baseTax\": 54232," +
                        "\"taxPerDollar\": 0.45" +
                    "}" +
                "]" +
            "}")));

        TaxRate taxRate = this.restTemplate.getForObject(url, TaxRate.class);
        wireMockServer.stop();

        for (TaxTier taxTier : taxRate.getTaxTiers()) {
            if (taxTier.getFrom() <= gross && (taxTier.getTo() >= gross || taxTier.getTo() < 0)) {
                taxAmount = taxTier.getBaseTax() + taxTier.getTaxPerDollar() * (gross - taxTier.getFrom() + 1);
                taxAmount = Math.round(taxAmount * scale) / scale;
                break;
            }
        }

        return taxAmount;
    }

    @SuppressWarnings("unchecked")
    public List<CalculationDto> getHistory(@RequestParam String email) {
        List<Calculation> calculationList = calculationRepository.findByEmail(email);
        return modelMapper.map(calculationList, (new ArrayList<CalculationDto>()).getClass());
    }

    public List<CalculationDto> deleteHistory(List<Integer> ids) {
        if (ids == null || ids.size() == 0) {
            return new ArrayList<>();
        }
        String email = calculationRepository.findOne(ids.get(0)).getEmail();
        calculationRepository.deleteByIdIn(ids);
        return getHistory(email);
    }
}
