import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-wish-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit{
  people: any[] = [];

  selectedPerson: any = null;
  showModal = false;
  newWish = '';
  showAddWish = false;
  wishes: any[] = [];

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    this.loadPeople();
  }

  async loadPeople() {
    this.people = await this.supabase.getwishlist() || [];
  }

  async loadWishes(personid: number) {
    this.wishes = await this.supabase.getwishlistDetail(personid) || [];
  }

  async openModal(person: any) {
    this.selectedPerson = person;
    await this.loadWishes(person.wihslistid);
    this.showModal = true;
    this.showAddWish = false;
    this.newWish = '';
  }

  closeModal() {
    this.showModal = false;
    this.selectedPerson = null;
    this.showAddWish = false;
    this.newWish = '';
  }

  toggleAddWish() {
    this.showAddWish = !this.showAddWish;
    if (!this.showAddWish) {
      this.newWish = '';
    }
  }

  async addWish() {
    if (this.newWish.trim() && this.selectedPerson) {
      const result = await this.supabase.saveWishlist(this.selectedPerson.wihslistid, this.newWish.trim());
      alert(result);
      await this.loadWishes(this.selectedPerson.wihslistid);
      this.showAddWish = false;
    }
  }

  toggleWishComplete(wish: any) {
    wish.completed = !wish.completed;
  }

  deleteWish(wishId: number) {
    if (this.selectedPerson && this.selectedPerson.wishes) {
      this.selectedPerson.wishes = this.selectedPerson.wishes.filter(
        (wish: any) => wish.id !== wishId
      );
    }
  }

  getWishesCount(person: any): number {
    return person.wishes ? person.wishes.length : 0;
  }

  getCompletedWishesCount(person: any): number {
    return person.wishes ? person.wishes.filter((wish: any) => wish.completed).length : 0;
  }
}
