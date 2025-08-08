import React from 'react';
import SuggestionPopup from './SuggestionPopup';

const referenceLinks = [
  { label: 'UN Environment Programme', url: 'https://www.unep.org/' },
  { label: 'EPA Waste Management', url: 'https://www.epa.gov/smm/sustainable-management-materials' },
  { label: 'World Wildlife Fund', url: 'https://www.worldwildlife.org/' },
  { label: 'National Geographic', url: 'https://www.nationalgeographic.com/environment/' },
  { label: 'Greenpeace', url: 'https://www.greenpeace.org/' },
];

const SuggestionPage: React.FC<{ showSuggestion: boolean; onClose: () => void }> = ({ showSuggestion, onClose }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SuggestionPopup
        showSuggestion={showSuggestion}
        onClose={onClose}
        youtubeId="dQw4w9WgXcQ"
        referenceLinks={referenceLinks}
      />
    </div>
  );
};

export default SuggestionPage;
