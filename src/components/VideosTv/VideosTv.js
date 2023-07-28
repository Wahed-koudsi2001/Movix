import { useParams } from "react-router-dom";
import { useFetchMainData } from "../../hooks/useFetchMainData";

export default function VideosTv() {

    const { id } = useParams();
    const { data: videos } = useFetchMainData(`https://api.themoviedb.org/3/tv/${id}/videos`, true);

    return (
        <div>
            {videos?.length > 0 &&
                <div className="mb-[80px] overflow-ellipsis">
                    <h1 className='mb-[25px] text-[24px]'>Official Videos</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {videos && videos?.slice(0, 4).map((video) =>
                            <div key={video.key}>
                                <iframe
                                    title={video.name}
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    className="rounded-2xl"
                                    autoCapitalize=""
                                />
                                <h2 className="text-lg mt-5">{video.name}</h2>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}
