import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const getMovie = useCallback(async () => {
    const detail = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(detail.data.movie);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <h1>Movie Detail</h1>
          <img src={detail.large_cover_image} alt={detail.title} width="300" />
          <h2>Title: {detail.title_long}</h2>
          <h4>Rating: {detail.rating}</h4>
          <h5>Runtime: {detail.runtime}Min</h5>
          <ul>
            {detail.genres.map((g, index) => {
              return <li key={index}>{g}</li>;
            })}
          </ul>
          {detail.description_full ? <p>{detail.description_full}</p> : null}
          {detail.yt_trailer_code ? (
            <a
              href={`http://youtu.be/${detail.yt_trailer_code}`}
              target="_blank"
              rel="noreferrer">
              Youtube Trailer
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}
export default Detail;
