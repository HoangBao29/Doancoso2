import { supabase } from "../config/supabase";
import axios from "axios";

export const useProduct = () => {
  const limit = 8;

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

  const postProduct = async (value, token) => {
    try {
      const data = await axios.post("http://localhost/laravel8/public/api/user/product/add", value,  {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      })
      return data
    } catch (error) {
      console.log(error);
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
      // if (image1) {
      //   const fileName = image1.substring(image1.lastIndexOf("/") + 1);
      //   supabase.storage.from("images").remove([fileName]);
      // }
      // if (image2) {
      //   const fileName = image2.substring(image2.lastIndexOf("/") + 1);
      //   supabase.storage.from("images").remove([fileName]);
      // }
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

  const uploadImage = async (file) => {
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
      // if (file1) {
      //   const data = await supabase.storage
      //     .from("images")
      //     .upload(`${file1.name}-${Date.now()}`, file1);
      //   if (data) {
      //     response.image1 = data?.data?.path;
      //   }
      // }
      // if (file2) {
      //   const data = await supabase.storage
      //     .from("images")
      //     .upload(`${file2.name}-${Date.now()}`, file2);
      //   if (data) {
      //     response.image2 = data?.data?.path;
      //   }
      //}
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

  // api lay danh sach 25 product

  const getProduct = async () => {
    try {
      const data = await axios.get(
        "http://localhost/laravel8/public/api/product"
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // api lay chi tiet san pham theo id

  const getProductById = async (id) => {
    try {
      const data = await axios.get(
        `http://localhost/laravel8/public/api/product/detail/${id}`
      );
      return data;
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
