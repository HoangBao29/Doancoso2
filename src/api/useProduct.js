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

  const getProductBrand = async (filter) => {
    if (filter === undefined) {
      filter = "";
    }
    try {
      const data = await supabase
        .from("Products")
        .select("brand")
        .ilike("type", `%${filter}%`);
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

  const deleteProduct = async (value) => {
    try {
      const data = await supabase.from("Products").delete().eq("id", value);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteImage = async (image, image1, image2) => {
    try {
      if (image) {
        const fileName = image.substring(image.lastIndexOf("/") + 1);
        supabase.storage.from("images").remove([fileName]);
      }
      if (image1) {
        const fileName = image1.substring(image1.lastIndexOf("/") + 1);
        supabase.storage.from("images").remove([fileName]);
      }
      if (image2) {
        const fileName = image2.substring(image2.lastIndexOf("/") + 1);
        supabase.storage.from("images").remove([fileName]);
      }
    } catch (error) {}
    // }
  };

  const updateProduct = async (value, id) => {
    try {
      const data = await supabase.from("Products").update(value).eq("id", id);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const uploadImage = async (file, file1, file2) => {
    try {
      const response = {};

      if (file) {
        const data = await supabase.storage
          .from("images")
          .upload(`${file.name}-${Date.now()}`, file);
        if (data) {
          response.image = data?.data?.path;
        }
      }
      if (file1) {
        const data = await supabase.storage
          .from("images")
          .upload(`${file1.name}-${Date.now()}`, file1);
        if (data) {
          response.image1 = data?.data?.path;
        }
      }
      if (file2) {
        const data = await supabase.storage
          .from("images")
          .upload(`${file2.name}-${Date.now()}`, file2);
        if (data) {
          response.image2 = data?.data?.path;
        }
      }
      return response;
    } catch (error) {}
  };

  const getImageUrl = async (data) => {
    const response = {};
    try {
      if (data?.hasOwnProperty("image")) {
        const fileUrl = supabase.storage
          .from("images")
          .getPublicUrl(data.image);
        response.url = fileUrl;
      }
      if (data?.hasOwnProperty("image1")) {
        const fileUrl = supabase.storage
          .from("images")
          .getPublicUrl(data.image1);
        response.url1 = fileUrl;
      }
      if (data?.hasOwnProperty("image2")) {
        const fileUrl = supabase.storage
          .from("images")
          .getPublicUrl(data.image2);
        response.url2 = fileUrl;
      }
      return response;
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
