import { SectionCards } from "@/components/SessionCards";
import { QuestionsTable } from "@/components/question-table";
import { requireRole } from "@/lib/guards";
import { Roles } from "@/types/role";

export default async function AdminDashboard() {
  await requireRole([Roles.ADMIN]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <QuestionsTable />
            {/* <ChartAreaInteractive /> */}
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
}
