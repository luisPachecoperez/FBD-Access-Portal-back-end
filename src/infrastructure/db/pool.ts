import { Pool } from 'pg';
import * as fs from 'fs';
//import * as dotenv from 'dotenv'; // ✅ Esto es lo correcto
//dotenv.config();


//console.log('DB_HOST', process.env.DB_HOST);
export const pool = new Pool({
  
  host: 'fbd-orlandojvasquez74-6861.g.aivencloud.com',
  port: 17873,
  user: 'avnadmin',
  password: 'AVNS_I8LEBN1f5ENDdq_-a3P',
  database: 'defaultdb', 
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync("./certs/ca.pem").toString(),
  }

});


/*host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  */