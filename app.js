async function buscar() {
  const nome = document.getElementById("nome").value;
  const resultadoDiv = document.getElementById("resultado");

  if (!nome) {
    resultadoDiv.innerHTML = "<p>Digite algo!</p>";
    return;
  }

  resultadoDiv.innerHTML = "<p>Carregando...</p>";

  const res = await fetch(`/check?name=${nome}`);
  const dados = await res.json();

  resultadoDiv.innerHTML = "";

  dados.forEach(item => {
    const caixa = document.createElement("div");
    caixa.classList.add("result-box");

    caixa.innerHTML = `
      <strong>${item.dominio}</strong><br/>
      ${item.disponivel ? "✔ Disponível" : "❌ Já Registrado"}
      <br/><br/>
      ${
        item.disponivel
          ? `<a href="https://www.namecheap.com/domains/registration/results/?domain=${item.dominio}" target="_blank">Registrar</a>`
          : ""
      }
    `;
    resultadoDiv.appendChild(caixa);
  });
}