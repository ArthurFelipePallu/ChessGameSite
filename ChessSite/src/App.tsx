import User from "./routes/User";
import Home from "./routes/Home";
import Regras from "./routes/Home/Regras";
import { history } from "./utils/history";
import HomePage from "./routes/Home/HomePage";
import JogoLocal from "./routes/Home/JogoLocal";
import Configuracao from "./routes/Home/Configuracao";
import { ContextSelectedBoardConfigurationProvider } from "./components/Chess/Provider";


import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";


export default function App() {


  return (

    <ContextSelectedBoardConfigurationProvider >
    
      <HistoryRouter history={history as any}>
        <Routes>
          <Route path='/' element={<Home/>}>
            <Route index element={<HomePage/>}/>
            <Route path='configuracao/' element={<Configuracao />}>
            </Route>
            <Route path='jogo-local' element={<JogoLocal />}/>
            <Route path='regras' element={<Regras />}/>
          </Route>
          {/* ============================================================ */}
          <Route path='/user/' element={<User/>}>
          
          </Route>
          
          <Route path="*" element={<Home />} />

        </Routes>
      </HistoryRouter>





    </ContextSelectedBoardConfigurationProvider>


  );
}
