export default function AttachmentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="modal-card w-[92%] max-w-[520px] glass p-5">
        <h3 className="text-xl font-bold mb-3">Attachment</h3>
        <p>No attachment provided for this question.</p>
        <button onClick={onClose} className="cta w-full mt-3">
          Close
        </button>
      </div>
    </div>
  );
}
