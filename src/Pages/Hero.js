import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import LandingPage from "../components/Landingpage/LandingPage";
import MostPopular from "../components/MostPopular/MostPopular";
import TrendingSection from "../components/TrendingSection/TrendingSection";
import TopRated from "../components/TopRated/TopRated"
import { useContext } from "react";
import { useFetchMainData } from "../hooks/useFetchMainData";
import { AppSearch } from "../App";
import { styled } from 'styled-components';

export default function Hero() {

    const { value, start } = useContext(AppSearch);

    const { data: search } = useFetchMainData(`https://api.themoviedb.org/3/search/multi?query=${start === true ? value : ""}`, true);
    const { data: genres } = useFetchMainData(`https://api.themoviedb.org/3/genre/movie/list`, false);

    return (
        <>
            {!start === true ?
                <div>
                    <LandingPage />
                    <TrendingSection />
                    <MostPopular />
                    <TopRated />
                </div>
                :
                <div className='container mx-auto py-[80px]'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
                        {search?.map((card) =>
                            <Link to={card.media_type === "movie" ? `/movie/${card.id}` : `/tv/${card.id}`} key={`movie-${card.id}`} className='glider-card'>
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
                    </div>
                </div>
            }
        </>
    )
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