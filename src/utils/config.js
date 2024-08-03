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
      ' 디자인 프로세스는 체계적이고 단계적으로 진행됩니다. 먼저 요구사항을 분석하고 시장 조사를 통해 사용자 페르소나를 정의합니다. 그런 다음 브레인스토밍을 통해 다양한 아이디어를 구상하고, 와이어프레임을 작성하여 기본 구조를 시각화합니다. 이후 디지털 프로토타입을 제작해 사용자 테스트를 진행하고, 피드백을 반영하여 디자인을 개선합니다.',
  },
  {
    ask: '디자인 프로세스를 설명해 주세요. 프로젝트의 시작부터 끝까지 어떤 단계들을 거치나요?',
    answer:
      ' 디자인 프로세스는 체계적이고 단계적으로 진행됩니다. 먼저 요구사항을 분석하고 시장 조사를 통해 사용자 페르소나를 정의합니다. 그런 다음 브레인스토밍을 통해 다양한 아이디어를 구상하고, 와이어프레임을 작성하여 기본 구조를 시각화합니다. 이후 디지털 프로토타입을 제작해 사용자 테스트를 진행하고, 피드백을 반영하여 디자인을 개선합니다.',
  },
];

export const temData = {
  httpStatus: 'OK',
  message: 'OK',
  data: {
    status: {
      code: '20000',
      message: 'OK',
    },
    result: {
      message: {
        role: 'assistant',
        content:
          '1. 발표 대본\n\n안녕하세요 오늘 저는 "생활 속에서 실천할 수 있는 환경 보호 방안" 이라는 주제로 발표하고자 합니다. \n\n11월 24일부터 편의점 · 제과점 등에서 비닐봉투 사용이 금지됩니다. 카페나 음식점에서는 1회용 종이컵과 플라스틱 빨대, 젓는 막대 등을 사용할 수 없게 되는 등 1회용품 사용 제한 범위가 확대되는데요. 이러한 변화는 큰 의미가 있다고 생각합니다. 하지만 이 뿐 아니라 개인적인 의지도 매우 중요한데요. 제가 일상속에서 어떻게 환경보호를 실천하는지 말씀드리겠습니다.\n\n첫 번째로는 REFUSE 즉 일회용품 줄이기 인데요. 특히 배달음식 시킬때 일회용품 받지 않기를 선택 하고 있습니다. 두번째로는 REDUCE 로 장바구니 들고 다니기인데요. 에코백등을 항상 소지하며 다니고 있으며 세번째로는 REUSE 으로 예를 들면 계란판을 화분으로 쓰거나 부러진 립스틱을 립밤통에 넣어서 쓰고 있습니다. 네번째로는 RECYCLE로서 분리수거 철저히 하기 그리고 업사이클링 제품 쓰기이고 다섯번째로는 ROT으로서 생분해성 제품쓰기이며 실제로 커피숍에서도 PLA 빨대로 마시고 있습니다.  \n\n이런 작은 습관들이 모여 깨끗한 세상을 만들 수 있을 거라고 믿습니다. 감사합니다.\n\n2. 개선 내용\n - 구체적인 예시 추가 : (계란판을 화분으로 활용, 부러진 립스틱 립밤통에 넣어 재사용 )\n   \n3. 예상 질문 , 답변\nQ : 이미 많은 기업들에선 다양한 친환경 제품들을 출시하고 있는데 이런 제품들을 소비하는 것 만으로도 충분하지 않을까요?\nA : 물론 그런 제품들을 소비하는 것만으로도 환경 오염을 줄이는 데 기여할 수 있지만, 더욱 적극적으로 실생활에서 적용 가능한 방법들을 찾아 실천하는 것이 중요하다 생각합니다.  \nQ : 평소 텀블러를 가지고 다니는것도 일종의 환경운동이라고 볼수 있을까요 ?\nA : 네 맞습니다.텀블러를 휴대함으로써 일회용 플라스틱 컵의 사용을 줄일 수 있기 때문에 그것또한 환경 운동이라 볼 수 있습니다.',
      },
      stopReason: 'stop_before',
      inputLength: 892,
      outputLength: 424,
      aiFilter: null,
      seed: 2611519124,
    },
  },
};

export const dataT = [
  { message: { role: 'assistant', content: '1' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: '.' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: ' 발표' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: ' 대본' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: '\n' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: '안녕' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: '하세요' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: ' 오늘' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: ' 저' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
  { message: { role: 'assistant', content: '는' }, index: 0, inputLength: 892, outputLength: 1, stopReason: null },
];
