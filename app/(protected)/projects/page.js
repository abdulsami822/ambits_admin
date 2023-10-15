"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWRMutation from "swr/mutation";
import { useSearchParams, useRouter } from "next/navigation";

import {
  CREATE_PROJECT_PAGE,
  PROJECT_PAGE,
} from "@/constants/routes.constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProjectsTable from "./components/ProjectsTable";
import { ProjectBasic } from "@/models/project";
import { StorageService } from "@/services/StorageService";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageIndexParam = searchParams.get("page");
  if (!pageIndexParam) {
    router.push(`${PROJECT_PAGE}?page=1`);
  }
  const supabase = createClientComponentClient();

  const onChange = async (key, { arg }) => {
    const { pagination, sorting, columnFilters } = arg;
    const { pageIndex, pageSize } = pagination;
    if (typeof pageIndex === "number" && +pageIndexParam !== pageIndex + 1) {
      router.push(`${PROJECT_PAGE}?page=${pageIndex + 1}`);
    }
    const offset = pageIndex * pageSize;
    const sortColumn = sorting?.length
      ? sorting[0]
      : { id: "createdAt", desc: true };

    let results;
    let totalCount;
    if (columnFilters?.length) {
      const filterColumn = columnFilters[0];
      const { data, count } = await supabase
        .from("project")
        .select("*", { count: "exact" })
        .range(offset, offset + pageSize)
        .order(ProjectBasic.keyMap[sortColumn.id], {
          ascending: !sortColumn.desc,
        })
        .ilike(filterColumn.id, `%${filterColumn.value}%`);
      results = data;
      totalCount = count;
    } else {
      const { data, count } = await supabase
        .from("project")
        .select("*", { count: "exact" })
        .range(
          offset || 0,
          offset + pageSize || StorageService.getRowPerPageOption() || 5
        )
        .order(ProjectBasic.keyMap[sortColumn.id], {
          ascending: !sortColumn.desc,
        });
      results = data;
      totalCount = count;
    }

    return { data: ProjectBasic.fromAll(results), totalCount };
  };

  const {
    data: projectsData,
    trigger,
    isMutating,
  } = useSWRMutation("projects", onChange);

  return (
    <div>
      <div className="flex justify-end">
        <Link href={CREATE_PROJECT_PAGE}>
          <Button>Create Project</Button>
        </Link>
      </div>
      <div className="mx-auto">
        <ProjectsTable
          data={projectsData?.data}
          onChange={trigger}
          totalCount={projectsData?.totalCount}
          loading={isMutating}
          initialPaginationConfig={{
            pageIndex: pageIndexParam ?? 0,
          }}
        />
      </div>
    </div>
  );
}
