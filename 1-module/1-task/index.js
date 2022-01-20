function factorial(n) {
  let result = 1;
  while (n) {
    result = result * n--;
  }
  return result;
}
