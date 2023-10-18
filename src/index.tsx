import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
//
import App from './App';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <RecoilRoot>
        <Suspense>
          <App />
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  </HelmetProvider>
);
