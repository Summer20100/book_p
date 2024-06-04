import axios, { AxiosPromise, AxiosResponse } from 'axios';
import * as db from './_secret';
import { IStore } from '../models/IStore';
import { IUser } from '../models/IUser';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

interface IGetUsers {
  users: IStore[],
  table: IUser[],
  loading: boolean,
  error: string
}

export function getUsers(size: number | null): IGetUsers {
  const [users, setUsers] = useState<IStore[]>([]);
  const [table, setTable] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>('');

  // console.log(db.DB_URL_USERS);

  const getUsers = async (): Promise<IStore[] | undefined> => {
    setError('');
    setLoading(true);

    try {
      if (!size) {
        size = 50;
      }
      const res = await axios.get(`${db.DB_URL_USERS}?size=${size}`);
      if ( Object.keys(res).length === 0 && res.constructor === Object ) {
        console.log('Empty data received');
      } else {
        setUsers(res.data);
        setTable(res.data.data);
        setLoading(false);
        return res.data;
      }
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error fetching data:', e);
      setLoading(false);
      throw error;
    }
  }

  useEffect(() => {
      getUsers();
  }, [])

  return { users, table, loading, error }
}

// https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users?page=2

