import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LicenseInfo } from '@mui/x-license-pro';
import './mocks/browser';

LicenseInfo.setLicenseKey('06e3841ea082fb29f149cb8cca0ebb71Tz01NjkwNixFPTE3MDQxODk2MDUyNTMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    worker.start();
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
