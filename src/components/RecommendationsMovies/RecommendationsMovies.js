import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import NoPoster from "../../assets/no-poster.png"
import { useParams, Link } from "react-router-dom";
import { useFetchMainData } from "../../hooks/useFetchMainData";
import { styled } from 'styled-components';

export default function RecommendationsMovies() {

    const { id } = useParams();
    const { data: recommendations } = useFetchMainData(`https://api.themoviedb.org/3/movie/${id}/recommendations`, true);
    const { data: genres } = useFetchMainData(`https://api.themoviedb.org/3/genre/movie/list`, false);

    return (
        <>
            {recommendations?.length > 0 ?
                <div className="glider-container-wrapper mt-[80px]">
                    <h1 className="mb-5 text-[24px]">Recommendations</h1>
                    <Glider
                        className="glider-container"
                        draggable
                        hasArrows={false}
                        hasDots={false}
                        slidesToShow={5}
                    >
                        {recommendations?.map((card) =>
                            <Link to={`/movie/${card.id}`} key={`movie-${card.id}`} className='glider-card m-3 wahed'>
                                <LazyLoadImage src={card.poster_path === null ? NoPoster : `https://image.tmdb.org/t/p/original${card.poster_path}`}
                                    effect="blur"
                                    alt="movie poster"
                                    className="object-cover w-full h-auto bg-bottom rounded-2xl" />
                                <div className='mt-5'>
                                    <h6 className='text-[#fff] h-[40px]'>{card.title}</h6>
                                    <span className='opacity-[0.5] text-[#fff] text-[14px]'>{card.release_date}</span>
                                </div>
                                <div className="relative">
                                    <Progress2 progress={card?.vote_average} className="text-[#000] z-10 absolute bottom-[70px] left-[12px] flex items-center justify-center font-bold text-[14px]">
                                        {card?.vote_average.toFixed(1)}
                                    </Progress2>
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
                :
                false
            }
        </>
    )
}


const Progress2 = styled.span`
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  background: radial-gradient(closest-side, #fff 79%, transparent 80% 100%),
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