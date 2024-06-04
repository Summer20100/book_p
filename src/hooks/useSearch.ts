import * as db from '../data/_secret';
import { IStore } from '../models/IStore';
import { IUser } from '../models/IUser';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface IGetUsers {
  users: IStore[],
  table: IUser[],
  error: string,
  totalPages: number
  totalCount: number
}

export function useSearch(name: string, currentPage: number): IGetUsers {
  const [users, setUsers] = useState<IStore[]>([]);
  const [table, setTable] = useState<IUser[]>([]);
  const [error, setError] = useState<any>('');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);

  const getUsers = async (): Promise<IStore[]> => {
    setError('');
    if (typeof currentPage !== "number" || !currentPage || currentPage == 0) {
      currentPage = 1;
    }
    if (currentPage > totalPages) (
      currentPage = totalPages
    )
    if (!name) {
      name = ''
    }
    try {
      const response = await axios.get(`${db.DB_URL_USERS}/search?name=${name}&page=${currentPage}`);
      if (!response.data.data) {
        setError( response.data.error );
        setUsers([]);
        setTable([]);
      } else {
        setTotalCount(response.data.totalCount);
        setTotalPages(response.data.totalPages)
        setUsers(response.data);
        setTable(response.data.data);
      }
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error fetching data:', e);
      throw error;
    }
  }

  useEffect(() => {
      getUsers();
  }, [name, currentPage])

  return { users, table, error, totalPages, totalCount }
}

