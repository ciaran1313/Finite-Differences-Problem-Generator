function randomBool(){
  return Boolean(Math.round(Math.random()));
}

function randomInt(min, max){
  return Math.round(Math.random()*(max-min) + min);
}

function htmlTerm(coefficient, degree){
  //setup
  var result = "";
  var abscoef = Math.abs(coefficient);

  //finishes if the coefficient is 0
  if (coefficient == 0) return result;

  //writes sign
  if (coefficient < 0) result = "-";
  else result = "+";

  //adds a space after the sign
  result += ' ';

  //writes coefficient
  if (abscoef != 1 || degree == 0) result += String(abscoef);

  //finishes if the degree is 0
  if (degree == 0) return result;

  //adds the variable
  result += 'x';

  //finishes if the degree is 1
  if (degree == 1) return result;

  //writes the power
  result += "<sup>" + degree + "</sup>"

  //finishes
  return result;
}

function htmlPolynomial(coefficients){
  var result = "";
  for (degree = 0; degree < coefficients.length; degree++){
    result = ' ' + htmlTerm(coefficients[degree], degree) + result;
  }
  result = result.substr(1);
  if (result[0] == '+') result = result.substr(2);
  result = "<code><i>y = " + result + "</i></code>"
  return result;
}

function Polynomial(coefficients){
  this.coefficients = coefficients;
  this.toHTML = function(){
    return htmlPolynomial(coefficients);
  }
  this.f = function(x){
    var result = 0;
    for (n = 0; n < coefficients.length; n++){
      result += coefficients[n] * Math.pow(x,n);
    }
    return result;
  }
}

function generateRandomPolynomialEquation(){
  var degree = randomInt(2,5);
  var coefficients = [];
  for(i = 0; i <= degree; i++){
    coefficients[i] = randomInt(0,10);
  }
  return new Polynomial(coefficients);
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

function Coordinate(x,y){
  this.x = x;
  this.y = y;
}

function FiniteDifferencesProblem(equation, x_values){
  this.equation = equation;
  this.x_values = x_values;
  this.y_values = x_values.map(this.equation.f);
  this.differences = [differences(this.y_values)];
  while(!isEqualList(this.differences[this.differences.length - 1])){
    this.differences.push(differences(this.differences[this.differences.length - 1]));
  }
}

function generateRandomFiniteDifferencesProblem(){
  var delta_x = randomInt(1,3);
  var x_values = [];
  for (i = -3; i <= 3; i++) x_values.push(delta_x*i);
  return new FiniteDifferencesProblem(generateRandomPolynomialEquation(), x_values);
}
