/*
MODIFICAR LOS ARCHIVOS PARA QUE HAGA EL
GENERATE DE EMBEDDINGS Y RESOURCES
ASÍ FUNCIONA CON EL ARCHIVO SCHEMA.TS
*/


/*
Extendida
*/
import type { Config } from 'drizzle-kit';
//import { env } from '$env/static/private';

export default {
    out: './drizzle',
    dialect: 'postgresql',
    schema: './src/lib/server',
    dbCredentials: {
        url: "postgres://default:Kt9wk0FxnflS@ep-bold-cloud-a471tjtl.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
    }
} satisfies Config;

/*
Simple

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/server/schema.ts",
    dbCredentials: {
        url: "postgres://default:Kt9wk0FxnflS@ep-bold-cloud-a471tjtl.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
    }
});*/