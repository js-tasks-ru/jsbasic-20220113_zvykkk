function sumSalary(salaries) {
  let sum = 0;
  for (let prop in salaries) {
    let value = salaries[prop];
    if (typeof(value) == "number" && isFinite(value)) {
      sum += value;
    }
  }
  return sum;
}
