import pokeballSvg from "@/assets/pokeball.svg";
import { COUNTRIES } from "@/shared/data";

interface OnboardingScreenProps {
  onOpenMyPage: (country: string) => void;
}

function OnboardingScreen({ onOpenMyPage }: OnboardingScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-center overflow-y-auto z-50">
      <div className="flex flex-col items-center w-full p-8 max-w-md mx-auto">
        <div className="text-5xl mb-4 animate-float">
          <img
            src={pokeballSvg}
            alt="Trainers Web Plus"
            className="h-20 -mt-2 w-auto"
            draggable={false}
          />
        </div>
        <h2 className="text-lg font-extrabold text-gray-900 m-0 mb-2">
          Welcome to Trainers Web Plus!
        </h2>
        <p className="text-sm text-gray-500 m-0 mb-6 max-w-75 leading-relaxed">
          Let us help you track your Trainers Web events with ease!
        </p>

        <div className="bg-[#f7f7f7] border border-gray-200 rounded-xl p-4 w-full text-left mb-5">
          <h3 className="text-xs font-bold uppercase text-blue-600 m-0 mb-3">
            How to get started
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5 items-start">
              <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">
                1
              </span>
              <span className="text-sm text-gray-700 pt-0.5">
                Choose your region below
              </span>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">
                2
              </span>
              <span className="text-sm text-gray-700 pt-0.5">
                Log in on the official website
              </span>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">
                3
              </span>
              <span className="text-sm text-gray-700 pt-0.5">
                Visit My Page — we'll do the rest!
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 w-full max-w-md mb-5">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              className="bg-white text-gray-700 border border-gray-400 rounded-md px-2.5 py-1.5 text-xs font-semibold cursor-pointer transition-all duration-150 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900"
              onClick={() => onOpenMyPage(c.code)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnboardingScreen;
