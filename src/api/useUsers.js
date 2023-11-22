import { supabase } from "../config/supabase";
import axios from "axios";

export const useUsers = () => {
  const postUser = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost/laravel8/public/api/register",
        {
          params: data,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost/laravel8/public/api/login",
        data
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { postUser, loginUser };
};
