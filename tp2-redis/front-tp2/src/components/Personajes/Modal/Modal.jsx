import './Modal.css'

export const Modal = ({ isOpen, onClose, children, title }) => {
    const modalStyle = {
      display: isOpen ? 'flex' : 'none',
    };
  
    return (
      <div className="modal" style={modalStyle}>
        <div className="modal-overlay"></div>
        <div className="modal-content">
          <div className="relative">
            <button className="modal-close" onClick={onClose}>
              X
            </button>
            <h1 className="modal-title">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    );
  };
  