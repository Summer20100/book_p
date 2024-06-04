import { IUser } from "./IUser";

export interface IStore {
  totalPages: number,
  currentPage: number,
  pageSize: number,
  totalCount: number,
  data: IUser
}