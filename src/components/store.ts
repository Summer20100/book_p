import { create } from 'zustand';
import { IUser } from "../models/IUser";
import { IStore } from "../models/IStore";
import { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import * as db from '../data/_secret';

export const useUsers = create((set) => ({
  users: [],
  usersAll: [],
  table: [],
  search: [],
  loading: false,
  error: null,
  totalCount: 10,
  size: 50,
  page: 1,

  getUsers: async (size: number | null) => {
    set({ loading: true });
    try {
      set({ size: size })

      if (!size) {
        size = 50;
      }
      const res = await axios.get(`${db.DB_URL_USERS}?size=${size}`);

      if (Object.keys(res).length === 0 && res.constructor === Object) {
        console.log('Empty data received');
      } else {
        set({ users: res.data, table: res.data.data, loading: false, totalCount: res.data.totalCount });
        return res.data;
      }
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error fetching data:', e);
      set({ loading: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getUsersAll: async () => {
    try {
      const res01 = await axios.get(`${db.DB_URL_USERS}`);
      const res = await axios.get(`${db.DB_URL_USERS}?size=${res01.data.totalCount}`);
      if (Object.keys(res).length === 0 && res.constructor === Object) {
        console.log('Empty data received');
      } else {
        set({ usersAll: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error fetching data:', e);
      throw error;
    }
  },

  getUsersPag: async (page: number) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${db.DB_URL_USERS}?page=${page}`);
      if (Object.keys(res).length === 0 && res.constructor === Object) {
        console.log('Empty data received');
      } else {
        set({ users: res.data, table: res.data.data, loading: false, totalCount: res.data.totalCount });
        return res.data;
      }
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error fetching data:', e);
      set({ loading: false });
      throw error;
    }
    // console.log(page)
  },

}))

// https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users?page=<page_number>&size=<page_size>
// https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users/
// https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users/<id>
// https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users/search?name=<search_query>
// https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users/250?name_en=<...>&name_ru=<...>&position=<...>&department=<...>&location=<...>&email=<...>&internal_phone=<...>&mobile_phone=<...>&actual_location=<...>&birthday=<...>
 // https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users/<id>
