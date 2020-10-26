import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = props => {
   const { promiseInProgress } = usePromiseTracker();
   console.log(promiseInProgress)  
     return (
       promiseInProgress && 
      <h1>Hey some async call in progress ! </h1>
  );  
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <LoadingIndicator/>
  </React.StrictMode>,
  document.getElementById('root')
);

