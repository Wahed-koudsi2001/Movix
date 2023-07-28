import { AppSearch } from "../../App";
import { useEffect, useState, useContext } from "react";
import { useFetchMainData } from "../../hooks/useFetchMainData";

export default function LandingPage() {

    const { value, setValue, setStart } = useContext(AppSearch);
    const { data } = useFetchMainData("https://api.themoviedb.org/3/movie/popular", true);
    const [singleImg, setSingleImg] = useState(null);

    const handleSearch = () => {
        if (value === "") {
            setStart(false);
        } else {
            setStart(true);
        }
    }

    useEffect(() => {
        if (data) {
            const copy = [...data];
            for (let i = 0; i < 1; i++) {
                const randomNum = Math.floor(Math.random() * copy.length);
                setSingleImg(copy[randomNum]?.poster_path);
            }
        }
    }, [data]);

    return (
        <div className=" bg-[#04152d] relative h-[100vh]">
            <div className="opacity-[0.5] h-[100vh]">
                <img src={`https://image.tmdb.org/t/p/original${singleImg}`} alt="img" className="object-cover bg-cover bg-top object-top h-full w-screen" />
            </div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-[#fff] w-full flex flex-col items-center z-50">
                <span className="m-0 text-[60px] md:text-[90px] font-bold">Welcome.</span>
                <span className="m-0 mb-[40px]  text-[18px] sm:text-[24px]">Millions of movies, TV shows and people to discover. Explore now.</span>
                <div className="flex w-full itmes-center justify-center">
                    <input className="outline-0 text-[#000] h-[40px] sm:h-[60px] text-[14px] sm:text-[20px] px-[20px] sm:px-[30px] w-[50%] rounded-tl-full rounded-bl-full" type="text" placeholder="Search for a movie or tv show...." value={value} onChange={(e) => setValue(e.target.value)} />
                    <button onClick={handleSearch} className="text-[14px] sm:text-[18px] rounded-tr-full w-[70px] sm:w-[160px] rounded-br-full h-[40px] sm:h-[60px] bg-gradient-to-r from-[#f89e00] to-[#da2f68]">Search</button>
                </div>
            </div>
            <div className="opacity-layer"></div>
        </div >
    )
}