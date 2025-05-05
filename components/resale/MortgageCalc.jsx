export default function MortCalc(price) {
  function CalcMonth() {
    let i = 2.5 / 100;
    let g = i / 12;
    let h = 1 + g;
    let tenn = parseInt(30 * 12);
    let powerr = Math.pow(h, tenn);
    let aa = g * powerr;
    let numm = parseFloat(price) * aa;
    let deno = powerr - 1;
    let monthh = numm / deno;
    return monthh;
  }
  return CalcMonth();
}
