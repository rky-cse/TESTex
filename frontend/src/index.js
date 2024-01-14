import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QuestionDataProvider } from './QuestionDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <React.StrictMode>
    <QuestionDataProvider>
      <App />
    </QuestionDataProvider>
  </React.StrictMode>
);

