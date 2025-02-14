import styled from "styled-components";
import Link from "next/link";
import blogPosts from "@/data/blogPosts"; // Staticki podaci o blogovima
import Center from "./Center";
import { useState, useEffect } from "react";

const BlogSectionContainer = styled.div`
  border-radius: 10px;
  padding-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 30px;
  color: black;

  @media (max-width: 480px) {
    text-align: center;
    font-size: 2rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 0 25px;
  }
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

  @media (max-width: 480px) {
    text-align: center;
    margin: 0 auto;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;

  @media (max-width: 480px) {
    height: 150px;
  }
`;

const BlogContent = styled.div`
  padding: 15px;

  h3 {
    font-size: 1.3rem;
    margin: 0 0 10px;
    font-weight: bold;
    color: #222;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }

  p {
    font-size: 1rem;
    color: #555;
    margin: 0 0 10px;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  span {
    display: block;
    font-size: 0.85rem;
    color: #777;
    margin-top: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Uklanja podvlačenje */
  color: inherit; /* Održava trenutnu boju */
`;

export default function BlogSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Pokreni proveru odmah
    window.addEventListener("resize", handleResize); // Prati promene širine

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const visiblePosts = isMobile ? blogPosts.slice(-3) : blogPosts;

  return (
    <Center>
      <BlogSectionContainer>
        <SectionTitle>Najnovije Blog Priče</SectionTitle>
        <BlogGrid>
          {visiblePosts.map((post) => (
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
      </BlogSectionContainer>
    </Center>
  );
}
