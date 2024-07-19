import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../models/housing-location';
import { HousingService } from '../../services/housing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    HousingLocationComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  housingLocationList:HousingLocation[]=[];
  filteredLocationList:HousingLocation[]=[];
  filter:string='';

  // housingLocation:HousingLocation = {
  //   id: 9999,
  //   name: 'Test Home',
  //   city: 'Test city',
  //   state: 'ST',
  //   photo: `${this.baseUrl}/example-house.jpg`,
  //   availableUnits: 99,
  //   wifi: true,
  //   laundry: false
  // }
 

  constructor(private housingService:HousingService){
    this.housingService.getAllHousingLocations().then((housingLocationList:
      HousingLocation[])=>{
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      }
    );
  };


  filterResults(text:string){
    console.log(`Button clicked with filter ${text}`);
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((h:HousingLocation)=>
    h.city.toLocaleLowerCase().indexOf(text.toLocaleLowerCase())!== -1);
  }
}
