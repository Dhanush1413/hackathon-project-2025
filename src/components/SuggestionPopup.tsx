import React, { useState, useRef, useEffect } from 'react';

interface SuggestionPopupProps {
  showSuggestion: boolean;
  onClose: () => void;
  youtubeId: string;
  referenceLinks: { label: string; url: string }[];
}

const SuggestionPopup: React.FC<SuggestionPopupProps> = ({
  showSuggestion,
  onClose,
  youtubeId,
  referenceLinks,
}) => {
  const [message, setMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus inside modal for accessibility
  useEffect(() => {
    if (showSuggestion && modalRef.current) {
      const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusableEls[0]?.focus();
    }
  }, [showSuggestion]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSuggestion) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSuggestion, onClose]);

  if (!showSuggestion) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        ref={modalRef}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close suggestion popup"
        >
          &times;
        </button>
        {/* YouTube Video */}
        <div className="mb-4 aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-48 rounded"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* Message input */}
        <div className="mb-4">
          <label htmlFor="community-message" className="block text-sm font-medium text-gray-700 mb-1">
            Share your thoughts with the community:
          </label>
          <div className="flex gap-2">
            <textarea
              id="community-message"
              className="flex-1 border rounded p-2 text-sm focus:outline-none focus:ring focus:border-blue-300 resize-none"
              rows={2}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
              onClick={() => {
                // You can handle send logic here
                setMessage('');
              }}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
        {/* Reference links */}
        <div>
          <h3 className="text-sm font-semibold mb-2">External References:</h3>
          <ul className="list-disc list-inside space-y-1">
            {referenceLinks.slice(0, 5).map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuggestionPopup;
