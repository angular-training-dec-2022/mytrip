import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusRoutes } from 'src/app/models/bus-routes.model';
import { Bus } from 'src/app/models/bus.model';
import { Cities } from 'src/app/models/cities.model';
import { BusRoutesService } from 'src/app/services/bus-routes.service';
import { BusService } from 'src/app/services/bus.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-bus-route-list',
  templateUrl: './bus-route-list.component.html',
  styleUrls: ['./bus-route-list.component.css']
})
export class BusRouteListComponent implements OnInit {

  allBusRoutes: BusRoutes[] = [];
  busInfo: Bus = {
    id: 0,
    busName: '',
    busTicketFare: 0,
    busFromId: 0,
    busToId: 0,
    busTotalSeats: 0,
    busImageUrl: [] 
  }

  allCities: Cities[] =[];
  
  constructor(private router: Router, 
              private activatedRoute: ActivatedRoute,
              private busService: BusService, 
              private busRouteService: BusRoutesService,
              private citiesService: CitiesService) { }

  ngOnInit(): void {

    this.citiesService.fetchAllCities().subscribe((response)=>{
      this.allCities = response;
    })

    let busId = this.activatedRoute.snapshot.paramMap.get('busID');
    if(busId!=null){
      // fetching all the routes for the busId
      this.busRouteService.fetchBusRoutesByBusId(+busId).subscribe((response)=>{
        this.allBusRoutes = response;
        if(busId!=null){
          // fetching the bus information for the busId
          this.busService.fetchABus(+busId).subscribe((resp)=>{
            this.busInfo = resp;
          })  
        }
        
      })
    }

  }

  bookTickets(busRouteId: number){
    this.router.navigate(['bus-route-view', busRouteId]);
  }
}
