import { useSearchParams } from 'next/navigation';
import Topbar from '@/components/Topbar';
import ResultCards from '@/components/ResultCards';
import Link from 'next/link';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score') || '—';
  const status = searchParams.get('status') || '—';
  const correct = searchParams.get('correct') || '—';
  const time = searchParams.get('time') || '—';
  const summary = searchParams.get('summary') || 'Your examination data has been successfully submitted.';

  return (
    <div className="p-6">
      <Topbar />
      <ResultCards score={score} status={status} correct={correct} time={time} summary={summary} />
      <div className="text-center mt-4">
        <Link href="/dashboard" className="cta">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}