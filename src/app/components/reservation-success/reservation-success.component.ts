import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-reservation-success',
  templateUrl: './reservation-success.component.html',
  styleUrls: ['./reservation-success.component.css']
})
export class ReservationSuccessComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private reservationService: ReservationsService) { }

  ngOnInit(): void {
    let resId = this.activatedRoute.snapshot.paramMap.get('reservationId');
    // fetch the reservation by passing and display the reservation on the template
  }

}
