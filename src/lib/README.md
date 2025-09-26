This folder provides a shared axios instance for the application.

Usage

- Import the default axios instance:

  import api from 'src/lib/axios';

  // Example: GET
  const res = await api.get('/exams');

- When you receive an auth token (e.g. after login), persist it so future requests include it automatically:

  import { setAuthToken } from 'src/lib/axios';
  setAuthToken(token);

- To clear the token (e.g. on logout):

  import { clearAuthToken } from 'src/lib/axios';
  clearAuthToken();

Behavior notes

- The instance uses `process.env.NEXT_PUBLIC_API_BASE_URL` as the base URL. Ensure this is set in your environment or `.env.local` for client builds.
- On a 401 response the client will remove the stored token and redirect to `/login`.
- This file only reads/writes `localStorage` on the browser; server-side requests (during SSR) will not include an Authorization header.
