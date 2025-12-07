import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/check", async (req, res) => {
  const { name } = req.query;

  if (!name)
    return res.json({ error: "Nome inválido" });

  const tlds = ["com", "net", "org", "dev", "site", "tech"];
  const resultados = [];

  for (const tld of tlds) {
    const dominio = `${name.toLowerCase()}.${tld}`;

    const url = `https://api.domainsdb.info/v1/domains/search?domain=${dominio}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const disponivel = !data.domains;

      resultados.push({
        dominio,
        disponivel
      });
    } catch {
      resultados.push({
        dominio,
        disponivel: false
      });
    }
  }

  res.json(resultados);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});