import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from '../src/App';
import { SidebarProvider } from '../src/contexts/SidebarContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>
);