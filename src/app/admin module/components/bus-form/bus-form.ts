import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusService } from '../../services/bus-service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ViewEncapsulation } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-bus-form',
  templateUrl: './bus-form.html',
  encapsulation: ViewEncapsulation.None,
  imports:[CommonModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatSelectModule,MatButtonModule,MatIconModule,MatProgressSpinnerModule],
  styleUrls: ['./bus-form.scss']
})
export class BusFormComponent implements OnInit {
  busForm!: FormGroup;
  busTypes: string[] = ['Sleeper', 'Seater', 'AC', 'Non-AC'];
  statuses: string[] = ['Active', 'Inactive'];
  
  constructor(private fb: FormBuilder, private busService: BusService ,private snackBar: MatSnackBar ,private toaster:ToastrService  ) {}

  ngOnInit(): void {
    this.busForm = this.fb.group({
      busNumber: ['', [Validators.required, Validators.pattern('[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}')]],
      busName: ['', Validators.required],
      busType: ['', Validators.required],
      seatCapacity: [null, [Validators.required, Validators.min(10)]],
      busStatus: ['', Validators.required]
    });
  }
isLoading=false;
  onSubmit(): void {
    this.isLoading=true;
    if (this.busForm.valid) {
      console.log('Bus data:', this.busForm.value);
      this.busService.AddNewBus(this.busForm.value).subscribe((res)=>
        {
          this.isLoading=false;
          if(res){
           this.toaster.success("Added Successfully", "Success")
          }
          
        } 

      )
      this.busForm.reset();
      // You can call a service here
    } else {
      this.busForm.markAllAsTouched();
    }
  }

  openSnackBar(type:string) {
    this.toaster.error('🚌 Booking confirmed!','success', {
      
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing', // or 'decreasing'
      easeTime: 300,
      easing: 'ease-out',
    
    });
    
   
  }
}
