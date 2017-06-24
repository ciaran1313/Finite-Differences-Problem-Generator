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
