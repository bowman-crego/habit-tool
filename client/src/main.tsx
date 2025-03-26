import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.js'
import WelcomePage from './pages/WelcomePage.js'
import CreateProfile from './pages/CreateProfile.js'
import SetWeeklyGoals from './pages/SetWeeklyGoals.js'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />
      }, {
        path: '/matchup',
        element: <CreateProfile/>
      }, {
        path: '/goals' ,
        element: <SetWeeklyGoals/>
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

