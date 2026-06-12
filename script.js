function analisar() {
  
  let tempo = Number(document.getElementById("tempo").value);
  
  // PLACAR
  let placarCasa = Number(document.getElementById("placarCasa").value);
  let placarFora = Number(document.getElementById("placarFora").value);
  
  // CASA
  let finalCasa = Number(document.getElementById("finalCasa").value);
  let golCasa = Number(document.getElementById("golCasa").value);
  let escanteioCasa = Number(document.getElementById("escanteioCasa").value);
  let ataqueCasa = Number(document.getElementById("ataqueCasa").value);
  let perigoCasa = Number(document.getElementById("perigoCasa").value);
  let posseCasa = Number(document.getElementById("posseCasa").value);
  let cartaoCasa = Number(document.getElementById("cartaoCasa").value);
  
  // FORA
  let finalFora = Number(document.getElementById("finalFora").value);
  let golFora = Number(document.getElementById("golFora").value);
  let escanteioFora = Number(document.getElementById("escanteioFora").value);
  let ataqueFora = Number(document.getElementById("ataqueFora").value);
  let perigoFora = Number(document.getElementById("perigoFora").value);
  let posseFora = Number(document.getElementById("posseFora").value);
  let cartaoFora = Number(document.getElementById("cartaoFora").value);
  
  
  // ============================
  // TOTAL
  // ============================
  
  let totalFinal = finalCasa + finalFora;
  let totalEscanteio = escanteioCasa + escanteioFora;
  let totalPerigo = perigoCasa + perigoFora;
  let totalCartoes = cartaoCasa + cartaoFora;
  
  
  // ============================
  // PLACAR / PRESSÃO
  // ============================
  
  let diferenca = placarCasa - placarFora;
  
  let pressaoCasa = 1;
  let pressaoFora = 1;
  
  if (diferenca < 0) pressaoCasa += 2;
  if (diferenca > 0) pressaoFora += 2;
  
  
  // ============================
  // ÍNDICE DE ATAQUE
  // ============================
  
  let indiceAtaque = (totalFinal * 1.5) + (totalPerigo * 2) + (tempo * 0.3);
  
  if (diferenca !== 0) {
    indiceAtaque += 10;
  }
  
  
  // ============================
  // PROBABILIDADE GOL
  // ============================
  
  let probGol = indiceAtaque / 1.2;
  if (probGol > 100) probGol = 100;
  
  
  // ============================
  // 🎯 MELHOR ENTRADA GOL
  // ============================
  
  let melhorEntrada = "";
  let confianca = "";
  
  if (probGol >= 75 && totalEscanteio >= 6) {
    melhorEntrada = "🔥 OVER GOL + ESCANTEIOS AO VIVO";
    confianca = "ALTA";
  }
  else if (probGol >= 65) {
    melhorEntrada = "⚽ OVER 0.5 GOL AO VIVO";
    confianca = "MÉDIA/ALTA";
  }
  else if (totalEscanteio >= 8) {
    melhorEntrada = "🚩 ESCANTEIOS AO VIVO";
    confianca = "MÉDIA";
  }
  else {
    melhorEntrada = "⏳ SEM ENTRADA CLARA";
    confianca = "BAIXA";
  }
  
  
  // ============================
  // 🚩 OVER ESCANTEIOS INTELIGENTE
  // ============================
  
  let overEscanteios = "";
  
  if (totalEscanteio <= 3) {
    overEscanteios = "Sem valor em escanteios ainda";
  }
  else if (totalEscanteio <= 5) {
    overEscanteios = "👉 Over 6.5 possível entrada leve (risco médio)";
  }
  else if (totalEscanteio <= 7) {
    overEscanteios = "🔥 Over 7.5 entrada boa (valor real)";
  }
  else if (totalEscanteio <= 9) {
    overEscanteios = "🚀 Over 8.5 MUITO forte (entrada agressiva)";
  }
  else {
    overEscanteios = "💣 Over 9.5 extremamente forte (jogo aberto)";
  }
  
  
  // ============================
  // ⚡ ALTERNATIVAS
  // ============================
  
  let alternativas = [];
  
  if (totalCartoes >= 3) {
    alternativas.push("Over cartões");
  }
  
  if (totalFinal >= 10) {
    alternativas.push("Jogo aberto para gols");
  }
  
  if (diferenca !== 0) {
    alternativas.push("Gol do time em desvantagem");
  }
  
  alternativas.push(overEscanteios);
  
  
  // ============================
  // RESULTADO FINAL
  // ============================
  
  document.getElementById("resultado").innerText =
    `
🤖 ROBÔ LN SHOW - ANÁLISE TRADER AO VIVO

⏱️ Minuto: ${tempo}
⚽ Placar: ${placarCasa} x ${placarFora}

📊 Finalizações: ${totalFinal}
🚩 Escanteios: ${totalEscanteio}
🔥 Perigo: ${totalPerigo}

📈 Probabilidade de gol: ${probGol.toFixed(1)}%

🎯 MELHOR ENTRADA:
${melhorEntrada}

🧠 CONFIANÇA: ${confianca}

🚩 OVER ESCANTEIOS:
${overEscanteios}

⚡ OUTRAS POSSIBILIDADES:
- ${alternativas.join("\n- ")}
`;
}