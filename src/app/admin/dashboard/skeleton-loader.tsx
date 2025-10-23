export default function SkeletonLoader() {
  return (
    <>
      {/* Skeleton for SectionCards */}
      <div className="flex flex-col gap-4 md:flex-row">
        {["card-1", "card-2", "card-3", "card-4"].map((key) => (
          <div
            key={key}
            className="flex-1 h-32 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>

      {/* Skeleton for ChartAreaInteractive */}
      <div className="px-4 lg:px-6">
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Skeleton for DataTable */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {["head-1", "head-2", "head-3", "head-4", "head-5"].map((key) => (
                <th key={key} className="px-6 py-3 bg-gray-200 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {["row-1", "row-2", "row-3", "row-4", "row-5"].map((key) => (
              <tr key={key}>
                {["cell-1", "cell-2", "cell-3", "cell-4", "cell-5"].map(
                  (cellKey) => (
                    <td key={cellKey} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
