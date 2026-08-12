import React from 'react';
import { GlobalSettings, TargetFormat } from '../types';
import { Settings, Image as ImageIcon, Sliders, Palette, Zap } from 'lucide-react';

interface ConversionControlsProps {
  settings: GlobalSettings;
  onChangeSettings: (newSettings: Partial<GlobalSettings>) => void;
  onConvertAll: () => void;
  isConverting: boolean;
  totalFiles: number;
  unconvertedCount: number;
}

export const ConversionControls: React.FC<ConversionControlsProps> = ({
  settings,
  onChangeSettings,
  onConvertAll,
  isConverting,
  totalFiles,
  unconvertedCount,
}) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm mb-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div>
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-zinc-700" />
            <span>Conversion Settings</span>
          </h3>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Configure output format &amp; quality for your images
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onConvertAll}
          disabled={isConverting || unconvertedCount === 0}
          className={`w-full md:w-auto px-6 py-3 font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm cursor-pointer ${
            unconvertedCount === 0
              ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white shadow-indigo-100'
          }`}
        >
          <Zap className={`w-4 h-4 ${isConverting ? 'animate-spin' : ''}`} />
          <span>
            {isConverting
              ? 'Converting Images...'
              : unconvertedCount === 0
              ? 'All Converted'
              : totalFiles > 1
              ? `Convert All ${totalFiles} Images`
              : 'Convert Image'}
          </span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Format Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
            Convert To
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-xl border border-zinc-200/80">
            <button
              type="button"
              onClick={() => onChangeSettings({ targetFormat: 'jpg' })}
              className={`py-2.5 px-3 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                settings.targetFormat === 'jpg'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>JPG</span>
              <span className="text-[10px] text-zinc-400 font-normal hidden sm:inline">(Standard)</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeSettings({ targetFormat: 'png' })}
              className={`py-2.5 px-3 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                settings.targetFormat === 'png'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>PNG</span>
              <span className="text-[10px] text-zinc-400 font-normal hidden sm:inline">(Lossless)</span>
            </button>
          </div>
        </div>

        {/* Format Specific Options */}
        {settings.targetFormat === 'jpg' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                JPG Quality
              </label>
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {Math.round(settings.quality * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="1.0"
              step="0.01"
              value={settings.quality}
              onChange={(e) => onChangeSettings({ quality: parseFloat(e.target.value) })}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />

            {/* Quality Presets & Transparency Fill */}
            <div className="flex items-center justify-between text-xs text-zinc-500 pt-0.5">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => onChangeSettings({ quality: 0.8 })}
                  className={`px-2 py-0.5 rounded border ${
                    Math.abs(settings.quality - 0.8) < 0.02
                      ? 'bg-zinc-900 text-white font-bold border-zinc-900'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200'
                  }`}
                >
                  80% Compact
                </button>
                <button
                  type="button"
                  onClick={() => onChangeSettings({ quality: 0.92 })}
                  className={`px-2 py-0.5 rounded border ${
                    Math.abs(settings.quality - 0.92) < 0.02
                      ? 'bg-zinc-900 text-white font-bold border-zinc-900'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200'
                  }`}
                >
                  92% High
                </button>
                <button
                  type="button"
                  onClick={() => onChangeSettings({ quality: 1.0 })}
                  className={`px-2 py-0.5 rounded border ${
                    Math.abs(settings.quality - 1.0) < 0.02
                      ? 'bg-zinc-900 text-white font-bold border-zinc-900'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200'
                  }`}
                >
                  100% Max
                </button>
              </div>

              {/* Background fill color picker for transparent WebP -> JPG */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-200">
                <Palette className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] text-zinc-500 hidden sm:inline">Fill:</span>
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => onChangeSettings({ backgroundColor: e.target.value })}
                  className="w-5 h-5 rounded cursor-pointer border border-zinc-300 p-0"
                  title="Background color for transparent WebP when converting to JPG"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
              PNG
            </div>
            <p className="text-xs text-blue-900 leading-normal font-medium">
              PNG uses <strong>lossless compression</strong>. Transparent backgrounds in original WebP images will be fully preserved in the converted output.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
