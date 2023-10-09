export const getProfileRole = async ({ supabase, userId }) => {
  const { data, error } = await supabase.rpc("get_claim", {
    uid: userId,
    claim: "userrole",
  });
  return { data, error };
};
