function randomBool(){
  return Boolean(Math.round(Math.random()));
}

function randomInt(min, max){
  return Math.round(Math.random()*(max-min) + min);
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

function generateRandomFiniteDifferencesProblem(min_degree, max_degree){
  var delta_x = randomInt(1,3);
  return new FiniteDifferencesProblem(generateRandomPolynomialEquation(min_degree, max_degree), delta_x);
}
