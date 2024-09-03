import mysql from "mysql";
import oracledb from "oracledb";

const conn = mysql.createConnection({
  database: "ihdadb",
  host: "localhost",
  user: "root",
  password: "",
});

const connOracle = oracledb.getConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: "localhost/FREE",
});

export { conn, connOracle };

export default conn;
