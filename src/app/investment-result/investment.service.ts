import { Injectable, signal } from '@angular/core';

import { type Investment } from '../user-input/investment.model';
import { type InvestmentResult } from './investment-result.model';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  annualData = signal<InvestmentResult[]>([]);
  calculateInvestmentResults(investment: Investment) {
    const annualData: InvestmentResult[] = [];

    let investmentValue = investment.initialInvestment;

    for (let i = 0; i < investment.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear =
        investmentValue * (investment.expectedReturn / 100);
      investmentValue += interestEarnedInYear + investment.annualInvestment;
      const totalInterest =
        investmentValue -
        investment.annualInvestment * year -
        investment.initialInvestment;

      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: investment.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested:
          investment.initialInvestment + investment.annualInvestment * year,
      });
    }
    this.annualData.set(annualData);
    return annualData;
  }
}
