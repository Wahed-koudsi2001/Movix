import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import noActor from "../../assets/avatar.png"
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useParams } from "react-router-dom";
import { useFetchMainData } from "../../hooks/useFetchMainData";

export default function ImagesForEachMovies() {

    const { id } = useParams();
    const { data: images } = useFetchMainData(`https://api.themoviedb.org/3/movie/${id}/credits`, false);


    return (
        <>
            <h1 className='mb-[35px] text-[24px]'>Top Cast</h1>
            <div className="glider-container-wrapper mb-[80px]">
                <Glider
                    className="glider-container"
                    draggable
                    hasArrows={false}
                    hasDots={false}
                    slidesToShow={6}
                >
                    {images?.cast?.map((el, index) =>
                        <div className="glider-card text-center me-5" key={index}>
                            <LazyLoadImage
                                src={el.profile_path === null ? noActor : `https://image.tmdb.org/t/p/original${el.profile_path}`}
                                effect="blur"
                                alt="movie poster"
                                className="object-cover object-top rounded-full mx-auto w-[200px] md:h-[200px] h-[150px] bg-center" />
                            <h4 className="text-center font-bold mt-5 text-[18px]">{el.name}</h4>
                            <span className="text-center opacity-[0.6] block">{el.character}</span>
                        </div>
                    )}
                </Glider>
            </div>
        </>
    )
}
