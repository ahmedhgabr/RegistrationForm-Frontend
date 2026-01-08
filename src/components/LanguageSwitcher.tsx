import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-semibold transition ${
          language === 'en'
            ? 'bg-indigo-500 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 rounded text-sm font-semibold transition ${
          language === 'ar'
            ? 'bg-indigo-500 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        العربية
      </button>
    </div>
  );
};
