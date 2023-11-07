import { supabase } from "../config/supabase";

export const useUsers = () => {
  const getUser = async (name, pass) => {
    try {
      const dataName = await supabase
        .from("Admin")
        .select("*")
        .eq("name", name);
      const dataPass = await supabase
        .from("Admin")
        .select("*")
        .eq("password", pass);
      if (dataName?.data?.length !== 0 && dataPass?.data?.length !== 0) {
        return dataName?.data?.[0]?.token;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };
  return { getUser };
};
