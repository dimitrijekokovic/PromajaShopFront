import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { PRIORITY_PRODUCT_IDS } from "@/lib/priorityProducts";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 24;
const PRODUCT_LISTING_FIELDS = "title price images stock category";

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function normalizePositiveInt(value, fallback = DEFAULT_PAGE) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

export function normalizeLimit(value, fallback = DEFAULT_LIMIT) {
  return Math.min(normalizePositiveInt(value, fallback), MAX_LIMIT);
}

export async function getProductListing({
  categorySlug = "",
  search = "",
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
} = {}) {
  await mongooseConnect();

  const normalizedPage = normalizePositiveInt(page, DEFAULT_PAGE);
  const normalizedLimit = normalizeLimit(limit, DEFAULT_LIMIT);
  const query = {};
  const cleanCategorySlug = String(categorySlug || "").trim();
  const cleanSearch = String(search || "").trim();
  let category = null;

  if (cleanCategorySlug) {
    category = await Category.findOne({ slug: cleanCategorySlug })
      .select("_id name slug")
      .lean();

    if (!category) {
      return {
        products: [],
        total: 0,
        page: normalizedPage,
        limit: normalizedLimit,
        totalPages: 1,
        category: null,
      };
    }

    query.category = category._id;
  }

  if (cleanSearch) {
    const words = cleanSearch.split(/\s+/).filter(Boolean).map(escapeRegex);
    query.title = { $regex: words.join(".*"), $options: "i" };
  }

  const total = await Product.countDocuments(query);
  const totalPages = Math.max(1, Math.ceil(total / normalizedLimit));
  const safePage = Math.min(normalizedPage, totalPages);
  const skip = (safePage - 1) * normalizedLimit;
  const shouldPinPriorityProducts = !cleanCategorySlug && !cleanSearch;
  let products = [];

  if (shouldPinPriorityProducts) {
    const priorityProducts = await Product.find({
      _id: { $in: PRIORITY_PRODUCT_IDS },
    })
      .select(PRODUCT_LISTING_FIELDS)
      .lean();

    const priorityById = new Map(
      priorityProducts.map((product) => [product._id.toString(), product])
    );
    const orderedPriorityProducts = PRIORITY_PRODUCT_IDS.map((id) =>
      priorityById.get(id)
    ).filter(Boolean);
    const priorityCount = orderedPriorityProducts.length;
    const pageProducts = orderedPriorityProducts.slice(
      skip,
      skip + normalizedLimit
    );
    const remainingLimit = normalizedLimit - pageProducts.length;

    if (remainingLimit > 0) {
      const remainingSkip = Math.max(0, skip - priorityCount);
      const remainingProducts = await Product.find({
        _id: { $nin: PRIORITY_PRODUCT_IDS },
      })
        .sort({ _id: -1 })
        .skip(remainingSkip)
        .limit(remainingLimit)
        .select(PRODUCT_LISTING_FIELDS)
        .lean();

      products = [...pageProducts, ...remainingProducts];
    } else {
      products = pageProducts;
    }
  } else {
    products = await Product.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(normalizedLimit)
      .select(PRODUCT_LISTING_FIELDS)
      .lean();
  }

  return {
    products: JSON.parse(JSON.stringify(products)),
    total,
    page: safePage,
    limit: normalizedLimit,
    totalPages,
    category: category ? JSON.parse(JSON.stringify(category)) : null,
  };
}
