import { supabase } from '@/lib/supabase.ts';
import { DatabaseBooking } from '@/src/server/db.ts';

// Fetch all bookings
export const getBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*');
  
  if (error) throw error;
  return data;
};

// Create a new booking
export const addBooking = async (booking: Omit<DatabaseBooking, 'id' | 'createdAt'>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select();
  
  if (error) throw error;
  return data;
};

// Update booking status
export const updateBookingStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ bookingStatus: status })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
};
