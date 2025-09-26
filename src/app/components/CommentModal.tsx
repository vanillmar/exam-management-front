'use client';

import { useState } from 'react';

interface CommentModalProps {
  comment: string;
  onSave: (comment: string) => void;
  onClose: () => void;
}

export default function CommentModal({ comment, onSave, onClose }: CommentModalProps) {
  const [text, setText] = useState(comment);

  return (
    <div className="modal fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="modal-card w-[92%] max-w-[520px] glass p-5">
        <h3 className="text-xl font-bold mb-3">Add a comment</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-white/8 border border-white/12 rounded-10 p-2.5 text-text"
          rows={4}
        />
        <div className="row space-between mt-3">
          <button onClick={onClose} className="ghost">
            Cancel
          </button>
          <button onClick={() => onSave(text)} className="cta">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}