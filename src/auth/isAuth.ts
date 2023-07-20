import type { UserResponse } from '@supabase/supabase-js';
import { supabase } from './supabase-auth';

export async function isAuth(
	refreshToken: string | undefined,
	accessToken: string | undefined
): Promise<false | UserResponse> {
	// check to see if a user is logged in.

	if (refreshToken && accessToken) {
		await supabase.auth.setSession({
			refresh_token: refreshToken,
			access_token: accessToken,
		});
	} else {
		// make sure you handle this case!
		return false;
	}

	// returns user information
	return supabase.auth.getUser();
}
