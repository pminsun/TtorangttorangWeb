export function cls(...classnames) {
  return classnames.join(' ');
}

// 1,000 표기
export function formatNumber(number) {
  return number.toLocaleString();
}
