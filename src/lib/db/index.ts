import * as schema from './schema';
import {drizzle} from 'drizzle-orm/postgres-js';
import postgress from 'postgres';
export const sql = postgress(process.env.DATABASE_CONNECTION_STRING as string,{
    max: 1
});

export const db = drizzle(sql, {
    schema
})



