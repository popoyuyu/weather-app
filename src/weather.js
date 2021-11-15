export function kelvinConv(k) {
  let fahrenheit;
  fahrenheit = Math.floor(9 / 5(k - 273) + 32);
  return fahrenheit;
}

export function checkInput() {
  if (this.status !== 200) {
    return new TypeError("Not a valid location!");
  } else {
    return true;
  }
}

