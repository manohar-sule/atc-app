import { h } from 'preact';

export const Modal = ({ onClose, title, children, isThisPreviewModal, modalSize, modalHeight }) => {
  return (
    <div class="modal" className={'modal ' + (isThisPreviewModal ? 'previewModalStyling' : '')}>
      <div className={'modal-content ' + modalSize + (modalHeight ? (' ' + modalHeight) : '')} style="margin: 0 auto">
        <header class="modal-header">
          <h6>{title}</h6>
          <a class="close" onClick={onClose}>
            x
          </a>
        </header>
        { children }
      </div>
    </div>
  );
};

export const ModalBody = ({ children, modalBodyHeight }) => {
  return (
    <section class={'modal-body ' + (modalBodyHeight ? (' ' + modalBodyHeight) : '')}>
      { children }
    </section>
  );
};

export const ModalFooter = ({ children }) => {
  return (
    <footer class="modal-footer">
      { children }
    </footer>
  );
};
