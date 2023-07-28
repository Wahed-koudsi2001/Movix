import { FallingLines } from "react-loader-spinner"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useFetchMainData } from "../hooks/useFetchMainData";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import VideosMovies from "../components/VideosMovies/VideosMovies";
import SimilarMovies from "../components/SimilarMovies/SimilarMovies";
import RecommendationsMovies from "../components/RecommendationsMovies/RecommendationsMovies";
import ImagesForEachMovies from "../components/ImagesForEachMovies/ImagesForEachMovies";

export default function AboutMovieId() {

    const { id } = useParams();

    const { data, error } = useFetchMainData(`https://api.themoviedb.org/3/movie/${id}`, false);

    if (!data || error) {
        return (
            <div className="flex items-center justify-center py-5 pt-[100px]">
                <FallingLines
                    color="#da2f68"
                    width="100"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                />
            </div>
        );
    }

    let runtime;

    if (data.runtime >= 60) {
        const hours = Math.floor(data.runtime / 60);
        const minutes = data.runtime % 60;
        runtime = `${hours}h ${minutes}m`;
    } else {
        runtime = `${data.runtime}m`;
    }

    return (
        <div className="text-[#fff] relative">
            <div className="h-[100vh] w-full absolute inset-0">
                <LazyLoadImage src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                    effect="blur"
                    alt="bg-poster"
                    className="object-cover h-[100vh] w-screen" />
            </div>
            <div className="opacity-layer wahed-opacity-layer absolute inset-0"></div>
            <div className="flex flex-col md:flex-row items-center gap-[50px] relative pt-[80px] z-40 container mx-auto px-[20px]">
                <LazyLoadImage src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                    effect="blur"
                    alt="movie poster"
                    styley={{ width: "100%" }}
                    className="w-[350px] rounded-2xl mx-auto block" />
                <div className='w-full lg:w-7/12 mt-[100px] lg:mt-0'>
                    <h1 className="text-[24px] md:text-[34px] m-0">{data.title} ({data.release_date.slice(0, 4)})</h1>
                    <span className="text-[20px] italic opacity-[0.5] mb-[15px] block">{data.tagline}</span>
                    {data.genres && (
                        <div className="mb-[25px] flex gap-[5px] flex-wrap">
                            {data.genres.map((el) =>
                                <span className="bg-[#da2f68] px-[5px] rounded-[4px] text-[12px] " key={el.id}>{el.name}</span>
                            )}
                        </div>
                    )}
                    <div className='flex items-center gap-5 text-[20px] cursor-pointer mb-[25px]'>
                        <Progress progress={data?.vote_average} className=" z-10 flex items-center justify-center font-bold">
                            {data?.vote_average.toFixed(1)}
                        </Progress>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7" enableBackground="new 0 0 213.7 213.7" xmlSpace="preserve">
                            <polygon className="triangle" fill="#da2f68" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="73.5,62.5 148.5,105.8 73.5,149.1" />
                            <circle className="circle" fill="#dbc5cd41" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                        </svg>
                        <span className=" transition hover:text-[#da2f68]">Watch Trailer</span>
                    </div>
                    <h4 className='text-[24px] mb-[10px]'>Overview</h4>
                    <p className='mb-[25px]'>{data.overview}</p>
                    <div>
                        <div className="flex flex-col gap-5 justify-between border-b-[0.1px] border-slate-400 pb-[15px] mb-[15px]">
                            <p className='font-bold'>Status: <span className='ms-[10px] font-light opacity-[0.5]'>{data.status}</span></p>
                            <p className='font-bold'>Release Date: <span className='ms-[10px] font-light opacity-[0.5]'>{data.release_date}</span></p>
                            <p className='font-bold'>Runtime: <span className='ms-[10px] font-light opacity-[0.5]'>{runtime}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto my-[80px] relative z-10 px-5">
                <ImagesForEachMovies />
                <VideosMovies />
                <SimilarMovies />
                <RecommendationsMovies />
            </div>
        </div>
    )
}

const Progress = styled.span`
                width: 75px;
                height: 75px;
                padding: 10px;
                border-radius: 50%;
                background: radial-gradient(closest-side, #041226 79%, transparent 80% 100%),
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
