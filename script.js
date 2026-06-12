let grafico;

function tocarAlerta() {
  let audio = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
  audio.play();
}

function analisar() {
  
  let atkHome = +document.getElementById("atkHome").value || 0;
  let atkAway = +document.getElementById("atkAway").value || 0;
  
  let cornerHome = +document.getElementById("cornerHome").value || 0;
  let cornerAway = +document.getElementById("cornerAway").value || 0;
  
  let posseHome = +document.getElementById("posseHome").value || 0;
  
  let shotHome = +document.getElementById("shotHome").value || 0;
  let shotAway = +document.getElementById("shotAway").value || 0;
  
  let totalCorners = cornerHome + cornerAway;
  
  // 🔥 PRESSÃO REAL (mais refinada)
  let pressaoHome = (atkHome * 1.5) + (shotHome * 2) + posseHome;
  let pressaoAway = (atkAway * 1.5) + (shotAway * 2);
  
  let resultado = "";
  
  // 📊 GRÁFICO
  if (grafico) grafico.destroy();
  
  let ctx = document.getElementById('grafico').getContext('2d');
  
  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Casa', 'Fora'],
      datasets: [{
        label: 'Pressão',
        data: [pressaoHome, pressaoAway]
      }]
    }
  });
  
  // 🚨 ALERTA DE PRESSÃO
  if (pressaoHome > pressaoAway + 20) {
    resultado += "🔥 PRESSÃO ABSURDA CASA\n";
    resultado += "➡️ FORTE chance de escanteio IMEDIATO\n\n";
    tocarAlerta();
  }
  
  // 📈 PROBABILIDADE DE ESCANTEIOS (NÍVEL GOD)
  let probCorner = (pressaoHome + pressaoAway + totalCorners * 10) / 10;
  
  if (probCorner > 30) {
    resultado += "📊 Probabilidade ALTÍSSIMA de escanteios\n";
    resultado += "➡️ Over 9.5 / Over 10.5 MUITO forte\n\n";
  } else if (probCorner > 20) {
    resultado += "📊 Probabilidade MÉDIA de escanteios\n";
  } else {
    resultado += "📊 Jogo frio para escanteios\n";
  }
  
  // 🎯 FINALIZAÇÃO
  if (shotHome > shotAway) {
    resultado += "🎯 Casa mais perigosa\n";
  } else {
    resultado += "🎯 Fora pode surpreender\n";
  }
  
  // 🏆 VENCEDOR
  if (pressaoHome > pressaoAway) {
    resultado += "\n🏆 Tendência: CASA vencer";
  } else {
    resultado += "\n🏆 Tendência: FORA ou empate";
  }
  
  document.getElementById("saida").innerText = resultado;
}