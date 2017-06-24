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
