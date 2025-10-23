import { IconRefresh } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  description?: string;
  value?: string | number | null;
  trend?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export function StatCard({
  title,
  description,
  value,
  trend,
  icon,
  isLoading = false,
  isError = false,
  onRetry,
}: StatCardProps) {
  // 🟡 Loading skeleton
  if (isLoading) {
    return (
      <Card className="@container/card animate-pulse">
        <CardHeader>
          <CardDescription>{description}</CardDescription>
          <CardTitle className="h-8 w-24 bg-gray-200 rounded-md" />
          <CardAction>
            <div className="h-6 w-16 bg-gray-200 rounded-md" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="h-4 w-48 bg-gray-200 rounded-md" />
          <div className="h-3 w-32 bg-gray-200 rounded-md" />
        </CardFooter>
      </Card>
    );
  }
  if (isError) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{description}</CardDescription>
          <CardTitle className="text-xl font-semibold text-red-400">
            Error loading data
          </CardTitle>
          {onRetry && (
            <CardAction>
              <Button variant="outline" size="sm" onClick={onRetry}>
                <IconRefresh className="mr-2 h-4 w-4" />
                Tty again
              </Button>
            </CardAction>
          )}
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        {description && <CardDescription>{description}</CardDescription>}
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {title} - {value ?? "-"}
        </CardTitle>
        {trend && (
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              {icon}
              {trend}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month {icon}
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
