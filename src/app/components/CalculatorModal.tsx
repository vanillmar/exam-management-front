'use client';

import { useState, useRef, useEffect } from 'react';

export default function CalculatorModal({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState('0');
  const modalRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging && modalRef.current) {
        modalRef.current.style.left = `${e.clientX - offset.x}px`;
        modalRef.current.style.top = `${e.clientY - offset.y}px`;
        modalRef.current.style.transform = 'none';
      }
    };

    const handleMouseUp = () => setDragging(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setDragging(true);
    }
  };

  const handleCalc = (key: string) => {
    if (key === 'C') {
      setDisplay('0');
      return;
    }
    if (key === '=') {
      try {
        const expr = display.replace(/\^/g, '**');
        const res = Function(`"use strict"; return (${expr})`)();
        setDisplay(String(res));
      } catch {
        setDisplay('Error');
      }
      return;
    }
    setDisplay(display === '0' && /[0-9.]/.test(key) ? key : display + key);
  };

  return (
    <div className="modal fixed inset-0 bg-black/60 flex items-center justify-center">
      <div ref={modalRef} className="modal-card calculator absolute w-[92%] max-w-[520px] glass">
        <div className="calc-header bg-white/10 p-1.5 rounded-t-lg text-center font-semibold" onMouseDown={handleMouseDown}>
          Calculator
        </div>
        <input
          type="text"
          value={display}
          readOnly
          className="calc-display w-full text-2xl p-2.5 border border-white/10 bg-black/20 rounded-[1010px] text-right text-text mb-2.5"
        />
        <div className="calc-grid grid grid-cols-4 gap-2">
          {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '^', '='].map(
            (key) => (
              <button key={key} onClick={() => handleCalc(key)} className="p-2.5 border border-white/10 bg-white/6 rounded-10">
                {key}
              </button>
            )
          )}
        </div>
        <button onClick={onClose} className="cta w-full mt-2.5">
          Close
        </button>
      </div>
    </div>
  );
}