import styled from "styled-components";
import Header from "/components/Header";
import blogPosts from "@/data/blogPosts";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "/components/Footer";

const BlogContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: auto;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
    overflow: hidden;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 15px;
  }
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;

  p {
    margin-bottom: 15px;
  }

  ul {
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    text-align: justify;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
  border-radius: 10px;
  margin-bottom: 20px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 0;
    margin: 0;
    padding: 0;
    display: block;
  }
`;




export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((post) => post.id === params.id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const breadcrumbItems = [
    { label: "Početna", url: "/" },
    { label: "Blog", url: "/blog" },
    { label: post.title, url: `/blog/${post.id}` },
  ];

  return {
    props: {
      post,
      breadcrumbItems,
    },
  };
}

export default function BlogPost({ post, breadcrumbItems }) {
  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <BlogImage src={post.image} alt={post.title} />

      <BlogContainer>
        <Title>{post.title}</Title>
        <Content>
          <p>{post.content}</p>
        </Content>
      </BlogContainer>
      <Footer />
    </>
  );
}
