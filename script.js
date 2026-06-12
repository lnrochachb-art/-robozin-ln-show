function analisar() {
  
  let tempo = +document.getElementById("tempo").value || 0;
  
  // CASA
  let fC = +document.getElementById("finalCasa").value || 0;
  let gC = +document.getElementById("golCasa").value || 0;
  let eC = +document.getElementById("escanteioCasa").value || 0;
  let aC = +document.getElementById("ataqueCasa").value || 0;
  let pC = +document.getElementById("perigoCasa").value || 0;
  let posC = +document.getElementById("posseCasa").value || 0;
  let cC = +document.getElementById("cartaoCasa").value || 0;
  
  // FORA
  let fF = +document.getElementById("finalFora").value || 0;
  let gF = +document.getElementById("golFora").value || 0;
  let eF = +document.getElementById("escanteioFora").value || 0;
  let aF = +document.getElementById("ataqueFora").value || 0;
  let pF = +document.getElementById("perigoFora").value || 0;
  let posF = +document.getElementById("posseFora").value || 0;
  let cF = +document.getElementById("cartaoFora").value || 0;
  
  // 🔢 SCORE INTELIGENTE
  function score(f, g, e, a, p, pos, c) {
    return (f * 2) + (g * 4) + (e * 1.8) + (a * 1.2) + (p * 2.8) + (pos * 0.7) - (c * 1.5);
  }
  
  let casa = score(fC, gC, eC, aC, pC, posC, cC);
  let fora = score(fF, gF, eF, aF, pF, posF, cF);
  
  // ⏱️ PESO DO TEMPO
  let fator = tempo < 30 ? 0.8 : tempo < 70 ? 1 : 1.4;
  
  casa *= fator;
  fora *= fator;
  
  let total = casa + fora || 1;
  
  // 📊 PROBABILIDADES
  let probCasa = (casa / total) * 100;
  let probFora = (fora / total) * 100;
  let probEmpate = 100 - (probCasa + probFora);
  
  // 🏆 MELHOR ENTRADA
  let melhor = probCasa > probFora ? "BACK CASA 🏠" : "BACK FORA ✈️";
  let conf = Math.max(probCasa, probFora);
  
  // ⚽ ANÁLISE DE GOLS
  let intensidade = gC + gF + pC + pF;
  
  let over05 = intensidade > 20 ? 75 : 60;
  let over15 = intensidade > 25 ? 70 : 55;
  let golImediato = intensidade > 30 && tempo > 70 ? 80 : 60;
  
  // 📊 ESCANTEIOS
  let escTotal = eC + eF;
  
  let over95 = escTotal >= 9 ? 70 : 55;
  let over105 = escTotal >= 10 ? 65 : 50;
  
  // 🎨 COR DINÂMICA
  let cor = conf > 75 ? "lime" : conf > 65 ? "orange" : "red";
  
  // 🔔 ALERTA
  if (conf > 75) {
    alert("🔥 ENTRADA MUITO FORTE DETECTADA!");
  }
  
  // 🧠 LEITURA DO JOGO
  let leitura = "";
  
  if (tempo > 75) {
    leitura += "⏱️ Final de jogo (pressão alta)<br>";
  }
  
  if (cC + cF > 5) {
    leitura += "🟥 Jogo quente (muitos cartões)<br>";
  } else {
    leitura += "🟢 Jogo controlado<br>";
  }
  
  if (intensidade > 25) {
    leitura += "🔥 Alta chance de gol";
  } else {
    leitura += "⚖️ Jogo equilibrado";
  }
  
  // 🖥️ RESULTADO VISUAL
  document.getElementById("resultado").innerHTML = `

<div style="text-align:left; padding:15px">

<h2 style="color:${cor}">🔥 MELHOR ENTRADA</h2>
<p><b>${melhor}</b><br>📊 Confiança: ${conf.toFixed(1)}%</p>

<hr>

<h3>⚽ GOLS</h3>
<p>Over 0.5 → ${over05}%</p>
<p>Over 1.5 → ${over15}%</p>
<p>⚡ Gol iminente → ${golImediato}%</p>

<hr>

<h3>📊 ESCANTEIOS</h3>
<p>Over 9.5 → ${over95}%</p>
<p>Over 10.5 → ${over105}%</p>

<hr>

<h3>🏆 RESULTADO FINAL</h3>
<p>🏠 Casa → ${probCasa.toFixed(1)}%</p>
<p>🤝 Empate → ${probEmpate.toFixed(1)}%</p>
<p>✈️ Fora → ${probFora.toFixed(1)}%</p>

<hr>

<h3>🧠 LEITURA DO JOGO</h3>
<p>${leitura}</p>

</div>
`;
}