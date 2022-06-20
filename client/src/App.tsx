import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todos from './components/todos/Todos';

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <React.Fragment>
       <Todos />
  </React.Fragment>
  );
}

export default App;
