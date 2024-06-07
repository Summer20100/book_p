import { useEffect, useState, FC } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import SocialNetvork from "./SocialNetvork";

const Card: FC = ( ) => {
  const { id } = useParams();
  const idNumb = id ? parseInt(id) : 0;

  const navigate = useNavigate();
  const { users, card, error } = useUser(idNumb);

  const goBack = () => navigate(-1);

  const [user, setUser] = useState<any>({...users});

  useEffect(() => {
    setUser({ ...card });
  }, [card]);

  let title = 
  `Имя EN: ${user.name_en}
  Имя RUS: ${user.name_ru}
  Должность: ${user.position}
  Отдел: ${user.department}
  Локация: ${user.location}
  E-mail: ${user.email}
  Внутренний телефон: ${user.internal_phone}
  Мобильный телефон:: ${user.mobile_phone}
  Фактическое расположение: ${user.actual_location}
  День Рождения: ${user.birthday}`;

  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  useEffect(() => {
    user.mobile_phone ? setPhone(`tel:+${user.mobile_phone.replace(/\W|_/g, '')}`) : setPhone('');
    user.email ? setEmail(`mailto:${user.email}`) : setEmail('');
  }, [user.mobile_phone]) 

  return (
    <>
      <div className="card m-2 align-items-center position-relative" key={user.id}>
        <button type="button" className="btn btn-secondary btn-sm position-absolute end-0" onClick={goBack}>

          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-backspace-fill" viewBox="-10 0 40 16">
            <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8z"/>
          </svg>
        </button>
        <div className="card-body">
          
          <div className="card-title fw-bold fs-4">{user.name_en}</div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>Ф.И.О.:</div>
              <div className="fw-medium">{user.name_ru}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>Должность:</div>
              <div className="fw-medium">{user.position}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>Отдел:</div>
              <div className="fw-medium">{user.department}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>Локация:</div>
              <div className="fw-medium">{user.location}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>E-mail:</div>
              <Link className="fw-medium link-offset-2 link-underline link-underline-opacity-0" to={email} >{user.email}</Link>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>Внутренний телефон:</div>
              <div className="fw-medium">{user.internal_phone}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>Мобильный телефон:</div>
              <Link className="fw-medium link-offset-2 link-underline link-underline-opacity-0" to={phone} >{user.mobile_phone}</Link>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>Фактическое расположение:</div>
              <div className="fw-medium">{user.actual_location}</div>
            </div>
          </div>

          <div>
            <div className="d-inline-flex mb-2">
              <div className="card-text" style={{marginRight: 10}}>День Рождения:</div>
              <div className="fw-medium">{user.birthday}</div>
            </div>
          </div>

          <SocialNetvork title={title}/>
        </div>
      </div>
    </>
  )
}

export default Card