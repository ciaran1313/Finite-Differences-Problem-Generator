function randomBool(){
  return Boolean(Math.round(Math.random()));
}

function randomInt(min, max){
  return Math.round(Math.random()*(max-min) + min);
}


function writeLaTexTerm(coefficient, variable, exponent){
    //setup
    var result;
    var abscoef = typeof(coefficient) == "number"? Math.abs(coefficient) : coefficient;

    //finishes if the coefficient is 0
    if (coefficient == 0) return "";

    //writes sign
    if (typeof(coefficient) == "number" && coefficient < 0) result = "-";
    else result = "+";

    //writes coefficient
    if (abscoef != 1 || exponent == 0) result += String(abscoef);

    //finishes if the exponent is 0
    if (exponent == 0) return result;

    //adds variable
    result += variable;

    //finishes if exponent is 1
    if (exponent == 1) return result;

    //adds the exponent
    result += "^{" + exponent + "}";

    //finishes
    return result;
}

function writeLaTexPolynomial(coefficients, x, y){
  var result = "";
  for(n = 0; n < coefficients.length; n++) result = writeLaTexTerm(coefficients[n], x, n) + result;
  if (result[0] == "+") result = result.substr(1);
  result = y + '=' + result;
  return result;
}

function Polynomial(coefficients){
  this.coefficients = coefficients;
  this.degree = coefficients.length - 1;
  this.toLaTex = function(){
    return writeLaTexPolynomial(coefficients, 'x', "f(x)");
  }
  this.f = function(x){
    var result = 0;
    for (n = 0; n < coefficients.length; n++){
      result += coefficients[n] * Math.pow(x,n);
    }
    return result;
  }
}

function generateRandomPolynomialEquation(min_degree, max_degree){
  var degree = randomInt(min_degree, max_degree);
  var coefficients = [];
  for(i = 0; i <= degree; i++){
    coefficients[i] = randomInt(-10, 10);
  }
  if (coefficients[degree] == 0) return generateRandomPolynomialEquation();
  else return new Polynomial(coefficients);
}

function differences(ns){
  var result = [];
  for (i = 0; i+1 < ns.length; i++){
    result.push(ns[i+1] - ns[i]);
  }
  return result;
}

function isEqualList(list){
  for (i = 1; i < list.length; i++){
    if (list[0] != list[i]) return false;
  }
  return true;
}

function FiniteDifferencesProblem(equation, delta_x){
  this.equation = equation;
  this.delta_x = delta_x;
  this.x_values = [];
  for (i = -3; i <= 3; i++) this.x_values.push(delta_x*i);
  this.y_values = this.x_values.map(this.equation.f);
  this.differences = [differences(this.y_values)];
  while(!isEqualList(this.differences[this.differences.length - 1])){
    this.differences.push(differences(this.differences[this.differences.length - 1]));
  }
}

function generateRandomFiniteDifferencesProblem(min_degree, max_degree){
  var delta_x = randomInt(1,3);
  return new FiniteDifferencesProblem(generateRandomPolynomialEquation(min_degree, max_degree), delta_x);
}
