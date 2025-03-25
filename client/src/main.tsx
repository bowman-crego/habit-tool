import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         index: true,
//         element: <Home />
//       }, {
//         path: '/matchup',
//         element: <Matchup />
//       }, {
//         path: '/matchup/:id',
//         element: <Vote />
//       },
//     ],
//   },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

