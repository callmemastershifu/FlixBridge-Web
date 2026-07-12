import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {

  return (

    <section
      style={{
        marginBottom: "30px"
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "5px"
        }}
      >

        <h2
          style={{
            color: "#F5F5F5",
            fontSize: "18px",
            fontWeight: 550,
            letterSpacing: "-0.3px",
            textTransform: "uppercase"
          }}
        >
          {title}
        </h2>

      </div>

      <div

        style={{

          display: "flex",
          gap: "20px",
          overflowX: "auto",
          overflowY: "visible",
          paddingBottom: "20px",
          paddingTop: "20px",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none"

        }}

      >

        {movies.map((movie) => (

          <MovieCard

            key={movie.id}

            movie={movie}

          />

        ))}

      </div>

    </section>

  );

}