import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://uisglxbwxviylvikpniq.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpc2dseGJ3eHZpeWx2aWtwbmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1OTU2OTIsImV4cCI6MjA0ODE3MTY5Mn0.un8-C8YFLdx3Kf9cBC4-wtR3TeP4PfpAglUSroT18_s'
    );
  }

  async getwishlist() {
    const { data, error } = await this.supabase.rpc('get_wishlist')

    if (error) {
      console.error('Error al obtener el usuario:', error.message);
      return null;
    }

    return data; // Devuelve el objeto de usuario completo
  }

  async getwishlistDetail(personid: number) {
    const { data, error } = await this.supabase.rpc('get_wishlist_detail',
      {
        personid: personid
      }
    )

    if (error) {
      console.error('Error al obtener el usuario:', error.message);
      return null;
    }

    return data; // Devuelve el objeto de usuario completo
  }

  async saveWishlist(personid: number, wish: string) {
    const { data, error } = await this.supabase.rpc('save_new_wishlist',
      {
        personid: personid,
        itemname: wish
      }
    )

    if (error) {
      console.error('Error al obtener el usuario:', error.message);
      return null;
    }

    return data; // Devuelve el objeto de usuario completo
  }

}
