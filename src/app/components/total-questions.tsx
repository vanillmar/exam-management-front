"use client";
import useSWR from "swr";
import { IconTrendingUp } from "@tabler/icons-react";
import { StatCard } from "@/components/stat-card";
import { getTotalQuestions } from "@/services/questions";

const fetcher = async () => {
  const res = await getTotalQuestions();
  return res.total;
};

export default function TotalQuestions() {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "total-students",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  return (
    <StatCard
      title="Questions"
      description="Total Questions"
      value={data?.toLocaleString("en-US")}
      icon={<IconTrendingUp className="size-4" />}
      isLoading={isLoading || isValidating}
      isError={!!error}
      onRetry={() => mutate()}
    />
  );
}
