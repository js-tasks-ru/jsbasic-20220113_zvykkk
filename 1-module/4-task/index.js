function checkSpam(str) {
  let strUp = str.toUpperCase();
  return strUp.includes('1xBet'.toUpperCase()) || strUp.includes('XXX');
}
