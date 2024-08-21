import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';

export default function Modal({ type, onClose, onConfirm }) {
  const modalContent =
    type === 'delete'
      ? {
          image: LocalImages.ImageModalDelete,
          title: '정말 삭제를 진행하시겠어요?',
          description: '삭제 시 복구가 불가능해요',
          confirmText: '네',
        }
      : {
          image: LocalImages.ImageTtorangWithdrawal,
          title: '정말 탈퇴하시겠어요?',
          description: '탈퇴하시면 모든 정보를 잃게 돼요',
          confirmText: '네',
        };

  return (
    <>
      <div
        className="modalBlackBg"
        onClick={onClose}
      />
      <div className="modal_box modal_select">
        <div className="character_box">
          <Image
            src={modalContent.image}
            alt="ModalImage"
            width={120}
            height={120}
          />
        </div>
        <div className="selectMent_box">
          <p>{modalContent.title}</p>
          <p>{modalContent.description}</p>
        </div>
        <div className="modalBtn_area">
          <button
            type="button"
            onClick={onClose}
          >
            아니요
          </button>
          <button
            type="button"
            onClick={onConfirm}
          >
            {modalContent.confirmText}
          </button>
        </div>
      </div>
    </>
  );
}
