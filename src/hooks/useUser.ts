import * as db from '../data/_secret';
import { IUser } from '../models/IUser';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface IGetUsers {
  users: IUser[],
  card: IUser[],
  error: string,
}

export function useUser(id: number): IGetUsers {
  const [users, setUsers] = useState<IUser[]>([]);
  const [card, setCard] = useState<IUser[]>([]);
  const [error, setError] = useState<any>('');

  const getUser = async (): Promise<IUser[]> => {
    try {
      const response = await axios.get(`${db.DB_URL_USERS}/${id}`);
      if (!response.data) {
        setError( response.data.error );
        setCard([]);
      } else {
        setError('');
        setCard(response.data);
      }
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error fetching data:', e);
      throw error;
    }
  };

  const getUsers = async (): Promise<IUser[]> => {
    try {
      const resAll = await axios.get(`${db.DB_URL_USERS}`);
      const resAllUsers = await axios.get(`${db.DB_URL_USERS}?size=${resAll.data.totalCount}`);
      if (!resAllUsers.data.data) {
        setError( resAllUsers.data.error );
        setUsers([]);
      } else {
        setError('');
        setUsers(resAllUsers.data.data);
      }
      return resAllUsers.data;
    } catch (error) {
      const e = error as AxiosError;
      console.error('Error fetching data:', e);
      throw error;
    }
  }

  useEffect(() => {
      getUser();
      getUsers();
  }, [])

  return { users, card, error }
}

