import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search-service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardComponent } from '../Common/card/card';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



export interface Seat {
  id: string;
  seatNumber?: string; // Ensure your seat object contains seatNumber!
  type: 'sleeper' | 'chair';
  status: 'Available' | 'Booked' | 'selected';
  price?: number; // Optional: Add price if available from the API.
}

@Component({
  selector: 'app-deck-seat-layout',
  templateUrl: './seat.html',
  styleUrls: ['./seat.scss'],
  imports: [CommonModule, MatTooltipModule, CardComponent,MatProgressSpinnerModule],
  standalone: true,
})
export class SeatMapComponent implements OnInit {
  lowerSleeperSeats: any[] = [];
  seatLayout: any[] | undefined = [];
  extraLowerSleeperSeats: Seat[] = [
    { id: 'LSX1', type: 'sleeper', status: 'Available' },
    { id: 'LSX2', type: 'sleeper', status: 'Available' },
    { id: 'LSX3', type: 'sleeper', status: 'Available' },
    { id: 'LSX4', type: 'sleeper', status: 'Available' }
  ];
  passengerName ='';
  some = [];
  // Using a Set to store unique selected seats.
  selectedSeats = new Set<Seat>();
  lowerChairSeats: any[] = [];
  UpperDeckSleeperSeats: any[] = [];
  upperDeckSleeperSideSeats: any[] = [];
  isLoading = true;
  seatStatusData: any[]=[];
  
  constructor(
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  this.loadSeatStatus();
    
   
   
  }
  ngOnChange(){
    this.loadSeatStatus();
    this.cdr.markForCheck();

  }
  
  
  handleClick(){
    

  }
  
  isBooking: boolean = false;

  handlePassenger($event: any) {
    this.passengerName = $event;
    const ScheduleId = Number(this.route.snapshot.paramMap.get('id'));
    const bookingInfo = {
      scheduleId: ScheduleId,
      seatNumbers: this.getSeatNumbers() ,
      passengerName: this.passengerName,     
      bookingDate: new Date().toISOString(),
    };
  console.log(bookingInfo);
  
    this.isBooking = true; // Show spinner
  
    this.searchService.createBooking(bookingInfo).subscribe({
      next: () => {
        this.isBooking = false;
        this.snackBar.open('Booking successful!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        this.isBooking = false;
        console.error('Booking failed', err);
        this.snackBar.open('Booking failed. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });
  }



  loadSeatStatus() {
    const ScheduleId = Number(this.route.snapshot.paramMap.get('id'));
    this.searchService.getSeatStatus(ScheduleId).subscribe({
      next: (response) => {
        this.seatStatusData = response;
        
        // Assuming seat objects have a 'seatNumber' property
        this.lowerSleeperSeats = this.seatStatusData.filter(seat =>
          ['LS1', 'LS2', 'LS3', 'LS4', 'LS5', 'LS6'].includes((seat.seatNumber))
        );

        this.lowerChairSeats = this.seatStatusData.filter(seat =>
          [ 'LC1','LC2','LC3','LC4','LC5','LC6','LC7','LC8','LC9','LC10','LC11','LC12','LC13','LC14','LC15','LC16'
          ].includes(seat.seatNumber)
        );
        

        this.upperDeckSleeperSideSeats = this.seatStatusData.filter(seat =>
          ['US1','US2','US3','US4','US5','US6','US7','US8','US9','US10','US11','US12'].includes(seat.seatNumber)
        );
        this.UpperDeckSleeperSeats = this.seatStatusData.filter(seat =>
          ["USX1", "USX2", "USX3", "USX4", "USX5", "USX6"].includes(seat.seatNumber)
        );
        this.isLoading = false;
        this.cdr.detectChanges();
        
      },
      error: (err) => {
        console.error("Failed to load seats", err);
        this.isLoading = false;
      }
    });
  }


  
  toggleSeat(seat: Seat): void {
    // Prevent toggling if the seat is booked.
    if (seat.status === 'Booked') {
      return;
    }
    
    
    // Toggle the seat status.
    seat.status = seat.status === 'selected' ? 'Available' : 'selected';
    
    // Use the Set to add or remove the seat.
    this.selectedSeats.has(seat)
      ? this.selectedSeats.delete(seat)
      : this.selectedSeats.add(seat);
    
   this.getSeatNumbers()
   
  }
  getSeatNumbers (){
    const seatNumbers: string[] = [...this.selectedSeats]
  .map(seat => seat.seatNumber)
  .filter((sn): sn is string => sn !== undefined);

      return seatNumbers;
    
  }
  // Helper method to convert the set of selected seats into a comma-separated string.
  getSelectedSeatNumbers(): string {
    // Ensure that each seat has the property 'seatNumber'
    return [...this.selectedSeats]
      .map((seat: Seat) => seat.seatNumber || '')
      .filter(seatNum => seatNum !== '')
      .join(', ');
  }
  
  // Helper method to calculate the total fare.
  calculateTotalFare(): number {
    // If seat.price exists use it; otherwise use a default value (e.g., 250).
    return [...this.selectedSeats].reduce((acc: number, seat: Seat) => {
      const seatPrice = seat.price ? seat.price : 250;
      return acc + seatPrice;
    }, 0);
  }

  handleSelection(data:any){
       console.log("passed data",data);
    
  }
}

