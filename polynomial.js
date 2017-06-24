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
