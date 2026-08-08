import { useMemo, useState, useEffect } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({ activeCategory = "Todos", onCategoryChange, searchQuery = "", onProductSelect }) {
  const [customProducts, setCustomProducts] = useState([]);
  const [localCategory, setLocalCategory] = useState(activeCategory);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("customProducts");
      setCustomProducts(stored ? JSON.parse(stored) : []);
    } catch {
      setCustomProducts([]);
    }
  }, []);

  useEffect(() => {
    // if parent controls category, keep localCategory in sync; otherwise preserve user selection
    if (typeof onCategoryChange === "function") {
      setLocalCategory(activeCategory);
    }
  }, [activeCategory, onCategoryChange]);

  const merged = useMemo(() => {
    const map = new Map(PRODUCTS.map((p) => [p.id, p]));
    (customProducts || []).forEach((c) => {
      if (!c.id) return;
      const base = map.get(c.id) || {};
      map.set(c.id, { ...base, ...c });
    });
    return Array.from(map.values());
  }, [customProducts]);

  const filtered = useMemo(() => {
    const selectedCategory = typeof onCategoryChange === "function" ? activeCategory : localCategory;
    const byCategory = selectedCategory && selectedCategory !== "Todos"
      ? merged.filter((p) => p.category === selectedCategory)
      : merged;

    const q = searchQuery.trim().toLowerCase();
    if (!q) return byCategory;

    return byCategory.filter((product) => product.name.toLowerCase().includes(q));
  }, [activeCategory, merged, searchQuery, localCategory, onCategoryChange]);

  return (
    <>
      <div className="catalog-filters">
        <div className="chips" role="tablist" aria-label="Filtrar por categoría">
          {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={(typeof onCategoryChange === "function" ? activeCategory : localCategory) === cat}
                className={`chip ${(typeof onCategoryChange === "function" ? activeCategory : localCategory) === cat ? "chip-active" : ""}`}
                onClick={() => {
                  if (typeof onCategoryChange === "function") onCategoryChange(cat);
                  else setLocalCategory(cat);
                }}
              >
                {cat}
              </button>
            ))}
        </div>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={onProductSelect} />
        ))}
      </div>
    </>
  );
}
