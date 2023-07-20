import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index';

// tRPC Client
export const api = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/trpc',
			// You can pass any HTTP headers you wish here
			async headers() {
				return {
					//   authorization: getAuthCookie(),
				};
			},
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: 'include',
				});
			},
		}),
	],
});
