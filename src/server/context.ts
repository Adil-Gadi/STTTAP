import type { UserResponse } from '@supabase/supabase-js';
import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { isAuth } from '../auth/isAuth';

function getCookie(cname: string, cookie: string) {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

// Information on server side rendering with supabase authorization: https://supabase.com/docs/guides/auth/server-side-rendering
export async function createContext({ req, resHeaders }: FetchCreateContextFnOptions) {
	//provide context here

	const cookie = req.headers.get('cookie');

	let loggedIn = false;
	let session: UserResponse | undefined = undefined;

	if (cookie) {
		const accessToken = getCookie('my-access-token', cookie);
		const refreshToken = getCookie('my-refresh-token', cookie);

		const auth = await isAuth(refreshToken, accessToken);

		if (auth) {
			loggedIn = true;
			session = auth;
		}
	}

	return { req, resHeaders, loggedIn, session };
}

export type Context = inferAsyncReturnType<typeof createContext>;
