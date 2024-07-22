import SkeletonLoading from '@/components/SkeletonLoading';
import { useEffect, useRef, useState } from 'react';

const measureTextWidth = (text, font = '16px Arial') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

const TextareaSkeleton = () => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [lineWidths, setLineWidths] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(0); // 예상 발표 시간 상태 추가
  const textareaRef = useRef(null);
  const skeletonRef = useRef(null);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    setCharCount(newText.length);
  };
  useEffect(() => {
    const newEstimatedTime = Math.ceil(charCount / 5); // 초 단위
    setEstimatedTime(newEstimatedTime);
  }, [charCount, text]);

  const handleSubmit = () => {
    setShowSkeleton(true);
    textareaRef.current.style.opacity = '0';
    setTimeout(() => {
      setShowSkeleton(false);
      textareaRef.current.style.opacity = '1';
    }, 3000); // 3초 후에 스켈레톤 숨기기 및 textarea 글자 opacity 복구
  };

  useEffect(() => {
    const lines = text.split('\n');
    const newLineWidths = lines.map((line) => measureTextWidth(line, '16px Arial'));
    setLineWidths(newLineWidths);
  }, [text]);

  useEffect(() => {
    const handleScroll = () => {
      if (skeletonRef.current) {
        skeletonRef.current.style.top = `-${textareaRef.current.scrollTop}px`;
      }
    };

    const textarea = textareaRef.current;
    textarea.addEventListener('scroll', handleScroll);

    return () => {
      textarea.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div style={{ position: 'relative', width: '80%', height: '250px', overflow: 'hidden' }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          rows={lineWidths.length}
          style={{ width: '100%', height: '100%', padding: '10px', boxSizing: 'border-box', overflow: 'auto' }}
        />

        <div
          ref={skeletonRef}
          className="absolute top-0 left-0 w-full h-auto overflow-x-auto overflow-y-hidden p-[10px]"
          style={{ pointerEvents: 'none' }}
        >
          {showSkeleton && <SkeletonLoading lineWidths={lineWidths} />}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
      >
        제출
      </button>
      <div className="mt-[20px]">
        <p>글자 수</p>
        <p>{charCount}</p>
      </div>
      <div className="mt-[20px]">
        <p>예상 발표 시간</p>
        <p>{estimatedTime}</p>
      </div>
    </>
  );
};

export default function Test() {
  return (
    <main className="w-full flex_center h-[1000px]">
      <div style={{ position: 'relative', width: '100%', padding: '20px', backgroundColor: 'pink' }}>
        <h1>Textarea Skeleton Loader</h1>
        <TextareaSkeleton />
      </div>
    </main>
  );
}
