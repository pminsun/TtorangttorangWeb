import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

export default function Test() {
  const [highlights, setHighlights] = useState([]);

  const handleTextSelection = () => {
    const selection = window.getSelection().toString().trim();

    // 선택된 텍스트가 비어있지 않은 경우에만 추가
    if (selection && !highlights.includes(selection)) {
      setHighlights([...highlights, selection]);
    }
  };

  return (
    <div className="px-4 bg-green-100">
      <div onMouseUp={handleTextSelection}>
        <Highlighter
          highlightClassName="highlight"
          searchWords={highlights}
          autoEscape={true}
          textToHighlight="여러분. 오늘은 디자인 프로세스에서 중요한 역할을 하는 퍼소나(Persona)에 대해 이야기해보겠습니다. 퍼소나는 디자인 작업을 진행할 때 필수적인 도구 중 하나예요. 퍼소나는 우리의 제품이나 서비스를 사용할 가상의 사용자를 대표하는 캐릭터로, 실제 사용자 데이터를 기반으로 만들어집니다. 이를 통해 디자이너는 사용자 중심의 디자인을 구현할 수 있어요. 퍼소나를 만드는 과정은 다음과 같음 먼저, 사용자 리서치를 통해 목표 사용자의 행동, 동기, 요구사항 등을 파악해요. 이때 인터뷰, 설문조사, 사용성 테스트 등의 방법을 사용합니다. 수집된 데이터를 분석하여 공통된 특성과 패턴을 찾아내고, 이를 바탕으로 하나 이상의 퍼소나를 정의해요. 퍼소나는 디자인 과정에서 여러 가지 중요한 역할을 합니다. 첫째, 팀원들이 사용자에 대한 공통된 이해를 갖게 해요. 이는 의사소통을 원활하게 하고, 팀원들이 같은 방향을 바라보도록 도와줍니다. 둘째, 디자인 결정 시 사용자 관점을 유지해 사용자에게 실제로 필요한 기능과 경험을 제공할 수 있습니다. 셋째, 사용자의 요구와 목표를 구체적으로 함으로써, 디자이너가 더 창의적이고 효율적으로 문제를 해결할 수 있도록 해줘요. 예를 들어, 우리는 김지훈이라는 퍼소나를 만들 수 있습니다. 지훈은 35세의 마케팅 매니저로, 바쁜 업무 일정 속에서 효율적으"
        />
      </div>
      <p className="mt-[50px]">선택된 텍스트</p>
      <ul>
        {highlights.map((selection, index) => (
          <li key={index}>{selection}</li>
        ))}
      </ul>
    </div>
  );
}
