import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar";
import Hero from "./Pages/Hero";
import AboutMovieId from "./Pages/AboutMovieId";
import AboutTvId from "./Pages/AboutTvId";
import Movies from "./Pages/Movies";
import './App.css';
import TVShows from "./Pages/TVShows";
import { useState, createContext } from "react";

export const AppSearch = createContext();

function App() {

  const [value, setValue] = useState("");
  const [start, setStart] = useState(false);

  const client = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Navbar />}>
        <Route index path="/" element={<Hero />} />
        <Route path="movie/:id" element={<AboutMovieId />} />
        <Route path="tv/:id" element={<AboutTvId />} />
        <Route path="movies" element={<Movies />} />
        <Route path="TV_Shows" element={<TVShows />} />
      </Route>
    )
  )

  return (
    <AppSearch.Provider value={{ value, setValue, start, setStart }}>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppSearch.Provider>
  );
}

export default App;
