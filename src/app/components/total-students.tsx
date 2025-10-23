"use client";
import useSWR from "swr";
import { IconTrendingUp } from "@tabler/icons-react";
import { getTotalActiveStudents } from "@/services/students";
import { StatCard } from "@/components/stat-card";

const fetcher = async () => {
  const res = await getTotalActiveStudents();
  return res.total;
};

export default function TotalStudents() {
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
      title="Active Students"
      description="Total Active Students"
      value={data?.toLocaleString("en-US")}
      icon={<IconTrendingUp className="size-4" />}
      isLoading={isLoading || isValidating}
      isError={!!error}
      onRetry={() => mutate()}
    />
  );
}
