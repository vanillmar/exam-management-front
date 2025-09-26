export default function FinishModal({
  remaining,
  onCancel,
  onConfirm,
}: {
  remaining: number;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="modal fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="modal-card w-[92%] max-w-[520px] glass p-5">
        <h3 className="text-xl font-bold mb-3">Finish examination</h3>
        <p>Do you really want to submit the examination?</p>
        <p className="mt-2">There are still {remaining} unanswered question(s) remaining.</p>
        <div className="row space-between mt-3">
          <button onClick={onCancel} className="ghost">
            No
          </button>
          <button onClick={onConfirm} className="cta">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}