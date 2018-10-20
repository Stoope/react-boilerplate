import React from 'react';
import { hydrate, render } from 'react-dom';
import App from '@/App';

const rootElement = document.getElementById('root');
const renderMethod = rootElement.innerHTML.trim().length ? hydrate : render;
renderMethod(<App />, rootElement);
