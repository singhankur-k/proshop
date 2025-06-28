import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.html',
  styleUrls: ['./passenger-detail.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ]

})
export class PassengerFormComponent {
  @Input() seatNumber: any;
  passengerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passengerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  

  onSubmit() {
    if (this.passengerForm.valid) {
      console.log('Passenger Name:', this.passengerForm.value.name);
    }
  }
}
