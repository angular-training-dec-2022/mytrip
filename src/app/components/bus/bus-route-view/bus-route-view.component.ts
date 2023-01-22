import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusRoutes } from 'src/app/models/bus-routes.model';
import { Bus } from 'src/app/models/bus.model';
import { Cities } from 'src/app/models/cities.model';
import { Reservations } from 'src/app/models/reservations.model';
import { BusRoutesService } from 'src/app/services/bus-routes.service';
import { BusService } from 'src/app/services/bus.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-bus-route-view',
  templateUrl: './bus-route-view.component.html',
  styleUrls: ['./bus-route-view.component.css']
})
export class BusRouteViewComponent implements OnInit {

  color: string = '';
  selectedSeats: number[] = [];
  totalSeats: number[] = [];

  busRouteInfo: BusRoutes = {
    id: 0,
    busId: 0,
    busTravelDateTime: new Date(),
    busSeatsTaken: []
  }
  
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
              private citiesService: CitiesService,
              private reservationService: ReservationsService) { }

  ngOnInit(): void {

    this.citiesService.fetchAllCities().subscribe((response)=>{
      this.allCities = response;
    })

    let busRouteId = this.activatedRoute.snapshot.paramMap.get('busRouteId');
    if(busRouteId!=null){
      // fetching all the routes for the busRouteId
      this.busRouteService.fetchABusRoute(+busRouteId).subscribe((response)=>{
        this.busRouteInfo = response;
         // fetching the bus information for the busId
        this.busService.fetchABus(this.busRouteInfo.busId).subscribe((resp)=>{
          this.busInfo = resp;
          for(let i=1; i<=resp.busTotalSeats;i++){
            this.totalSeats.push(i);
          }
        })   
      })
    }
  }

  seatDisplay(seat: number): string{
    if(this.busRouteInfo.busSeatsTaken.findIndex((eachSeat)=>eachSeat==seat)!=-1){
      this.color='RED';
    }else if(this.selectedSeats.findIndex((eachSeat)=>eachSeat==seat)!=-1){
      this.color='BLUE'
    }else{
      this.color='GREEN'
    }
    return this.color;
  }

  addToSeatSelected(seat: number){
    if(this.selectedSeats.findIndex((eachSeat)=>eachSeat==seat)!=-1){ // id seat is present in selectedSeats
      this.selectedSeats.splice(this.selectedSeats.findIndex((eachSeat)=>eachSeat==seat), 1);
    }else{
      this.selectedSeats.push(seat);
    }
    this.seatDisplay(seat);
  }

  bookTickets(){
    let addDetails: Reservations ={
      id: 0,
      resBusRouteId: this.busRouteInfo.id,
      resSeatsTaken: this.selectedSeats
  }
  this.reservationService.addReservation(addDetails).subscribe((response)=>{
    this.router.navigate(['reservation-success', response.id]);
  })
}
}
