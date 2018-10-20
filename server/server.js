import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '@/App';

const htmlData = fs.readFileSync(global.htmlPath, 'utf8');

const prepHTML = (html, { body }) => {
  const result = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return result;
};

const renderApp = () => {
  renderToString(<App />);
};

const server = (req, res) => {
  global.baseUrl = `${req.protocol}://${req.headers.host}`;

  const body = renderApp();
  const html = prepHTML(htmlData, {
    body,
  });
  res.send(html);
};

export default server;
