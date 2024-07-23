export function cls(...classnames) {
  return classnames.join(' ');
}

// 1,000 표기
export function formatNumber(number) {
  return number.toLocaleString();
}

export const measureTextWidth = (text, font = '16px NotoSansKR') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};
