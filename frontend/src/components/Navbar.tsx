import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Beaker,
  Atom,
  CircuitBoard,
  Brain,
  Dna,
  Calculator,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const Logo = () => (
    <div className="flex items-center space-x-3">
      {/* Logo Icon */}
      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative w-6 h-6 grid grid-cols-2 gap-1">
          {/* STEM Icons with sequential pulse */}
          <div className="flex items-center justify-center animate-pulse">
            <Atom className="w-3 h-3 text-white" />
          </div>
          <div
            className="flex items-center justify-center animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            <Beaker className="w-3 h-3 text-yellow-300" />
          </div>
          <div
            className="flex items-center justify-center animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            <Dna className="w-3 h-3 text-cyan-300" />
          </div>
          <div
            className="flex items-center justify-center animate-pulse"
            style={{ animationDelay: "0.6s" }}
          >
            <Calculator className="w-3 h-3 text-white" />
          </div>

          {/* Circuit paths */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/40"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/40"></div>
        </div>
      </div>
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("app_title")}
        </span>
        <span className="text-xs text-gray-500 font-medium">
          The Interactive Virtual Science Lab
        </span>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Science Icons */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <a
                href="#features"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("nav.features")}
              </a>
              <Link
                to="/simulations"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("nav.simulations")}
              </Link>
              <a
                href="#subjects"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("nav.subjects")}
              </a>
              <a
                href="#resources"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t("nav.resources")}
              </a>
            </div>

            <div className="flex items-center space-x-4 ml-6">
              <LanguageSwitcher />
              <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2">
                {t("nav.signin")}
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
                {t("nav.start_learning")}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 bg-gray-600 transition-all ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-gray-600 transition-all ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-gray-600 transition-all ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 px-4">
                {[
                  {
                    icon: <Atom className="w-5 h-5" />,
                    label: t("nav.physics"),
                    color: "text-blue-500",
                  },
                  {
                    icon: <Beaker className="w-5 h-5" />,
                    label: t("nav.chemistry"),
                    color: "text-green-500",
                  },
                  {
                    icon: <Brain className="w-5 h-5" />,
                    label: t("nav.biology"),
                    color: "text-purple-500",
                  },
                  {
                    icon: <CircuitBoard className="w-5 h-5" />,
                    label: t("nav.math"),
                    color: "text-orange-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={item.color}>{item.icon}</div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <a
                  href="#features"
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t("nav.features")}
                </a>
                <Link
                  to="/simulations"
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t("nav.simulations")}
                </Link>
                <a
                  href="#subjects"
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t("nav.subjects")}
                </a>
                <a
                  href="#resources"
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t("nav.resources")}
                </a>
              </div>

              <div className="border-t border-gray-200 pt-4 px-4 space-y-3">
                <button className="w-full text-center text-sm font-medium text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  {t("nav.signin")}
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium py-2 rounded-lg hover:shadow-lg transition-all">
                  {t("nav.start_learning")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
