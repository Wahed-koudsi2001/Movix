import { Link } from "react-router-dom"
import { useState } from 'react';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useFetchMainData } from "../../hooks/useFetchMainData"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styled from "styled-components";

export default function TopRated() {

    const [selected, setSelected] = useState("movie");

    const { data } = useFetchMainData(`https://api.themoviedb.org/3/${selected}/top_rated`, true);
    const { data: genres } = useFetchMainData(`https://api.themoviedb.org/3/genre/movie/list`, false);

    const handleDayClick = () => {
        setSelected('movie');
    }

    const handleWeekClick = () => {
        setSelected('tv');
    }

    return (
        <div className="container mx-auto m-[100px]">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-5 md:px-2">
                <h2 className="text-white mb-5 md:mb-0 text-3xl">Top Radted</h2>
                <div className='flex items-center px-[2px] gap-5 w-[220px] bg-[#fff] rounded-full relative h-[35px]'>
                    <span className={`text-center w-[50%] z-20 ${selected === 'movie' ? ' h-[31px] flex items-center justify-center cursor-pointer rounded-full text-white bg-gradient-to-r from-[#f89e00] to-[#da2f68]' : 'bg-transparent cursor-pointer'}`} onClick={handleDayClick}>Movies</span>
                    <span className={`text-center w-[50%] z-20 ${selected === 'tv' ? 'h-[31px] flex items-center justify-center cursor-pointer rounded-full text-white bg-gradient-to-r from-[#f89e00] to-[#da2f68]' : 'bg-transparent cursor-pointer'}`} onClick={handleWeekClick}>TV Shows</span>
                </div>
            </div>
            <div className="glider-container-wrapper">
                <Glider
                    className="glider-container"
                    draggable
                    hasArrows={false}
                    hasDots={false}
                    slidesToShow={5}
                    arrowPrev={<span className="glider-prev-arrow"></span>}
                    arrowNext={<span className="glider-next-arrow"></span>}>
                    {data?.map((card) =>
                        <Link to={selected === "movie" ? `movie/${card.id}` : `tv/${card.id}`} key={card.id} className='glider-card m-3'>
                            <LazyLoadImage src={`https://image.tmdb.org/t/p/original${card.poster_path}`}
                                effect="blur"
                                alt="movie poster"
                                className="object-cover w-full h-auto bg-bottom rounded-2xl" />
                            <div className='mt-5'>
                                <h6 className='text-[#fff] text-[16px] h-[40px]'>{card.title || card.name}</h6>
                                <span className='opacity-[0.5] text-[#fff] text-[14px]'>{card.release_date || card.first_air_date}</span>
                            </div>
                            <div className="relative">
                                <Progress progress={card?.vote_average} className="text-[#000] z-10 absolute bottom-[70px] left-[12px] flex items-center justify-center font-bold text-[14px]">
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
                </Glider>
            </div>
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