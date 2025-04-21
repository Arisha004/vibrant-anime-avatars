
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarPartOption {
  id: string;
  name: string;
  imageUrl: string;
}

interface AvatarPartSelectorProps {
  label: string;
  options: AvatarPartOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const AvatarPartSelector = ({
  label,
  options,
  selectedId,
  onSelect,
}: AvatarPartSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-purple-700">{label}</h3>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
              selectedId === option.id
                ? "border-purple-500 ring-2 ring-purple-300 scale-105"
                : "border-transparent hover:border-purple-300"
            )}
          >
            <div className="w-full h-full flex items-center justify-center bg-white">
              <img
                src={option.imageUrl}
                alt={option.name}
                className="max-w-full max-h-full object-contain p-1"
                onError={(e) => {
                  console.log(`Failed to load image: ${option.imageUrl}`);
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://i.imgur.com/NZAMM2Z.png'; // Fallback image
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-sm font-medium bg-purple-600/80 px-2 py-1 rounded">{option.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarPartSelector;
