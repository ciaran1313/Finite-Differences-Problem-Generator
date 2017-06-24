var problem;

function displayNewProblem(){
  //setup
  problem = generateRandomFiniteDifferencesProblem(2, 5);
  var table = document.getElementById("table");

  //resets everything
  equation.innerHTML = null;
  document.getElementById("equation").style = "display:none;";
  table.innerHTML = null;
  steps.innerHTML = null;

  //writes hidden equation
  document.getElementById("equation").innerHTML = "\\[" + problem.equation.toLaTex() + "\\]";
  MathJax.Hub.Typeset();

  //draws header
  var headerRow = document.createElement("tr");
  headerRow.id = "tableHeader";
  var xheader = document.createElement("th");
  var yheader = document.createElement("th");
  xheader.innerHTML = "&emsp;x&emsp;";
  yheader.innerHTML = "&emsp;y&emsp;";
  headerRow.appendChild(xheader);
  headerRow.appendChild(yheader);
  table.appendChild(headerRow);

  //fills table
  for (i = 0; i < problem.x_values.length; i++){
    var tr = document.createElement("tr");
    tr.id = "tableRow" + String(i);
    var thx = document.createElement("th");
    var tdy = document.createElement("td");
    thx.innerHTML = String(problem.x_values[i]);
    tdy.innerHTML = String(problem.y_values[i]);
    tr.appendChild(thx);
    tr.appendChild(tdy);
    table.appendChild(tr);
  }

  //switches button
  document.getElementById("check_div").style = null;
  document.getElementById("reset_div").style = "display: none;";
}

function revealSolution(){
  //reveals
  writeSteps();
  document.getElementById("equation").style = null;
  for (i = 0; i < problem.differences.length; i++){
    document.getElementById("tableHeader").innerHTML += "<th>&emsp;&Delta;<sup>" + String(i+1) + "</sup>y&emsp;</th>";
  }
  for(i = 0; i < problem.x_values.length; i++){
    var row = document.getElementById("tableRow" + String(i));
    for (j = 0; j < problem.differences.length; j++){
      if (j < i) row.innerHTML += "<td>" + String(problem.differences[j][i-j-1]) + "</td>";
      else row.innerHTML += "<td style=\"background-color: grey;\"></td>";
    }
  }

  //switches button
  document.getElementById("check_div").style = "display: none;";
  document.getElementById("reset_div").style = null;
}
