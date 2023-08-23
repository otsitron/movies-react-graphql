import { Database } from 'fakebase';

const db = new Database('./data');

export const Movie = db.table('movies');
