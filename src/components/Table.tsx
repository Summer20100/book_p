import { useState, useEffect, FC, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search } from "./Search";
import { IUser } from "../models/IUser";
import { useMediaQuery } from "../hooks/useMediaQuery";
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useSearch } from "../hooks/useSearch";



export const Table: FC = () => {
  const { mediaQuery, heigthPage } = useMediaQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [search, setSearch] = useState<IUser[]>([]);
  const [error, setError] = useState<string>('');
  const [fetch, setFetch] = useState<boolean>(true);
  const alert = useRef<HTMLDivElement>(null);
  // const [qqq, setQqq] = useState<string>('');

  // const nameForSearch = (trewq: string) => {
  //   return trewq
  // }

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     const myArray = nameForSearch(name);
  //     setQqq(myArray);
  //   }, 1000);
  //   return () => clearTimeout(debounce);
  // }, [name])

  // const [phone, setPhone] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  // useEffect(() => {
  //   user.mobile_phone ? setPhone(`tel:+${user.mobile_phone.replace(/\W|_/g, '')}`) : setPhone('');
  //   user.email ? setEmail(`mailto:${user.email}`) : setEmail('');
  // }, [user.mobile_phone]) 
  
  const onInput = (e: any) => {
    setName(e.target.value);
    setSearch([]);
    setCurrentPage(1);
    setFetching(true);
  }

  const searchHandler = (e: any) => {
    setSearch([]);
    setName('');
    setCurrentPage(1);
    setFetching(true);
  }

  const searchUser = async (name: string, page: number) => {
    if (page > totalPages) {
      page = totalPages
    }
    setFetch(true);
    await axios.get(`https://backend-x9gt.onrender.com/75ad4124-e29d-4925-904b-a96bb9c84fce/api/v1/users/search?name=${name}&page=${page}`)
      .then(data => {
        setTotalPages(data.data.totalPages);
        setTotalCount(data.data.totalCount);
        if (data.data.error) {
          setError(data.data.error);
          setSearch([]);
          setCurrentPage(1);
        } else {
          setError('')
          setSearch(() => {
            if (name && search) {
              return [...(search || []), ...(data.data.data || [])]
            }
            else if (name.length === 0 && search) {
              return [...(search || []), ...(data.data.data || [])]
            }
            else {
              return [...(search || []), ...(data.data.data || [])]
            }
          });
        }
      })
      .finally(() => {
        setFetching(false);
        setFetch(false);
      })
  }

  useEffect(() => {
    if (fetching && search.length < totalCount) {
      searchUser(name, currentPage)
    }
  }, [fetching]);

  useEffect(() => {
    searchUser(name, currentPage)
  }, [name]);

  const handleScroll = (e: any) => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
      setFetching(true);
      setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const size = 80;
  if (!error && !totalCount ) {
    // if (search.length === 0 && !error ) {
    // if (fetch) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: (heigthPage / 3 - size / 2) }}>
        <PacmanLoader
          color="#36d7b7"
          cssOverride={{}}
          loading
          margin={0}
          size={size}
          speedMultiplier={1}
        />
      </div>
    )
  }

  return (
    <>
      <Search onInput={onInput} searchHandler={searchHandler} />
      {/* <table className="table table-sm table-hover table-dark table-striped table-bordered table-fixed text-center" style={{ fontSize: 12, textAlign: 'center' }}> */}
      <table className="table table-sm table-hover table-bordered table-fixed text-center" style={{ fontSize: 12, textAlign: 'center' }}>
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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="table-group-divider" >
          {
            search.map((user: IUser, index: number) => (
              <tr key={index + 1}>
                {(mediaQuery === "Small" || mediaQuery === "Extra small") &&
                  <>
                    <td>{user.name_en}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      { user.mobile_phone === 'Нет данных'
                        ? user.mobile_phone 
                        : <Link 
                            to={`tel:+${user.mobile_phone.replace(/\W|_/g, '')}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.mobile_phone}</Link>
                      }
                    </td>
                  </>
                }

                {(mediaQuery === "Medium") &&
                  <>
                    <td>{user.name_en}</td>
                    <td>{user.name_ru}</td>
                    <td>{user.position}</td>
                    <td>
                      { user.email === 'Нет данных'
                        ? user.email 
                        : <Link 
                            to={`mailto:+${user.email}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.email}</Link>
                      }
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      { user.mobile_phone === 'Нет данных'
                        ? user.mobile_phone 
                        : <Link 
                            to={`tel:+${user.mobile_phone.replace(/\W|_/g, '')}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.mobile_phone}</Link>
                      }
                    </td>
                  </>
                }

                {(mediaQuery === "Large") &&
                  <>
                    <td>{user.name_en}</td>
                    <td>{user.name_ru}</td>
                    <td>{user.position}</td>
                    <td>{user.department}</td>
                    <td>
                      { user.email === 'Нет данных'
                        ? user.email 
                        : <Link 
                            to={`mailto:+${user.email}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.email}</Link>
                      }
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      { user.mobile_phone === 'Нет данных'
                        ? user.mobile_phone 
                        : <Link 
                            to={`tel:+${user.mobile_phone.replace(/\W|_/g, '')}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.mobile_phone}</Link>
                      }
                    </td>
                  </>
                }

                {(mediaQuery === "X-Large") &&
                  <>
                    <td>{user.name_en}</td>
                    <td>{user.name_ru}</td>
                    <td>{user.position}</td>
                    <td>{user.department}</td>
                    <td>{user.location}</td>
                    <td>
                      { user.email === 'Нет данных'
                        ? user.email 
                        : <Link 
                            to={`mailto:+${user.email}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.email}</Link>
                      }
                    </td>
                    <td>{user.internal_phone}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      { user.mobile_phone === 'Нет данных'
                        ? user.mobile_phone 
                        : <Link 
                            to={`tel:+${user.mobile_phone.replace(/\W|_/g, '')}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.mobile_phone}</Link>
                      }
                    </td>
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
                    <td>
                      { user.email === 'Нет данных'
                        ? user.email 
                        : <Link 
                            to={`mailto:+${user.email}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.email}</Link>
                      }
                    </td>
                    <td>{user.internal_phone}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      { user.mobile_phone === 'Нет данных'
                        ? user.mobile_phone 
                        : <Link 
                            to={`tel:+${user.mobile_phone.replace(/\W|_/g, '')}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                            style={{color: 'white'}}
                          >{user.mobile_phone}</Link>
                      }
                    </td>
                    <td>{user.actual_location}</td>
                    <td>{user.birthday}</td>
                  </>
                }
                <td style={{ width: 10 }}>
                  <Link to={`/${user.id}`} className="mr-1">
                    <button type="button" className="btn btn-outline-success btn-sm">R</button>
                  </Link>
                </td>


              </tr>
            ))
          }
        </tbody>
      </table>
      {/* <div ref={ alert }> */}
      {error &&
        <div className="text-center text-red-600 alert alert-danger p-1 w-100" role="alert">{error}</div>
      }
      {/* </div> */}

    </>

  )
}
