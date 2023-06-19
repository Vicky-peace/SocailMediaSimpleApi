import dotenv from 'dotenv';
import assert from 'assert';


dotenv.config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PWD, SQL_DB,SQL_SERVER,SQL_PORT} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT , 'PORT is required');
assert(HOST, 'HOST is required');


const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql:{
          sql_port: SQL_PORT,
        server : SQL_SERVER,
        database: SQL_DB,
        user: SQL_USER,
        password: SQL_PWD,
        options:{
        
        
        encrypt: sqlEncrypt,
        enableArithAbort: true,
        
        }
    }
    
};
export default config;