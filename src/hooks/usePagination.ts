import * as db from '../data/_secret';
import { IStore } from '../models/IStore';
import { IUser } from '../models/IUser';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface IGetUsers {
  users: IStore[],
  table: IUser[],
  error: string
}

export function usePagination(page: number): IGetUsers {
  const [users, setUsers] = useState<IStore[]>([]);
  const [table, setTable] = useState<IUser[]>([])
  const [error, setError] = useState<any>('');

  const getUsers = async (): Promise<IStore[] | undefined> => {
    setError('');
    try {
      // if (!page) {
      //   page = 1;
      // }
      const res = await axios.get(`${db.DB_URL_USERS}?page=${page}`);
      if ( Object.keys(res).length === 0 && res.constructor === Object ) {
        console.log('Empty data received');
      } else {
        setUsers(res.data);
        setTable(res.data.data);
        return res.data;
      }
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error fetching data:', e);
      throw error;
    }
  }

  useEffect(() => {
      getUsers();
  }, [])

  return { users, table, error }
}

// https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users?page=2

