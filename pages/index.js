import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({ posts }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      const response = await fetch(
        `https://goweather.herokuapp.com/weather/A%20Coru%C3%B1a`
      );
      const { temperature, description } = await response.json();

      setWeather({
        temperature,
        description,
      });
    };

    loadWeather();
  }, []);

  return (
    <section className="home">
      <header>
        <h1>My photography blog</h1>
        {weather ? (
          <p>
            {weather.temperature} {weather.description} in A Coruña
          </p>
        ) : (
          <p>Loading weather...</p>
        )}
        <figure>
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND}/photos/frontpage.jpg`}
            alt="Blog photo"
          />
        </figure>
      </header>

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <h2>
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>
                <time>{new Date(post.date).toLocaleDateString()}</time>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/posts`);
    const posts = await res.json();

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        error: {
          statusCode: 404,
          message: error.message,
        },
      },
    };
  }
}
