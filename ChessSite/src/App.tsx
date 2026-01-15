import './App.css'
import Home from './routes/Home';
import { history } from './utils/history'
import Regras from './routes/Home/Regras';
import JogoLocal from './routes/Home/JogoLocal';
import Configuracao from './routes/Home/Configuracao';
import { unstable_HistoryRouter as HistoryRouter, Route,Routes } from "react-router-dom";
import User from './routes/User';


export default function App() {

  return (
    <>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index element={<Home/>}/>
          <Route path='configuracao' element={<Configuracao />}/>
          <Route path='jogo-local' element={<JogoLocal />}/>
          <Route path='regras' element={<Regras />}/>
        </Route>
        {/* ============================================================ */}
        <Route path='/user/' element={<User/>}>
         
        </Route>
        
        <Route path="*" element={<Home />} />

      </Routes>

    </HistoryRouter>
    </>
  )
}

