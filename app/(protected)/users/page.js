"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Profile from "@/models/profile";
import UserTables from "./components/UsersTable";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

export default function Page() {
  const supabase = createClientComponentClient();

  const onChange = async (key, { arg }) => {
    const { pagination, sorting, columnFilters } = arg;
    const { pageIndex, pageSize } = pagination;
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
        .select("*", { count: "exact", head: true })
        .range(offset, offset + pageSize)
        .order(Profile.keyMap[sortColumn.id], { ascending: !sortColumn.desc })
        .ilike(filterColumn.id, `%${filterColumn.value}%`);
      results = data;
      totalCount = count;
    } else {
      const { data, count } = await supabase
        .from("profile")
        .select("*", { count: "exact", head: true })
        .range(offset, offset + pageSize)
        .order(Profile.keyMap[sortColumn.id], { ascending: !sortColumn.desc });
      results = data;
      totalCount = count;
    }
    return { data: Profile.fromAll(results), totalCount };
  };

  const {
    data: profileData,
    trigger,
    isMutating,
  } = useSWRMutation("profiles", onChange);

  return (
    <div className="mx-auto">
      <UserTables
        data={profileData?.data}
        onChange={trigger}
        totalCount={profileData?.totalCount}
        loading={isMutating}
      />
    </div>
  );
}
