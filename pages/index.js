import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({ posts }) {
  return (
    <section className="home">
      <header>
        <h1>My photography blog</h1>
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/posts`);

    if (!response.ok) {
      return {
        props: {
          error: "Error cargando datos...",
          statusCode: 404,
        },
      };
    }

    const posts = await response.json();

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Error general",
        statusCode: 500,
      },
    };
  }
}
