import Featured from "@/components/Featured";
import Header from "@/components/Header";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";
import Categories from "@/components/CategoriesSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductsByCategory } from "@/utils/api";
import CategoriesSection from "@/components/CategoriesSection";

export default function HomePage({featuredProduct, newProducts}) {
  const categories = [
    { name: "Vobleri", slug: "vobleri", image: "/vobleri.png" },
    { name: "Twitchevi", slug: "twitchevi", image: "/twitchevi.png" },
    { name: "Kašike", slug: "kasike", image: "/kasike.png" },
    { name: "Silikonci", slug: "silikonci", image: "/silikonci.png" },
    { name: "Majice", slug: "majice", image: "/majice.png" },
    { name: "Glavinjare", slug: "glavinjare", image: "/glavinjare.png" },
  ];
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts} />
      <CategoriesSection categories={categories} />
      <BlogSection />
      <Footer></Footer>
    </div>
  );
}

export async function getStaticProps() {
  const featuredProductId = '675620f7a9b40bd2e2c288dc';
  await mongooseConnect();
  const featuredProduct = await Product.findOne().sort({ _id: -1 });
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 8 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
    revalidate: 60, // Osvežava podatke svakih 60 sekundi
  };
}
