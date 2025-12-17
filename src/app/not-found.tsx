import { buttonVariants } from '@/components/ui/button';
import { Home, Search, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          {/* Illustration */}
          <div className="relative inline-block">
            <div className="relative w-48 h-48 mx-auto mb-6">
              {/* Magnifying Glass */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-32 h-32 text-muted-foreground/20" strokeWidth={1.5} />
              </div>
              {/* Alert Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertCircle className="w-16 h-16 text-primary animate-pulse" strokeWidth={2} />
              </div>
              {/* Decorative circles */}
              <div className="absolute top-4 right-8 w-3 h-3 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
              <div className="absolute bottom-8 left-4 w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2s'}}></div>
              <div className="absolute top-12 left-12 w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '2s'}}></div>
            </div>
          </div>
          
          <div className="relative">
            <h1 className="text-[140px] font-bold text-primary/80 leading-none">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl opacity-10 bg-primary"></div>
          </div>
          
          <h2 className="text-2xl font-semibold text-foreground">
            Page not found
          </h2>
          
          <p className="text-muted-foreground leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className={buttonVariants({ size: "lg", className: "shadow-lg hover:shadow-xl transition-all duration-200" })}
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}