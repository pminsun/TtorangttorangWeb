import SkeletonLoading from '@/components/SkeletonLoading';
import { useEffect, useRef, useState } from 'react';
import { diffWords } from 'diff';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

const testTxt =
  "안녕하세요, 여러분. 오늘은 디자인 프로세스에서 중요한 역할을 하는 퍼소나(Persona)에 대해 이야기해보겠습니다. 퍼소나는 디자인 작업을 진행할 때 필수적인 도구 중 하나예요. 퍼소나는 우리의 제품이나 서비스를 사용할 가상의 사용자를 대표하는 캐릭터로, 실제 사용자 데이터를 기반으로 만들어집니다. 이를 통해 디자이너는 사용자 중심의 디자인을 구현할 수 있어요. 퍼소나를 만드는 과정은 다음과 같습니다. 먼저, 사용자 리서치를 통해 목표 사용자의 행동, 동기, 요구사항 등을 파악해요. 이때 인터뷰, 설문조사, 사용성 테스트 등의 방법을 사용합니다. 수집된 데이터를 분석하여 공통된 특성과 패턴을 찾아내고, 이를 바탕으로 하나 이상의 퍼소나를 정의해요.퍼소나는 예를 들어, 우리의 목표 사용자가 30대 직장인이라면, 그들의 하루 일과, 주요 관심사, 직장에서 겪는 문제점 등을 자세히 기록하는 편이에요. 퍼소나는 디자인 과정에서 여러 가지 중요한 역할을 합니다. 첫째, 팀원들이 사용자에 대한 공통된 이해를 갖게 해요. 이는 의사소통을 원활하게 하고, 팀원들이 같은 방향을 바라보도록 도와줍니다. 둘째, 디자인 결정 시 사용자 관점을 유지해 사용자에게 실제로 필요한 기능과 경험을 제공할 수 있습니다. 셋째, 사용자의 요구와 목표를 구체적으로 함으로써, 디자이너가 더 창의적이고 효율적으로 문제를 해결할 수 있도록 해줘요. 예를 들어, 우리는 '김지훈'이라는 퍼소나를 만들 수 있습니다. 지훈은 35세의 마케팅 매니저로, 바쁜 업무 일정 속에서 효율적으";

export default function TestTwo() {
  const [originalText, setOriginalText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [highlightedText, setHighlightedText] = useState([]);

  const highlightDiffs = (oldStr, newStr) => {
    const diff = diffWords(oldStr, newStr);
    const highlights = [];

    diff
      .map((part) => {
        if (part.added) {
          highlights.push(part.value.trim());
        }
        if (!part.removed) {
          return part.value;
        }
      })
      .join('');

    setHighlightedText(highlights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    highlightDiffs(originalText, correctedText);
    setCorrectedText(testTxt);
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
            className="w-[700px] h-[300px]"
          />
          <button type="submit">Submit</button>
        </form>
        {highlightedText.length > 0 && (
          <div className="w-[700px] h-[500px]">
            <h2>교정된 결과:</h2>

            <div>
              <HighlightWithinTextarea
                highlight={highlightedText}
                value={correctedText}
                onChange={(value) => setCorrectedText(value)}
                className="text-red"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
