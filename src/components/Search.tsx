import { useState } from 'react';

interface ISearchProps {
  searchHandler: (name: any) => void;
  onInput: (input: string) => void;
}


export const Search: React.FC<ISearchProps> = ({ onInput, searchHandler }) => {

  const [input, setInput] = useState<string>('');

  const searchInput = (e: any) => {
    setInput(e.target.value)
    onInput(e.target.value)
  }

  const search = (e: any) => {
    searchHandler(e);
    setInput('');
  }

  const showAll = () => {
    onInput('')
  }

  return (
    <div className="d-flex mb-1 h-10">
      {/* <form className="d-inline-flex ms-auto mb-3 h-10" onSubmit={(e) => search(e)} > */}
      <form className="input-group" onSubmit={(e) => search(e)} >
        <input type="text" className="form-control " placeholder="Username..." aria-label="Recipient's username" aria-describedby="button-addon2" value={input} onChange={searchInput} />
        <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-binoculars-fill" viewBox="0 0 16 16">
            <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z" />
          </svg>
        </button>
        <button className="btn btn-outline-danger" onClick={showAll} id="button-addon2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-radioactive" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8" />
            <path d="M9.653 5.496A3 3 0 0 0 8 5c-.61 0-1.179.183-1.653.496L4.694 2.992A5.97 5.97 0 0 1 8 2c1.222 0 2.358.365 3.306.992zm1.342 2.324a3 3 0 0 1-.884 2.312 3 3 0 0 1-.769.552l1.342 2.683c.57-.286 1.09-.66 1.538-1.103a6 6 0 0 0 1.767-4.624zm-5.679 5.548 1.342-2.684A3 3 0 0 1 5.005 7.82l-2.994-.18a6 6 0 0 0 3.306 5.728ZM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
          </svg>
        </button>
      </form>



    </div>

  )
}