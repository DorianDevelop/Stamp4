const mysql = require("mysql2");
require("dotenv").config();

const createConnection = (dbName) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: dbName, //Nom de la base de donnée passé en paramètre dans la fonction
  });

  //Création de la connection, avec message d'erreur si raté
  connection.connect((error) => {
    if (error) {
      console.error("Error connecting to the database:", error);
    }
  });

  return connection;
};

module.exports = createConnection; //Exporte la fonction permettant la création de la fonction
