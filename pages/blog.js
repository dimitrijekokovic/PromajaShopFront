import styled from "styled-components";
import Link from "next/link";
import Header from "../components/Header";
import blogPosts from "@/data/blogPosts";
import Center from "@/components/Center";
import Footer from "@/components/Footer";

const BlogPageContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: auto;
  
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: left;
  color: #333;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const BlogCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 15px;

  

  h3 {
    font-size: 1.2rem;
    margin: 0 0 10px;
    font-weight: bold;
    color: #222;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin: 0 0 10px;
  }

  span {
    display: block;
    font-size: 0.8rem;
    color: #777;
    margin-top: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Uklanja podvlačenje */
  color: inherit;

  &:hover {
    text-decoration: none; /* Bez podvlačenja na hover */
  }
`;

export default function BlogPage() {
  return (
    <>
      <Header />
      <Center>
        <BlogPageContainer>
          <PageTitle>Blog Priče</PageTitle>
          <BlogGrid>
            {blogPosts.map((post) => (
              <StyledLink href={`/blog/${post.id}`} key={post.id}>
                <BlogCard>
                  <BlogImage src={post.image} alt={post.title} />
                  <BlogContent>
                    <h3>{post.title}</h3>
                    <p>{post.content.slice(0, 100)}...</p>
                    <span>{post.date}</span>
                  </BlogContent>
                </BlogCard>
              </StyledLink>
            ))}
          </BlogGrid>
        </BlogPageContainer>
      </Center>
      <Footer></Footer>
    </>
  );
}
