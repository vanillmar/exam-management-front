import { Button } from "@/components/ui/button";

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
    <div className="modal fixed inset-0 flex items-center justify-center">
      <div className="modal-card w-[92%]border border-white/10 rounded-[12px] bg-black max-w-[520px] p-5">
        <h3 className="text-xl font-bold mb-3">Finish examination</h3>
        <p>Do you really want to submit the examination?</p>
        <p className="mt-2">
          There are still {remaining} unanswered question(s) remaining.
        </p>
        <div className="row space-between mt-3">
          <Button onClick={onCancel} className="ghost">
            No
          </Button>
          <Button onClick={onConfirm} className="cta">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
