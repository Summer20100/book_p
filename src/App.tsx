import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Table } from './components/Table';
import Card from './components/Card';

export default function App() {

  return (
    <main style={{marginTop: 10, marginLeft: 5, marginRight: 5}}>
      <BrowserRouter>
        {/* <Table /> */}
        <Routes>
          <Route path='/' element={<Table />} />
          <Route path='/:id' element={ <Card /> }/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}