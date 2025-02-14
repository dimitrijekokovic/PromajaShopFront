import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/Center";
import Title from "@/components/Title";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const router = useRouter();
    const { category } = router.query;

    useEffect(() => {
        if (category) {
            axios.get(`/api/products?category=${category}`).then((res) => {
                setProducts(res.data);
                // Možda treba dodatni API poziv da se lepo ime kategorije dobije
                setCategoryName(category.charAt(0).toUpperCase() + category.slice(1));
            });
        } else {
            axios.get("/api/products").then((res) => {
                setProducts(res.data);
                setCategoryName("Svi Proizvodi");
            });
        }
    }, [category]);

    return (
        <>
        <Header></Header>
            <Center>
                <Title>{categoryName}</Title>
                <ProductsGrid products={products} />
            </Center>
            <Footer></Footer>
        </>
    );
}
