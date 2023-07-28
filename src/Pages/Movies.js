import { FallingLines } from "react-loader-spinner";
import { useFetchMainData } from "../hooks/useFetchMainData";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import React from 'react'
import Select from 'react-select'

export default function Movies() {
    const [pageNumber, setPageNumber] = useState(-1);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const loaderRef = useRef(null);

    const { data, loading } = useFetchMainData(`https://api.themoviedb.org/3/discover/movie?d3d74a12285b4272bedb7e77a9998a5d&page=${pageNumber}`, true);
    const { data: genres } = useFetchMainData(`https://api.themoviedb.org/3/genre/movie/list`, false);

    useEffect(() => {
        if (!loading && data) {
            setIsLoading(false);
            setMovies((prevMovies) => [...prevMovies, ...data]);
        }
    }, [loading, data]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 0 });
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
    }, []);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions.map((option) => option.value));
    };

    const filteredMovies = selectedGenres.length > 0 ? movies.filter((movie) => movie.genre_ids.some((genreId) => selectedGenres.includes(genreId))) : movies;

    const selectOptions = genres?.genres.map((genre) => ({
        value: genre.id,
        label: genre.name,
    }));

    return (
        <div className="container mx-auto px-5 py-[80px]">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-[24px] mb-5 sm:mb-0 text-[#fff]">Explore Movies</h1>
                <Select
                    className="w-[50%] bg-[#173d77] "
                    options={selectOptions}
                    isMulti
                    placeholder="Select genres"
                    onChange={handleGenreChange}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-5 mt-5">
                {Array.isArray(filteredMovies) && filteredMovies.length > 0 ? (
                    filteredMovies.map((card) => (
                        <Link to={`/movie/${card.id}`} key={`movie-${card.id}`} className="glider-card wahed">
                            <LazyLoadImage src={`https://image.tmdb.org/t/p/original${card.poster_path}`}
                                effect="blur"
                                alt="movie poster"
                                className="object-cover w-full h-auto bg-bottom rounded-2xl" />
                            <div className='mt-5'>
                                <h6 className='text-[#fff] text-[18px] h-[40px]'>{card.title.slice(0, 15)}</h6>
                                <span className='opacity-[0.5] text-[#fff] text-[14px]'>{card.first_air_date}</span>
                            </div>
                            <div className="relative">
                                <Progress progress={card?.vote_average} className="text-[#000] z-10 absolute bottom-[50px] left-[12px] flex items-center justify-center font-bold text-[14px]">
                                    {card?.vote_average.toFixed(1)}
                                </Progress>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-3">
                                {card.genre_ids.map((genreId) => {
                                    const genre = genres?.genres.find((g) => g.id === genreId);
                                    return genre ? (
                                        <span key={genreId} className="bg-[#da2f68] text-[11px] text-[#fff] p-1 rounded-md">
                                            {genre.name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-[#fff]">No movies found.</div>
                )}
            </div>
            <div className="flex items-center justify-center py-5">
                {isLoading && <FallingLines
                    color="#da2f68"
                    width="100"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                />}
            </div>
            <div ref={loaderRef}></div>
        </div>
    );
}


const Progress = styled.span`
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  background: radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(
      ${(props) => {
        if (`${props.progress * 10}%` >= "75%") {
            return "green";
        } else if (`${props.progress * 10}%` >= "50%") {
            return "orange";
        } else {
            return "red";
        }
    }},
      ${(props) => `${props.progress * 10}%`},
      pink 0
    );
`;