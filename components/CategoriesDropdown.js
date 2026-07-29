import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { FaChevronDown, FaChevronRight, FaTimes } from "react-icons/fa";

const DropdownContainer = styled.div`
  position: relative;
`;

const Trigger = styled.button`
  border: 0;
  background: transparent;
  color: ${({ $open }) => ($open ? "#fff" : "#bbbbbb")};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  padding: 0;
  transition: color 0.2s ease;

  svg {
    width: 11px;
    height: 11px;
    color: #f39052;
    transform: rotate(${({ $open }) => ($open ? "180deg" : "0")});
    transition: transform 0.18s ease;
  }

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.2;
    padding: 10px;
    width: 100%;
    justify-content: center;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  width: 330px;
  padding: 10px;
  border-radius: 12px;
  background: rgba(42, 42, 42, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.34);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transform: translate(-50%, ${({ $open }) => ($open ? "0" : "-8px")});
  transition: opacity 0.18s ease, transform 0.22s ease;
  z-index: 80;

  &::before {
    content: "";
    position: absolute;
    top: -7px;
    left: 50%;
    width: 14px;
    height: 14px;
    background: rgba(42, 42, 42, 0.98);
    border-left: 1px solid rgba(255, 255, 255, 0.06);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    transform: translateX(-50%) rotate(45deg);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CategoryItem = styled.li`
  position: relative;

  &:hover > div {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }
`;

const categoryRowStyles = `
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 48px;
  padding: 8px 12px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #f4f4f4;
  text-decoration: none;
  text-align: left;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.16s ease, color 0.16s ease, transform 0.16s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    transform: translateX(2px);
  }
`;

const CategoryRow = styled(Link)`
  ${categoryRowStyles}
`;

const CategoryLabel = styled.button`
  ${categoryRowStyles}
`;

const CategoryGlyph = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(243, 144, 82, 0.13);
  color: #f39052;
  font-size: 0.78rem;
  font-weight: 800;
`;

const CategoryText = styled.span`
  flex: 1;
  min-width: 0;
`;

const CategoryName = styled.span`
  display: block;
  font-size: 0.98rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CategoryMeta = styled.span`
  display: block;
  margin-top: 2px;
  color: #a8a8a8;
  font-size: 0.74rem;
  font-weight: 500;
`;

const RowChevron = styled(FaChevronRight)`
  width: 12px;
  height: 12px;
  color: #8c8c8c;
  flex-shrink: 0;
`;

const SubMenu = styled.div`
  position: absolute;
  top: -10px;
  left: calc(100% + 10px);
  width: 250px;
  padding: 10px;
  border-radius: 12px;
  background: rgba(36, 36, 36, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.34);
  opacity: 0;
  pointer-events: none;
  transform: translateX(-6px);
  transition: opacity 0.16s ease, transform 0.18s ease;
`;

const SubCategoryLink = styled(Link)`
  display: block;
  padding: 11px 12px;
  border-radius: 8px;
  color: #efefef;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 650;
  transition: background 0.16s ease, color 0.16s ease;

  &:hover {
    background: rgba(243, 144, 82, 0.12);
    color: #f39052;
  }
`;

const EmptyState = styled.div`
  padding: 14px 12px;
  color: #bdbdbd;
  font-size: 0.9rem;
`;

const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 18, 18, 0.98);
  color: #fff;
  z-index: 1200;
  overflow-y: auto;
  padding: 22px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`;

const MobileTitle = styled.h2`
  margin: 0;
  color: #fff;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  width: 42px;
  height: 42px;
  border: 1px solid #333;
  border-radius: 10px;
  background: #222;
  color: #f39052;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MobileCategory = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const MobileMainLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 800;
`;

const MobileMainLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 800;
`;

const MobileSubList = styled.div`
  display: grid;
  gap: 6px;
  margin-top: 10px;
  padding-left: 46px;
`;

const MobileSubLink = styled(Link)`
  color: #d7d7d7;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 8px 0;
`;

function getParentId(category) {
  if (!category?.parent) return null;
  if (typeof category.parent === "string") return category.parent;
  return category.parent._id || String(category.parent);
}

function categoryUrl(category) {
  return category?.slug ? `/categories/${category.slug}` : "/products";
}

function categoryInitial(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || "?";
}

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Greška pri učitavanju kategorija:", error);
      }
    };

    fetchCategories();
  }, []);

  const categoriesTree = useMemo(() => {
    const mainCategories = categories.filter((cat) => !getParentId(cat));
    return mainCategories.map((mainCategory) => ({
      ...mainCategory,
      subcategories: categories.filter((cat) => getParentId(cat) === mainCategory._id),
    }));
  }, [categories]);

  const handleMouseEnter = () => {
    window.clearTimeout(closeTimer.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => setIsOpen(false), 120);
  };

  const closeMenus = () => {
    setIsOpen(false);
    setShowMobileMenu(false);
  };

  return (
    <>
      <DropdownContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Trigger
          type="button"
          $open={isOpen}
          onClick={() => setShowMobileMenu(true)}
          aria-expanded={isOpen || showMobileMenu}
        >
          Kategorije
          <FaChevronDown />
        </Trigger>

        <DropdownMenu $open={isOpen}>
          {categoriesTree.length > 0 ? (
            <CategoryList>
              {categoriesTree.map((category) => (
                <CategoryItem key={category._id}>
                  {category.subcategories.length ? (
                    <CategoryLabel type="button" aria-label={`${category.name} podkategorije`}>
                      <CategoryGlyph>{categoryInitial(category.name)}</CategoryGlyph>
                      <CategoryText>
                        <CategoryName>{category.name}</CategoryName>
                        <CategoryMeta>{category.subcategories.length} podkategorije</CategoryMeta>
                      </CategoryText>
                      <RowChevron />
                    </CategoryLabel>
                  ) : (
                    <CategoryRow href={categoryUrl(category)} onClick={closeMenus}>
                      <CategoryGlyph>{categoryInitial(category.name)}</CategoryGlyph>
                      <CategoryText>
                        <CategoryName>{category.name}</CategoryName>
                        <CategoryMeta>Pogledaj proizvode</CategoryMeta>
                      </CategoryText>
                    </CategoryRow>
                  )}

                  {!!category.subcategories.length && (
                    <SubMenu>
                      {category.subcategories.map((subcategory) => (
                        <SubCategoryLink
                          key={subcategory._id}
                          href={categoryUrl(subcategory)}
                          onClick={closeMenus}
                        >
                          {subcategory.name}
                        </SubCategoryLink>
                      ))}
                    </SubMenu>
                  )}
                </CategoryItem>
              ))}
            </CategoryList>
          ) : (
            <EmptyState>Kategorije trenutno nisu dostupne.</EmptyState>
          )}
        </DropdownMenu>
      </DropdownContainer>

      {showMobileMenu && (
        <MobileMenu>
          <MobileHeader>
            <MobileTitle>Kategorije</MobileTitle>
            <CloseButton type="button" onClick={() => setShowMobileMenu(false)} aria-label="Zatvori">
              <FaTimes />
            </CloseButton>
          </MobileHeader>

          {categoriesTree.length > 0 ? (
            categoriesTree.map((category) => (
              <MobileCategory key={category._id}>
                {category.subcategories.length ? (
                  <MobileMainLabel>
                    <CategoryGlyph>{categoryInitial(category.name)}</CategoryGlyph>
                    {category.name}
                  </MobileMainLabel>
                ) : (
                  <MobileMainLink href={categoryUrl(category)} onClick={closeMenus}>
                    <CategoryGlyph>{categoryInitial(category.name)}</CategoryGlyph>
                    {category.name}
                  </MobileMainLink>
                )}
                {!!category.subcategories.length && (
                  <MobileSubList>
                    {category.subcategories.map((subcategory) => (
                      <MobileSubLink
                        key={subcategory._id}
                        href={categoryUrl(subcategory)}
                        onClick={closeMenus}
                      >
                        {subcategory.name}
                      </MobileSubLink>
                    ))}
                  </MobileSubList>
                )}
              </MobileCategory>
            ))
          ) : (
            <EmptyState>Kategorije trenutno nisu dostupne.</EmptyState>
          )}
        </MobileMenu>
      )}
    </>
  );
}
