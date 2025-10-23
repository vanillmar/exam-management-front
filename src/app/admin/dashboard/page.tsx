import { Suspense, lazy } from "react";
import data from "./data.json";
import SkeletonLoader from "./skeleton-loader";

const LazySectionCards = lazy(() =>
  import("@/components/SessionCards").then((module) => ({
    default: module.SectionCards,
  })),
);
const LazyChartAreaInteractive = lazy(() =>
  import("@/components/chart-area-interactive").then((module) => ({
    default: module.ChartAreaInteractive,
  })),
);
const LazyDataTable = lazy(() =>
  import("@/components/data-table").then((module) => ({
    default: module.DataTable,
  })),
);
export default function AdminDashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Suspense fallback={<SkeletonLoader />}>
            <LazySectionCards />
            <div className="px-4 lg:px-6">
              <LazyChartAreaInteractive />
            </div>
            <LazyDataTable data={data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
