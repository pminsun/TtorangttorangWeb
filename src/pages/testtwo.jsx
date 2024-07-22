import SkeletonLoading from '@/components/SkeletonLoading';
import { useEffect, useRef, useState } from 'react';
import { diffWords } from 'diff';

export default function TestTwo() {
  const highlightDiffs = (oldStr, newStr) => {
    const diff = diffWords(oldStr, newStr);
    return diff.map((part, index) => {
      if (part.added) {
        return (
          <span
            key={index}
            style={{ backgroundColor: 'lightgreen' }}
          >
            {part.value}
          </span>
        );
      }
      // if (part.removed) {
      //   return (
      //     <span
      //       key={index}
      //       style={{ backgroundColor: 'salmon' }}
      //     >
      //       {part.value}
      //     </span>
      //   );
      // }
      // return <span key={index}>{part.value}</span>;
      if (!part.removed) {
        return <span key={index}>{part.value}</span>;
      }
      return null;
    });
  };

  // const highlightDiffs = (oldStr, newStr) => {
  //   const diff = diffWords(oldStr, newStr);
  //   return diff
  //     .map((part) => {
  //       if (part.added) {
  //         return `/${part.value}/`; // 추가된 부분을 슬래시로 감쌈
  //       }
  //       if (!part.removed) {
  //         return part.value;
  //       }
  //       return ''; // 제거된 부분은 빈 문자열 반환
  //     })
  //     .join('');
  // };
  const [originalText, setOriginalText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [highlightedText, setHighlightedText] = useState(null);

  const txt =
    '스마트 홈 기술의 현재와 미래에 대해 이야기하겠습니다. 스마트 홈 기술은 우리 일상생활을 혁신적으로 변화시키고 있습니다. 이제는 단순히 가전제품을 원격으로 조작하는 것을 넘어서, 집 전체를 자동화하는 수준에 이르렀습니다. 가장 일반적인 예로는 스마트 스피커를 들 수 있습니다. 아마존의 에코나 구글 홈 같은 제품들은 음성 명령을 통해 음악을 재생하고, 날씨 정보를 제공하며, 집 안의 다른 스마트 기기를 제어할 수도 있습니다. 스마트 조명 시스템은 사용자의 생활 패턴에 맞춰 자동으로 밝기를 조절하고, 색상을 변경할 수 있어 에너지 절약에도 큰 도움이 됩니다. 보안 측면에서도 스마트 홈 기술은 크게 발전했습니다. 스마트 도어벨과 CCTV는 실시간으로 집 주변을 모니터링하며, 이상 상황 발생 시 즉시 알림을 받습니다. 이런 시스템은 외부 침입을 방지하고, 사용자에게 심리적 안정을 제공하는 데 큰 역할을 합니다. 앞으로의 스마트 홈은 더욱 개인화되고 통합된 시스템을 갖출 예정입니다. 인공지능이 더욱 발전하면서 사용자의 습관과 취향을 학습해 최적화된 환경을 제공하게 될 것입니다. 예를 들어, AI가 사용자의 일정을 파악하여 아침에 자동으로 커피를 준비하고, 퇴근 시간에 맞춰 집 안의 온도를 적절히 조절하는 등의 서비스가 가능해질 것입니다. 사물인터넷(IoT)의 발전으로 모든 가전제품이 서로 연결되어 중앙에서 통합 관리될 수 있는 스마트 홈 허브가 등장할 것입니다. 사용자는 하나의 앱이나 디바이스로 집 안의 모든 기기를 제어할 수 있게 되어 편리함이 극대화될 것입니다. 스마트 홈 기술은 우리의 생활을 더욱 편리하고 안전하게 만들고 있습니다.';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assume correctedText is obtained from some correction service
    setCorrectedText(txt);
    setHighlightedText(highlightDiffs(originalText, correctedText));
  };

  return (
    <main className="w-full flex_center h-[1000px] bg-gray-200">
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            rows="4"
            cols="50"
          />
          <button type="submit">Submit</button>
        </form>
        {highlightedText && (
          <div className="w-[500px] h-[500px]">
            <h2>교정된 결과:</h2>
            <div>{highlightedText}</div>

            {/* <textarea
              value={highlightedText} // 강조된 텍스트를 텍스트 영역에 표시
              readOnly
              rows="4"
              cols="50"
              className="h-full"
            /> */}
          </div>
        )}
      </div>
    </main>
  );
}
