import Link from "next/link";
import { useRouter } from "next/router";

export default function Post({ post }) {
  // así accederíamos al parámetro de ruta
  // const router = useRouter();
  // console.log(router.query);
  // {slug: 'valor-del-slug'}

  return (
    <section className="post">
      <header>
        <h1>My photography blog</h1>
        <h2>{post.title}</h2>
        <p>
          <time>{new Date(post.date).toLocaleDateString()}</time>
        </p>
      </header>
      {post.image ? (
        <figure>
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND}/photos/${post.image}`}
            alt={post.title}
          />
        </figure>
      ) : null}

      <p>{post.content}</p>

      <Link href="/">Back to homepage</Link>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/posts/${context.params.slug}`
    );

    if (!response.ok) {
      return {
        props: {
          error: "Error cargando post...",
          statusCode: 404,
        },
      };
    }
    const post = await response.json();

    return {
      props: {
        post,
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
