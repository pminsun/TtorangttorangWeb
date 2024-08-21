import { cls } from '@/utils/config';

export default function ProgressBar({ currentSlide }) {
  return (
    <div className="progress_container">
      <div className="progress_barLine"></div>
      <div className={cls('progress_barLine_active', currentSlide === 1 ? 'w-[51.56vmax]' : 'w-1/2')}></div>
      <div className="page_infoList">
        <div className={cls(currentSlide === 0 ? 'on' : '')}>
          <p className={cls(currentSlide === 1 ? '!main_colorBg' : '')}>
            <span>1</span>
          </p>
          <p>발표문 교정</p>
        </div>
        <div className={cls(currentSlide === 1 ? 'on' : '')}>
          <p>
            <span>2</span>
          </p>
          <p>예상 질문 & 답변</p>
        </div>
      </div>
    </div>
  );
}
