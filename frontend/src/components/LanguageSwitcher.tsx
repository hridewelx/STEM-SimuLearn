import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
        <Globe className="w-5 h-5" />
        <span className="uppercase text-sm font-medium">
          {i18n.language.split("-")[0]}
        </span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
        <div className="py-1">
          <button
            onClick={() => changeLanguage("en")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
              i18n.language.startsWith("en")
                ? "text-blue-600 font-medium"
                : "text-gray-700"
            }`}
          >
            <span>English</span>
            {i18n.language.startsWith("en") && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            )}
          </button>
          <button
            onClick={() => changeLanguage("bn")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
              i18n.language.startsWith("bn")
                ? "text-blue-600 font-medium"
                : "text-gray-700"
            }`}
          >
            <span>বাংলা</span>
            {i18n.language.startsWith("bn") && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
