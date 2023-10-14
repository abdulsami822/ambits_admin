"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Profile from "@/models/profile";
// import UserTables from "./components/UsersTable";
import useSWRMutation from "swr/mutation";
import { useSearchParams, useRouter } from "next/navigation";

import { getProfileRole } from "@/utils/supabase.utils";
import {
  CREATE_PROJECT_PAGE,
  PROJECT_PAGE,
} from "@/constants/routes.constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      router.push(`/users?page=${pageIndex + 1}`);
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
        .from("profile")
        .select("*", { count: "exact" })
        .range(offset, offset + pageSize)
        .order(Profile.keyMap[sortColumn.id], { ascending: !sortColumn.desc })
        .ilike(filterColumn.id, `%${filterColumn.value}%`);
      results = data;
      totalCount = count;
    } else {
      const { data, count } = await supabase
        .from("profile")
        .select("*", { count: "exact" })
        .range(offset, offset + pageSize)
        .order(Profile.keyMap[sortColumn.id], { ascending: !sortColumn.desc });
      results = data;
      totalCount = count;
    }
    results = await Promise.all(
      results.map(async (profile) => {
        const userId = profile.user_id;
        const { data: role } = await getProfileRole({ supabase, userId });
        return { ...profile, role };
      })
    );
    return { data: Profile.fromAll(results), totalCount };
  };

  const {
    data: profileData,
    trigger,
    isMutating,
  } = useSWRMutation("profiles", onChange);

  return (
    <div>
      <div className="flex justify-end">
        <Link href={CREATE_PROJECT_PAGE}>
          <Button>Create Project</Button>
        </Link>
      </div>
      <div className="mx-auto">
        {/* <UserTables
        data={profileData?.data}
        onChange={trigger}
        totalCount={profileData?.totalCount}
        loading={isMutating}
        initialPaginationConfig={{
          pageIndex: pageIndexParam ?? 0,
        }}
      /> */}
      </div>
    </div>
  );
}
