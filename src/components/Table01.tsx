import { useState, useEffect, FC } from "react";
import axios from "axios";
import { useSearch } from "../hooks/useSearch";

import { Search } from "./Search";

import { IUser } from "../models/IUser";
import { IStore } from "../models/IStore";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const Table: FC = () => {
  const { mediaQuery } = useMediaQuery();
  // const { users: usersSearch, table: tableSearch, error: errorSearch } = useSearch(name, currentPage);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [items, setItems] = useState<IUser[]>();

  // const [search, setSearch] = useState<IUser[]>(tableSearch);
  const [name, setName] = useState<string>('');
  const { users: usersSearch, table: tableSearch, error: errorSearch } = useSearch(name, 1);
  const [search, setSearch] = useState<IUser[]>([]);

  console.log("tableSearch >>>", tableSearch)

  const onInput = (e: any) => {
    setName(e);
    // searchUser(e, currentPage)
  }

  const searchHandler = (e: any) => {
    e.preventDefault();
    console.log(e.target.value)
  } 

  const searchUser = async (name: string, page: number) => {
    console.log("name >>>", name)
    // if (!name) {
    //   await axios.get(`https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users?page=${page}`)
    //   .then(data => {
    //     if (!search) {
    //       setItems(data.data.data);
    //     } else {
    //       setCurrentPage(prev => prev + 1);
    //       setSearch([...search, ...data.data.data]);
    //     }
    //   })
    //   .finally(() => setFetching(false))
    // } else {
      // console.log("name >>>", name)
    
      await axios.get(`https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users/search?name=${name}&page=${page}`)
      .then(data => {
        setCurrentPage(prev => prev + 1);
        setSearch([...(search || []), ...(data.data.data || [])]);
      })
      .finally(() => setFetching(false))
    // }
  }

  useEffect(() => {
    console.log(fetching)
    if (fetching) {
      console.log("name >>>", name)
      searchUser(name, currentPage)
    }
  }, [fetching]);

  useEffect(() => {
    console.log("name >>>", name)
    searchUser(name, currentPage)
  }, [name, fetching]);

  
  console.log("name>>>>", name)
  console.log("currentPage>>>>", currentPage)
  console.log("search>>>>", search)

  
  // console.log(items)

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 250) {
      // setCurrentPage(prev => prev + 1);
      setFetching(true);
      // setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  // SEARCH


  // const searchUsers = (search: string) => {
  //   return usersAll.filter((user: IUser) =>
  //     user.name_en.toLowerCase().includes(search.toLowerCase()) || user.name_ru.toLowerCase().includes(search.toLowerCase())
  //   )
  // }

  return (
    <>
      <input type="text" value={name} onChange={(e) => onInput(e.target.value)} />
      {/* <Search onInput={onInput} searchHandler={searchHandler} /> */}

      <table className="table table-sm table-hover table-dark table-striped table-bordered table-fixed text-center" style={{ fontSize: 12, textAlign: 'center' }}>
        <thead>
          <tr>
            {(mediaQuery === "Small" || mediaQuery === "Extra small") &&
              <>
                <th scope="col">User name (en)</th>
                <th scope="col">Мобильный телефон</th>
              </>
            }

            {(mediaQuery === "Medium") &&
              <>
                <th scope="col">User name (en)</th>
                <th scope="col">Имя</th>
                <th scope="col">Должность</th>
                <th scope="col">E-mail</th>
                <th scope="col">Мобильный телефон</th>
              </>
            }

            {(mediaQuery === "Large") &&
              <>
                <th scope="col">User name (en)</th>
                <th scope="col">Имя</th>
                <th scope="col">Должность</th>
                <th scope="col">Отдел</th>
                <th scope="col">E-mail</th>
                <th scope="col">Мобильный телефон</th>
              </>
            }

            {(mediaQuery === "X-Large") &&
              <>
                <th scope="col">User name (en)</th>
                <th scope="col">Имя</th>
                <th scope="col">Должность</th>
                <th scope="col">Отдел</th>
                <th scope="col">Локация</th>
                <th scope="col">E-mail</th>
                <th scope="col">Внутренний телефон</th>
                <th scope="col">Мобильный телефон</th>
                <th scope="col">Фактическое расположение</th>
              </>
            }

            {(mediaQuery === "XX-Large") &&
              <>
                <th scope="col">User name (en)</th>
                <th scope="col">Имя</th>
                <th scope="col">Должность</th>
                <th scope="col">Отдел</th>
                <th scope="col">Локация</th>
                <th scope="col">E-mail</th>
                <th scope="col">Внутренний телефон</th>
                <th scope="col">Мобильный телефон</th>
                <th scope="col">Фактическое расположение</th>
                <th scope="col">День Рождения</th>
              </>
            }
          </tr>
        </thead>
        <tbody className="table-group-divider" >
          {
            //search && Array.isArray(search) && search.map((user: IUser, index: number) => (
            // users(offset) && Array.isArray(users(offset)) && users(offset).map((user: IUser, index: number) => (
            // search.map((user: IUser, index: number) => (
            tableSearch.map((user: IUser, index: number) => (
              <tr key={index + 1}>
                {(mediaQuery === "Small" || mediaQuery === "Extra small") &&
                  <>
                    <td>{user.name_en}</td>
                    <td>{user.mobile_phone}</td>
                  </>
                }

                {(mediaQuery === "Medium") &&
                  <>
                    <td>{user.name_en}</td>
                    <td>{user.name_ru}</td>
                    <td>{user.position}</td>
                    <td>{user.email}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{user.mobile_phone}</td>
                  </>
                }

                {(mediaQuery === "Large") &&
                  <>
                    <td>{user.name_en}</td>
                    <td>{user.name_ru}</td>
                    <td>{user.position}</td>
                    <td>{user.department}</td>
                    <td>{user.email}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{user.mobile_phone}</td>
                  </>
                }

                {(mediaQuery === "X-Large") &&
                  <>
                    <td>{user.name_en}</td>
                    <td>{user.name_ru}</td>
                    <td>{user.position}</td>
                    <td>{user.department}</td>
                    <td>{user.location}</td>
                    <td>{user.email}</td>
                    <td>{user.internal_phone}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{user.mobile_phone}</td>
                    <td>{user.actual_location}</td>
                  </>
                }

                {(mediaQuery === "XX-Large") &&
                  <>
                    <td>{user.name_en}</td>
                    <td>{user.name_ru}</td>
                    <td>{user.position}</td>
                    <td>{user.department}</td>
                    <td>{user.location}</td>
                    <td>{user.email}</td>
                    <td>{user.internal_phone}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{user.mobile_phone}</td>
                    <td>{user.actual_location}</td>
                    <td>{user.birthday}</td>
                  </>
                }
              </tr>
            ))
          }
        </tbody>
      </table>

    </>

  )
}
