import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchService, Route } from '../../services/search-service';  // update the path as needed
import { log } from 'console';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map ,startWith } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Output ,EventEmitter} from '@angular/core';



@Component({
  selector: 'app-search',
  
  templateUrl: './search.html',
  styleUrls: ['./search.scss'],
  
  standalone: true,
  imports: [RouterLink,MatCardModule,MatButtonModule,ReactiveFormsModule, CommonModule,FormsModule,MatAutocompleteModule,MatInputModule,MatFormFieldModule]
})
export class Search implements OnInit {
  searchForm!: FormGroup;
  allRoutes: any[] | undefined = [];
  filteredRoutes: any[] | undefined  = [] 
  allSchedules: any ={}
  cities = ["lucknow", "delhi", "bangalore", "hyderabad", "kolkata", "mumbai", "new delhi", "chennai", "nagpur", "surat", "ahmedabad"];
   @Output() ScheduleId = new EventEmitter<any>();
  cityAliasMap: { [alias: string]: string } = {
    lko: 'lucknow',
    dli: 'delhi',
    blr: 'bangalore',
    hyd: 'hyderabad',
    bom: 'mumbai',
    kol: 'kolkata',
    maa: 'chennai',
    ndl: 'new delhi',
    nag: 'nagpur',
    sur: 'surat',
    amd: 'ahmedabad'
  };
 // filteredCities: string[] = [];

 filteredFromCities!: Observable<{ value: string; display: string }[]>;
filteredToCities!: Observable<{ value: string; display: string }[]>;
  searchSubmitted  = false;
  // The variable bound to the input
  


  constructor(private fb: FormBuilder, private searchService: SearchService) {}
  

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: ['', Validators.required]
    });
   
  
 
    
    this.filteredFromCities = this.searchForm.get('from')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCities(value || ''))
    );
    
    this.filteredToCities = this.searchForm.get('to')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCities(value || ''))
    );
      this.loadAllRoutes();
      this.loadAllSchedules();
      
       
  }

  loadAllSchedules(){
    this.searchService.getAllSchedules().subscribe((x) => {
      this.allSchedules= x;
    })
    console.log("Schedules are", this.allSchedules);
    
  }
  
  loadAllRoutes() : void{
    this.searchService.getRoutes().subscribe((routes  ) => {
      this.allRoutes = routes.data;
      
      
      
      
    });
  }

  

  filterCities(input: string): { value: string; display: string }[] {
    const query = input.toLowerCase();
  
    const aliasMatches = Object.entries(this.cityAliasMap)
      .filter(([alias]) => alias.startsWith(query))
      .map(([alias, city]) => ({
        value: this.formatCity(city), // what goes in the input
        display: `${alias.toUpperCase()} – ${this.formatCity(city)}` // what shows in dropdown
      }));
  
    const nameMatches = this.cities
      .filter(city => city.toLowerCase().includes(query))
      .map(city => ({
        value: this.formatCity(city),
        display: this.formatCity(city)
      }));
  
    // Merge and deduplicate by value
    const seen = new Set<string>();
    const combined = [...aliasMatches, ...nameMatches].filter(item => {
      if (seen.has(item.value.toLowerCase())) return false;
      seen.add(item.value.toLowerCase());
      return true;
    });
     console.log(combined)
    return combined;
  }
  
  // Optional: Capitalize nicely
  formatCity(name: string): string {
    return name
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
  

  onSearch(): void {
    if (this.searchForm.valid) {
      this.searchSubmitted =true;
      console.log(this.searchSubmitted);
     

     
      const { from, to,date } = this.searchForm.value;

      const targetDate= typeof date==='string'  ? date.split('T')[0]  : new Date(date).toISOString().slice(0,10) ;

      console.log(date, "this is the date")
      console.log("all route are",this.allRoutes);
      this.filteredRoutes = this.allSchedules.data?.filter((route: any) =>
        route?.route.source.toLowerCase() === from.toLowerCase() && 
        route?.route.destination.toLowerCase() === to.toLowerCase() &&
        route?.departureTime.slice(0,10)  === date
      );
         console.log("filtered",this.filteredRoutes);
          this.ScheduleId.emit(this.filteredRoutes);
    
              
       
    }
  }
  Select(routeId:any){
    
    
  this.ScheduleId.emit(routeId);
   
  }
}
