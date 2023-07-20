import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL,
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			persistSession: false, // All our access is from server, so no need to persist the session to browser's local storage
		},
	}
);

supabase.auth.onAuthStateChange((event, session) => {
	//run on the client
	if (typeof document !== 'undefined') {
		if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
			// delete cookies on sign out
			document.cookie = 'my-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			document.cookie = 'my-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		} else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
			const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
			document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
			document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
		}
	}
});
