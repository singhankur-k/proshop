import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchService, Route } from '../../services/search-service';  // update the path as needed
import { log } from 'console';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map ,startWith } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule,MatAutocompleteModule,MatInputModule,MatFormFieldModule]
})
export class Search implements OnInit {
  searchForm!: FormGroup;
  allRoutes: Route[] = [];
  filteredRoutes: Route[] = [];
  cities = ["lucknow", "delhi", "bangalore", "hyderabad", "kolkata", "mumbai", "new delhi", "chennai", "nagpur", "surat", "ahmedabad"];

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
  

  }

  loadAllRoutes(): void {
    this.searchService.getRoutes().subscribe((routes) => {
      this.allRoutes = routes;
      console.log(this.allRoutes);
      
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
      const { from, to } = this.searchForm.value;
      this.filteredRoutes = this.allRoutes.filter(route =>
        route.source.toLowerCase() === from.toLowerCase() &&
        route.destination.toLowerCase() === to.toLowerCase()
      );

      console.log('Matching Routes:', this.filteredRoutes);
    }
  }
}