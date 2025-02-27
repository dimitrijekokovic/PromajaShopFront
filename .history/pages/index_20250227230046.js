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
import LurePackages from "@/components/LurePackages";
import mongoose from "mongoose";

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
      {featuredProduct ? <Featured product={featuredProduct} /> : null}
      {newProducts.length > 0 ? <NewProducts products={newProducts} /> : null}
      <CategoriesSection categories={categories} />
      {packageProducts.length > 0 ? <LurePackages products={packageProducts} /> : null}
      <BlogSection />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const featuredProductId = "675620f7a9b40bd2e2c288dc";
  await mongooseConnect();
  const featuredProduct = await Product.findOne().sort({ _id: -1 });
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 8 });
  
  const kompletiCategoryId = new mongoose.Types.ObjectId("67bc69cd6f8b77e08f97f244"); // ObjectId kategorije "Kompleti"

  const packageProducts = await Product.find({ category: kompletiCategoryId });
  return {
    props: {
      featuredProduct: featuredProduct ? JSON.parse(JSON.stringify(featuredProduct)) : null,
      newProducts: newProducts.length > 0 ? JSON.parse(JSON.stringify(newProducts)) : [],
      packageProducts: packageProducts.length > 0 ? JSON.parse(JSON.stringify(packageProducts)) : [],
    },
    revalidate: 5, // Osvežava podatke svakih 5 sekundi
  };
}

