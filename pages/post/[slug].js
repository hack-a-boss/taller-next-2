import Link from "next/link";
import { useRouter } from "next/router";

export default function Post({ post }) {
  // así accederíamos al parámetro de ruta
  // const router = useRouter();
  // console.log(router.query);
  // {slug: 'valor-del-slug'}

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/posts`);

  const posts = await response.json();

  const paths = posts.map((post) => {
    return {
      params: { slug: post.slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };

  /*
  [
    {params: {slug: 'my-first-post'}},
    {params: {slug: 'sunset-photos'}},
    {params: {slug: 'black-white'}},
    ...
  ]
  */
}

export async function getStaticProps(context) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/posts/${context.params.slug}`
  );

  const post = await response.json();

  return {
    props: {
      post,
    },
    revalidate: 10, //in seconds
  };
}
