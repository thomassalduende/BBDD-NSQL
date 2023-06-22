export const Modal = ({ show, onHide, title, children }) => {
  return (
<div className={`fixed inset-0 flex items-center justify-center ${show ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-900 opacity-75 z-50"></div>
      <div className="bg-white rounded-lg p-8 z-50" style={{ position: 'fixed', zIndex: '999' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 ml-4"
            onClick={onHide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M11.414 10l4.293-4.293a1 1 0 0 0-1.414-1.414L10 8.586 5.707 4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 0 0 1.414-1.414L11.414 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className='grid justify-center'>{children}</div>
      </div>
    </div>
  );
};
