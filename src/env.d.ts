/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly DATABASE_URL: string;
	readonly PUBLIC_SUPABASE_URL: string;
	readonly PUBLIC_SUPABASE_ANON_KEY: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		loggedIn: boolean;
		session?: import('@supabase/supabase-js').UserResponse;
	}
}
