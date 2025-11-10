import React, { use } from "react";
import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("error. please refresh.");
          }
          console.log("error in getting token :", error);
        }
        return config;
      },
      (error) => {
        console.log("axios req error", error);
        return Promise.reject(error);
      }
    );
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
