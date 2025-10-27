"use client";
import useSWR from "swr";
import { IconTrendingUp } from "@tabler/icons-react";
import { StatCard } from "@/components/stat-card";
import { getTotalUsers } from "@/services/user";

const fetcher = async () => {
  const res = await getTotalUsers();
  return res.total;
};

export default function TotalUsers() {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "total-users",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  return (
    <StatCard
      title="Users"
      description="Total Users"
      value={data?.toLocaleString("en-US")}
      icon={<IconTrendingUp className="size-4" />}
      isLoading={isLoading || isValidating}
      isError={!!error}
      onRetry={() => mutate()}
    />
  );
}
