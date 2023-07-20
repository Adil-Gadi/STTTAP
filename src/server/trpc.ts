import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(opts => {
	const { ctx } = opts;
	if (!ctx.loggedIn) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return opts.next({
		ctx: {
			session: ctx.session,
		},
	});
});

// you can reuse this for any procedure
export const protectedProcedure = t.procedure.use(isAuthed);
