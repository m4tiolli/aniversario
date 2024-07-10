const mysql = require("mysql");
const cors = require("cors");
module.exports = function (app) {
  app.use(cors());

  const db = mysql.createPool({
    host: "aniversariomariana.mysql.database.azure.com",
    user: "matiolli",
    password: "020506gA@",
    database: "db_aniversario",
  });

  app.get("/", (req, res) => {
    db.query("SELECT * FROM convidados", (err, result) => {
      if (err) {
        console.error("Erro ao buscar convidados", err);
        res.status(500).json({ error: "Erro ao buscar convidados" });
      } else {
        res.json(result);
      }
    });
  });

  app.get("/pesquisa/:nome", (req, res) => {
    const nome = req.params.nome;
    db.query(`SELECT * FROM convidados WHERE nome LIKE '%${nome}%'`, (err, result) => {
      if (err) {
        console.error("Erro ao buscar convidados", err);
        res.status(500).json({ error: "Erro ao buscar convidados" });
      } else {
        res.json(result);
      }
    });
  });

  app.post("/", (req, res) => {
    const { nome } = req.body;

    db.query(
      "INSERT INTO convidados (nome) VALUES (?)",
      [nome],
      (err, result) => {
        if (err) {
          console.error("Erro ao cadastrar convidado", err);
          res.status(500).json({ error: "Erro ao cadastrar convidado" });
        } else {
          res.json({
            message: "Convidado cadastrado com sucesso",
            id: result.insertId,
          });
        }
      }
    );
  });

  app.delete("/:id", (req, res) => {
    const userId = req.params.id;

    db.query(
      "DELETE FROM convidados WHERE id = ?",
      [userId],
      (err, result) => {
        if (err) {
          console.error("Erro ao deletar convidado", err);
          res.status(500).json({ error: "Erro ao deletar convidado" });
        } else {
          res.json({ message: "Convidado deletado com sucesso" });
        }
      }
    );
  });
}