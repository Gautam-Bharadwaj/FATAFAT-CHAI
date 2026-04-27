import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Dummy no-op client used when env vars are not configured
const dummyClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
    signInWithPassword: () =>
      Promise.resolve({
        data: null,
        error: { message: 'Auth not configured' },
      }),
    signUp: () =>
      Promise.resolve({
        data: null,
        error: { message: 'Auth not configured' },
      }),
    signOut: () => Promise.resolve({ error: null }),
  },
};

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : dummyClient;
