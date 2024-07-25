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

export const askListArray = [
  {
    ask: '디자인 프로세스를 설명해 주세요. 프로젝트의 시작부터 끝까지 어떤 단계들을 거치나요?',
    answer:
      '디자인 프로세스는 체계적이고 단계적으로 진행됩니다. 먼저 요구사항을 분석하고 시장 조사를 통해 사용자 페르소나를 정의합니다. 그런 다음 브레인스토밍을 통해 다양한 아이디어를 구상하고, 와이어프레임을 작성하여 기본 구조를 시각화합니다. 이후 디지털 프로토타입을 제작해 사용자 테스트를 진행하고, 피드백을 반영하여 디자인을 개선합니다.',
  },
  {
    ask: '디자인 프로세스를 설명해 주세요. 프로젝트의 시작부터 끝까지 어떤 단계들을 거치나요?',
    answer:
      '디자인 프로세스는 체계적이고 단계적으로 진행됩니다. 먼저 요구사항을 분석하고 시장 조사를 통해 사용자 페르소나를 정의합니다. 그런 다음 브레인스토밍을 통해 다양한 아이디어를 구상하고, 와이어프레임을 작성하여 기본 구조를 시각화합니다. 이후 디지털 프로토타입을 제작해 사용자 테스트를 진행하고, 피드백을 반영하여 디자인을 개선합니다.',
  },
  {
    ask: '디자인 프로세스를 설명해 주세요. 프로젝트의 시작부터 끝까지 어떤 단계들을 거치나요?',
    answer:
      '디자인 프로세스는 체계적이고 단계적으로 진행됩니다. 먼저 요구사항을 분석하고 시장 조사를 통해 사용자 페르소나를 정의합니다. 그런 다음 브레인스토밍을 통해 다양한 아이디어를 구상하고, 와이어프레임을 작성하여 기본 구조를 시각화합니다. 이후 디지털 프로토타입을 제작해 사용자 테스트를 진행하고, 피드백을 반영하여 디자인을 개선합니다.',
  },
];
