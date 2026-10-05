import React, { useState } from 'react';
import { Sparkles, Copy, Check, Feather, BookOpen } from 'lucide-react';
import { FLOWER_STEMS, FLORAL_SENTIMENTS } from '../data/stems';

interface FlowerMeaningsProps {
  onApplyCardMessage?: (msg: string) => void;
  onExploreCollection: () => void;
}

export const FlowerMeanings: React.FC<FlowerMeaningsProps> = ({
  onApplyCardMessage,
  onExploreCollection
}) => {
  const [selectedStemId, setSelectedStemId] = useState<string>('peony-pink');
  const [selectedSentimentTheme, setSelectedSentimentTheme] = useState<string>(FLORAL_SENTIMENTS[0].theme);
  const [recipientName, setRecipientName] = useState<string>('Geneviève');
  const [customDraft, setCustomDraft] = useState<string>(FLORAL_SENTIMENTS[0].promptIdeas[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedStem = FLOWER_STEMS.find((s) => s.id === selectedStemId) || FLOWER_STEMS[0];
  const activeSentiment = FLORAL_SENTIMENTS.find((s) => s.theme === selectedSentimentTheme) || FLORAL_SENTIMENTS[0];

  const handleCopy = () => {
    const fullText = `Dearest ${recipientName || 'Friend'},\n\n${customDraft}\n\nWith love`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="meanings" className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      {/* Header */}
      <div className="pb-8 border-b border-[#E8E3DC]">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#A84D3C] mb-2">
          Floriography & Sentiments
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#1E1C19] tracking-tight">
          The Secret Language of Flowers
        </h2>
        <p className="text-sm text-[#5F5951] mt-2 max-w-2xl">
          In Victorian Paris, bouquets were composed as coded literary letters. Every bloom, stem, 
          and color told an intricate story of affection, quiet devotion, and unspoken vows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
        {/* Left Column: Botanical Meaning Dictionary */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#24211D]">
            <BookOpen className="w-4 h-4 text-[#385544]" />
            <span>Botanical Floriography Compendium</span>
          </div>

          {/* Stem Selector Buttons */}
          <div className="flex items-center gap-2 flex-wrap pb-2">
            {FLOWER_STEMS.map((stem) => (
              <button
                key={stem.id}
                onClick={() => setSelectedStemId(stem.id)}
                className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedStemId === stem.id
                    ? 'bg-[#24211D] text-white'
                    : 'bg-[#F2ECE4] text-[#5F5951] hover:bg-[#EAE2D8]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: stem.colorHex }}
                />
                <span>{stem.name}</span>
              </button>
            ))}
          </div>

          {/* Detailed Highlight Card */}
          <div className="bg-white border border-[#E8E3DC] p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-[#F2ECE4] pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A84D3C] block mb-1">
                  {selectedStem.symbolismTag}
                </span>
                <h3 className="font-editorial text-3xl text-[#1E1C19]">
                  {selectedStem.name}
                </h3>
                <span className="text-xs text-[#7A7368] italic font-serif">
                  {selectedStem.botanicalName}
                </span>
              </div>

              <div
                className="w-12 h-12 rounded-full border border-black/10 shadow-inner flex items-center justify-center text-white"
                style={{ backgroundColor: selectedStem.colorHex }}
              >
                <Sparkles className="w-5 h-5 opacity-70" />
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#5F5951] leading-relaxed">
              <div>
                <span className="font-semibold text-[#1E1C19] block mb-0.5">Historical Symbolism:</span>
                <p className="text-[13px]">{selectedStem.meaning}</p>
              </div>

              <div>
                <span className="font-semibold text-[#1E1C19] block mb-0.5">Botanical Characteristics:</span>
                <p>{selectedStem.description}</p>
              </div>

              <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between text-xs text-[#7A7368]">
                <span>Category: <strong className="text-[#1E1C19] capitalize">{selectedStem.category}</strong></span>
                <span>Atelier Stem Price: <strong className="text-[#1E1C19]">${selectedStem.pricePerStem.toFixed(2)}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deckle-Edge Card Studio */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#24211D]">
            <Feather className="w-4 h-4 text-[#A84D3C]" />
            <span>Handwritten Sentiment Card Studio</span>
          </div>

          {/* Theme selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {FLORAL_SENTIMENTS.map((sentiment) => (
              <button
                key={sentiment.theme}
                onClick={() => {
                  setSelectedSentimentTheme(sentiment.theme);
                  setCustomDraft(sentiment.promptIdeas[0]);
                }}
                className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  selectedSentimentTheme === sentiment.theme
                    ? 'bg-[#A84D3C] text-white'
                    : 'bg-[#F2ECE4] text-[#5F5951] hover:bg-[#EAE2D8]'
                }`}
              >
                {sentiment.theme}
              </button>
            ))}
          </div>

          {/* Simulated Deckle-Edge Cotton Paper Card */}
          <div className="relative bg-[#FCFBF8] border-2 border-dashed border-[#DDD6CC] p-7 shadow-xs space-y-4">
            {/* Wax seal simulation */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#A84D3C] border-2 border-[#8A3A2C] shadow-sm flex items-center justify-center text-white text-[10px] font-serif font-bold">
              MP
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-[#8C8479] font-medium block">
                Recipient Salutation
              </label>
              <div className="flex items-center gap-2 font-serif text-lg text-[#1E1C19]">
                <span>Dearest</span>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="border-b border-[#DDD6CC] focus:border-[#24211D] focus:outline-none bg-transparent px-1 font-serif text-lg text-[#1E1C19] w-40"
                  placeholder="Recipient Name"
                />
                <span>,</span>
              </div>
            </div>

            {/* Handwritten Message Area */}
            <div className="space-y-1 pt-1">
              <label className="text-[10px] uppercase tracking-widest text-[#8C8479] font-medium block">
                Card Inscription
              </label>
              <textarea
                value={customDraft}
                onChange={(e) => setCustomDraft(e.target.value)}
                rows={4}
                className="w-full font-serif text-base sm:text-lg text-[#24211D] italic leading-relaxed bg-transparent border-0 focus:ring-0 p-0 resize-none focus:outline-none placeholder-[#A69E92]"
                placeholder="Write your note here..."
              />
            </div>

            <div className="font-serif text-base text-[#1E1C19] text-right italic pt-2">
              With all my affection,
            </div>

            {/* Suggested sentiment prompts */}
            <div className="pt-3 border-t border-[#EAE4DC] space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#8C8479] block">
                Or pick an artisan sentiment prompt:
              </span>
              <div className="space-y-1">
                {activeSentiment.promptIdeas.map((idea, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCustomDraft(idea)}
                    className="text-left text-xs text-[#5F5951] hover:text-[#A84D3C] block w-full truncate py-1 transition-colors cursor-pointer"
                  >
                    "{idea}"
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EAE4DC] flex items-center justify-between">
              <button
                onClick={handleCopy}
                className="text-xs font-medium text-[#24211D] hover:text-[#A84D3C] flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#385544]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Message'}</span>
              </button>

              {onApplyCardMessage && (
                <button
                  onClick={() => onApplyCardMessage(`Dearest ${recipientName},\n\n${customDraft}`)}
                  className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-[#24211D] text-white hover:bg-[#3E3831] transition-colors cursor-pointer"
                >
                  Use for Bouquet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
