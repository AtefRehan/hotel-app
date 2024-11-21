import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      // note that thest names is must be the same as the names in the html file in the formControlName

      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // get the id from the url
    if (id) {
      const reservation = this.reservationService.getReservation(id); // get the reservation by id
      if (reservation) this.reservationForm.patchValue(reservation); // fill the form with the reservation data
      // patchValue is used to fill the form with the data
    }
  }

  reservationForm: FormGroup = new FormGroup({});

  onSubmit() {
    if (this.reservationForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id'); // get the id from the url
      if (id) {
        //Update the reservation
        this.reservationService.updateReservation(this.reservationForm.value, id);
        this.router.navigate(['/list']);
        // patchValue is used to fill the form with the data
      } else {
        //Add new reservation
        let reservation = this.reservationForm.value; //
        this.reservationService.addReservation(reservation);
        this.router.navigate(['/list']);
      }
    }
    // console.log("valid");
  }
}
