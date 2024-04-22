import pg from 'pg';
const { Client } = pg;
import express from 'express';
import cors from 'cors';
const app = express();
const port = 3001;

// Configurazione del client PostgreSQL
const postgresClient = new Client({
  user: 'qtkxcpqk',
  host: 'mouse.db.elephantsql.com',
  database: 'qtkxcpqk',
  password: '3GWlmqv9MF_juzov6XFsrsYq3ik2kxf1',
  port: 5432, // Porta predefinita di PostgreSQL
});

let connectionAttempts = 0;
const maxConnectionAttempts = 30;
const retryInterval = 10000; // 10 secondi

// Funzione per connettersi al database PostgreSQL
function connectToPostgres() {
  postgresClient.connect()
    .then(() => {
      console.log('Connesso al database PostgreSQL');
      startServer();
    })
    .catch(err => {
      console.error('Errore durante la connessione al database:', err);
      connectionAttempts++;
      if (connectionAttempts < maxConnectionAttempts) {
        console.log(`Ritentativo di connessione tra 10 secondi (Tentativo ${connectionAttempts}/${maxConnectionAttempts})`);
        setTimeout(connectToPostgres, retryInterval);
      } else {
        console.error(`Numero massimo di tentativi di connessione raggiunto (${maxConnectionAttempts}). Impossibile avviare il server.`);
        process.exit(1); // Chiudi il processo con un codice di errore
      }
    });
}

// Avvio del server Express
function startServer() {
  app.use(cors());

  app.get('/storico', async (req, res) => {
    try {
      const query = 'SELECT * FROM "public"."storico" order by tme DESC'; // Sostituisci con la query SQL per ottenere i dati dal tuo database
      const { rows } = await postgresClient.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
      res.status(500).json({ error: 'Errore durante il recupero dei dati' });
    }
  });

  app.listen(port, () => {
    console.log(`Server backend in esecuzione sulla porta ${port}`);
  });
}

// Connessione al database PostgreSQL
connectToPostgres();
