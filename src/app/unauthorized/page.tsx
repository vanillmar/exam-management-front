import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="max-w-md w-full text-center shadow-lg p-6">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Unauthorized access.
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-6">
            You do not have privileges to access the requested page.
          </p>

          <div className="flex justify-center gap-3">
            <Button asChild variant="outline">
              <Link href="/">Return to main page</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
