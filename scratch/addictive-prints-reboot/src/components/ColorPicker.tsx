'use client';

import { Color } from '@/lib/types';
import { motion } from 'framer-motion';

interface ColorPickerProps {
  colors: Color[];
  selected: string;
  onSelect: (hex: string) => void;
}

export function ColorPicker({ colors, selected, onSelect }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-4">
      <label className="text-on-surface font-semibold">Couleur:</label>
      <div className="flex gap-3">
        {colors.map(color => (
          <motion.button
            key={color.hex}
            onClick={() => onSelect(color.hex)}
            className={`w-12 h-12 rounded-full border-2 transition-all ${
              selected === color.hex
                ? 'border-primary scale-110'
                : 'border-outline-variant hover:border-primary'
            }`}
            style={{ backgroundColor: color.hex }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={color.label}
          />
        ))}
      </div>
    </div>
  );
}
