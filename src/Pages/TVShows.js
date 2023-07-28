import { FallingLines } from "react-loader-spinner"
import { useFetchMainData } from "../hooks/useFetchMainData";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react"
import Select from 'react-select';
import styled from "styled-components";

export default function TVShows() {

    const [pageNumber, setPageNumber] = useState(-1);
    const [tvShows, setTvShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const loaderRef = useRef(null);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const { data, loading } = useFetchMainData(`https://api.themoviedb.org/3/discover/tv?d3d74a12285b4272bedb7e77a9998a5&page=${pageNumber}`, true);
    const { data: genres } = useFetchMainData(`https://api.themoviedb.org/3/genre/tv/list?d3d74a12285b4272bedb7e77a9998a5d`, false);

    useEffect(() => {
        if (!loading && data) {
            setIsLoading(false);
            setTvShows((prevTvShows) => [...prevTvShows, ...data]);
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

    const filteredTvShows = selectedGenres.length > 0 ? tvShows.filter((tvShow) => tvShow.genre_ids.some((genreId) => selectedGenres.includes(genreId))) : tvShows;

    const selectOptions = genres?.genres.map((genre) => ({
        value: genre.id,
        label: genre.name,
    }));

    return (
        <div className="container mx-auto px-5 pt-[80px]">
            <div className="flex justify-between">
                <h1 className="text-[24px] text-[#fff]">Explore TV Shows</h1>
                <Select
                    className="w-[300px] bg-[#173d77] "
                    options={selectOptions}
                    isMulti
                    placeholder="Select genres"
                    onChange={handleGenreChange}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-5 mt-5">
                {Array.isArray(filteredTvShows) && filteredTvShows.length > 0 && filteredTvShows.map((card) =>
                    <Link to={`/tv/${card.id}`} key={`tv-show-${card.id}`} className='glider-card wahed'>
                        <LazyLoadImage src={`https://image.tmdb.org/t/p/original${card.poster_path}`}
                            effect="blur"
                            alt="TV show poster"
                            className="object-cover w-full h-auto bg-bottom rounded-2xl" />
                        <div className='mt-5'>
                            <h6 className='text-[#fff] text-[18px] h-[40px]'>{card.name.slice(0, 15)}</h6>
                            <span className='opacity-[0.5] text-[#fff] text-[14px]'>{card.release_date}</span>
                        </div>
                        <div className="relative">
                            <Progress progress={card?.vote_average} className="text-[#000] z-10 absolute bottom-[50px] left-[12px] flex items-center justify-center font-bold text-[14px]">
                                {card?.vote_average.toFixed(1)}
                            </Progress>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                            {card.genre_ids.map((genreId) => {
                                const genre = genres?.genres.find((g) => g.id === genreId);
                                return (
                                    genre ? (
                                        <span key={genreId} className="bg-[#da2f68] text-[11px] text-[#fff] p-1 rounded-md">
                                            {genre.name}
                                        </span>
                                    ) : null
                                );
                            })}
                        </div>
                    </Link>
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