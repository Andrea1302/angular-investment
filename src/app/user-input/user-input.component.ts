import { Component, inject } from '@angular/core';
import { type Investment } from './investment.model';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment-result/investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  investment: Investment = {
    initialInvestment: 5,
    duration: 5,
    expectedReturn: 100,
    annualInvestment: 50,
  };
  private investmentService = inject(InvestmentService);

  onSubmit() {
    this.investmentService.calculateInvestmentResults(this.investment);
    this.investment = {
      initialInvestment: 0,
      duration: 0,
      expectedReturn: 0,
      annualInvestment: 0,
    };
  }
}
