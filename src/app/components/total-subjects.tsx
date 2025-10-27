"use client";
import useSWR from "swr";
import { IconTrendingUp } from "@tabler/icons-react";
import { StatCard } from "@/components/stat-card";
import { getTotalSubjects } from "@/services/subjects";

const fetcher = async () => {
  const res = await getTotalSubjects();
  return res;
};

export default function TotalSubjects() {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "total-subjects",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  return (
    <StatCard
      title="Subjects"
      description="Total Subjects"
      value={data?.toLocaleString("en-US")}
      icon={<IconTrendingUp className="size-4" />}
      isLoading={isLoading || isValidating}
      isError={!!error}
      onRetry={() => mutate()}
    />
  );
}
