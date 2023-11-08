import { supabase } from "../config/supabase";

export const useProduct = () => {
  const limit = 8;
  const getProduct = (type, brand, sort, page, search) => {
    const rangeFrom = (page - 1) * limit;
    const rangeTo = page * limit - 1;
    try {
      const data = supabase.from("Products").select("*", { count: "exact" });
      if (type) {
        data.eq("type", type);
      }
      if (brand) {
        data.eq("brand", brand);
      }
      if (sort !== "") {
        data.order("price", { ascending: sort });
      }
      if (page) {
        data.range(rangeFrom, rangeTo);
      }
      if (search) {
        data.ilike("name", `%${search}%`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getProductAdmin = () => {
    try {
      const data = supabase
        .from("Products")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getProductById = async (id) => {
    try {
      const data = await supabase
        .from("Products")
        .select("*", { count: "exact" })
        .eq("id", id);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getProductBrand = async () => {
    try {
      const data = await supabase.from("Products").select("brand");
      return data;
    } catch (error) {
      throw error;
    }
  };

  const postProduct = async (value) => {
    try {
      const data = await supabase.from("Products").insert([value]).select();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (value, image) => {
    const fileName = image.substring(image.lastIndexOf("/") + 1);
    try {
      const data = await supabase.from("Products").delete().eq("id", value);
      supabase.storage.from("images").remove([fileName]);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteImage = async (image) => {
    const fileName = image.substring(image.lastIndexOf("/") + 1);
    try {
      const data = supabase.storage.from("images").remove([fileName]);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (value, id) => {
    try {
      const data = await supabase.from("Products").update(value).eq("id", id);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const uploadImage = async (file) => {
    try {
      const data = await supabase.storage
        .from("images")
        .upload(`${file.name}-${Date.now()}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
      return data;
    } catch (error) {}
  };

  const getImageUrl = async (data) => {
    try {
      const fileUrl = supabase.storage.from("images").getPublicUrl(data.path);
      return fileUrl;
    } catch (error) {}
  };

  return {
    getProduct,
    getProductById,
    getProductBrand,
    postProduct,
    deleteProduct,
    updateProduct,
    uploadImage,
    getImageUrl,
    deleteImage,
    getProductAdmin,
  };
};
