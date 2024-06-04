interface ISecret {
  DB_USER: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASS: string;
  DB_PORT: number;
  DB_URL: string;
  DB_RENDER: string;
  DB_NUMB: string;
  DB_API_USER: string;
}

// export const secret: ISecret[] = [
//   {
//     DB_USER: 'sudphdzr',
//     DB_HOST: 'satao.db.elephantsql.com',
//     DB_NAME: 'sudphdzr',
//     DB_PASS: 'cLkLQqLpR7YHwt3DWxLdAr2oKwycq_al',
//     DB_PORT: 5432,
//     DB_URL: 'postgres://sudphdzr:cLkLQqLpR7YHwt3DWxLdAr2oKwycq_al@satao.db.elephantsql.com/sudphdzr',
//     DB_RENDER: "https://backend-x9gt.onrender.com/",
//     DB_NUMB: "75ad4124-e29d-4925-904b-a96bb9c84fce",
//     DB_API_USER: "/api/v1/users",
//   }
// ]

export const secret: ISecret[] = [
  {
    DB_USER: 'bulati4mai',
    DB_HOST: 'pg3.sweb.ru',
    DB_NAME: 'bulati4mai',
    DB_PASS: '&DSN4SHXM1EM6N9c',
    DB_PORT: 5432,
    DB_URL: 'postgres://sudphdzr:cLkLQqLpR7YHwt3DWxLdAr2oKwycq_al@satao.db.elephantsql.com/sudphdzr',
    DB_RENDER: "https://backend-x9gt.onrender.com/",
    DB_NUMB: "75ad4124-e29d-4925-904b-a96bb9c84fce",
    DB_API_USER: "/api/v1/users",
  }
]

const { DB_RENDER, DB_NUMB, DB_API_USER } = secret[0];
export const DB_URL_USERS = `${DB_RENDER}${DB_NUMB}${DB_API_USER}`;