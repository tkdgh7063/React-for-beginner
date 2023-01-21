import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, year, summary, genres }) {
  const summarySlice = (summary) => {
    if (summary.length >= 235) {
      let i = 0;
      while (summary.charAt(235 + i) !== " ") {
        i += 1;
      }
      return summary.slice(0, 235 + i);
    } else {
      return summary;
    }
  };
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>
          {title}({year})
        </Link>
      </h2>
      <p>{summarySlice(summary)}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
