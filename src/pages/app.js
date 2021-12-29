import '../assets/scss/style.scss';
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  let navigate = useNavigate();

  useEffect(() => {
    // Если не авторизован перенаправляем на страницу авторизации
    navigate('/login');
  });

  return (
      <div className='app'>
        Загрузка...
      </div>
  );
}


export default App;
