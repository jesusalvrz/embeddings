import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from '@vercel/postgres';

const client = postgres('postgres://default:Kt9wk0FxnflS@ep-bold-cloud-a471tjtl-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require');

export const db = drizzle(client);