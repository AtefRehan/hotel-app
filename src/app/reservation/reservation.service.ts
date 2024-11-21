import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];
  constructor() {
    const data = localStorage.getItem('reservations');
    this.reservations = data ? JSON.parse(data) : []; // this is to store the data in the local storage but its only for testing purposes
  }

  //DOING CRUD
  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(reservation => reservation.id === id)!;
  }

  addReservation(reservation: Reservation): void {
    reservation.id = uuid();
    //Date.now().toString();

    this.reservations.push(reservation);
    console.log(this.reservations);
    localStorage.setItem('reservations', JSON.stringify(this.reservations)); // this is to store the data in the local storage but its only for testing purposes
    
  }

  updateReservation(updatedReservation: Reservation , id : string): void {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    this.reservations[index] = updatedReservation;
    this.reservations[index].id = id;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
