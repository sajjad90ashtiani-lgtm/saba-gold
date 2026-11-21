
/*
 * Shop.jsx
 * --------------------------------------------------
 * صفحه فروشگاه و نمایش محصولات صبا گلد
 *
 * وظایف:
 * - نمایش فهرست محصولات فروشگاه
 * - جست‌وجوی محصولات بر اساس نام
 * - فیلتر محصولات بر اساس دسته‌بندی
 * - محدود کردن نتایج بر اساس محدوده قیمت
 * - محدود کردن نتایج بر اساس محدوده وزن
 * - نمایش تعداد محصولات مطابق با فیلترها
 * - امکان پاک کردن تمام فیلترهای انتخاب‌شده
 *
 * منابع داده:
 * - products.json: اطلاعات محصولات فروشگاه
 *
 * کامپوننت‌های مورد استفاده:
 * - ProductCard: نمایش کارت هر محصول
 *
 * قابلیت‌های مورد استفاده:
 * - useState: مدیریت وضعیت جست‌وجو و فیلترها
 * - useMemo: محاسبه و فیلتر کردن محصولات
 * - useSearchParams: مدیریت پارامترهای جست‌وجو در آدرس مرورگر
 */

// ==================================================
// وارد کردن کتابخانه‌ها و کامپوننت‌های موردنیاز
// ==================================================

// تابع قالب‌بندی اعداد به شکل فارسی
import { formatNumber } from "../utils/formatPrice";

// ابزارهای مدیریت وضعیت و بهینه‌سازی محاسبات
import { useMemo, useState } from "react";

// ابزار مدیریت پارامترهای آدرس و لینک‌های صفحات
import { useSearchParams, Link } from "react-router-dom";

// آیکون‌های مورد استفاده در بخش جست‌وجو و فیلترها
import { Search, SlidersHorizontal, X } from "lucide-react";

// دریافت اطلاعات محصولات از فایل JSON
import products from "../data/products.json";

// کامپوننت اختصاصی نمایش کارت محصولات
import ProductCard from "../components/products/ProductCard";

// ==================================================
// فهرست دسته‌بندی‌های قابل انتخاب در فروشگاه
// ==================================================

// این آرایه مبنای ساخت گزینه‌های فیلتر دسته‌بندی است.

const categories = [
  "همه محصولات",
  "انگشتر",
  "گردنبند",
  "دستبند",
  "گوشواره",
  "نیم ست",
  "سرویس طلا",
  "آبشده",
  "سکه پارسیان",
];

// ==================================================
// کامپوننت اصلی صفحه فروشگاه
// ==================================================

function Shop() {

  // --------------------------------------------------
  // دریافت و مدیریت پارامترهای آدرس مرورگر
  // --------------------------------------------------

  // خواندن و تغییر پارامترهایی مانند search و category در URL
  const [searchParams, setSearchParams] = useSearchParams();

  // --------------------------------------------------
  // وضعیت جست‌وجو و فیلترهای محصولات
  // --------------------------------------------------

  // دریافت عبارت جست‌وجو از URL در صورت وجود
  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  // دریافت دسته‌بندی انتخاب‌شده از URL
  const [category, setCategory] = useState(
    searchParams.get("category") || "همه محصولات"
  );

  // حداقل و حداکثر قیمت موردنظر کاربر
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // حداقل و حداکثر وزن موردنظر کاربر
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");

  // ==================================================
  // فیلتر کردن محصولات
  // ==================================================

  // useMemo نتیجه فیلتر را تا زمانی که ورودی‌های مرتبط تغییر نکرده‌اند
  // نگهداری می‌کند تا محاسبات غیرضروری تکرار نشوند.

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      // بررسی وجود عبارت جست‌وجو در نام محصول
      // تبدیل حروف به حالت کوچک برای مقایسه بدون حساسیت به بزرگی حروف
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      // بررسی تطابق دسته‌بندی محصول با دسته‌بندی انتخاب‌شده
      const matchesCategory =
        category === "همه محصولات" ||
        product.category === category;

      // بررسی رعایت حداقل قیمت تعیین‌شده
      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      // بررسی رعایت حداکثر قیمت تعیین‌شده
      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      // بررسی رعایت حداقل وزن تعیین‌شده
      const matchesMinWeight =
        minWeight === "" || product.weight >= Number(minWeight);

      // بررسی رعایت حداکثر وزن تعیین‌شده
      const matchesMaxWeight =
        maxWeight === "" || product.weight <= Number(maxWeight);

      // محصول فقط زمانی نمایش داده می‌شود که تمام شرایط فیلتر را داشته باشد.
      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinWeight &&
        matchesMaxWeight
      );
    });

  }, [search, category, minPrice, maxPrice, minWeight, maxWeight]);

  // ==================================================
  // مدیریت تغییر عبارت جست‌وجو
  // ==================================================

  // به‌روزرسانی عبارت جست‌وجو و هماهنگ کردن آن با URL
  function handleSearchChange(value) {
    setSearch(value);

    // ایجاد نسخه جدیدی از پارامترهای فعلی آدرس
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      // ثبت عبارت جست‌وجو در URL در صورت خالی نبودن آن
      if (value.trim()) {
        next.set("search", value);
      } else {
        // حذف پارامتر search در صورت پاک شدن عبارت جست‌وجو
        next.delete("search");
      }

      return next;
    });
  }

  // ==================================================
  // بازنشانی تمام فیلترهای فروشگاه
  // ==================================================

  // بازگرداندن وضعیت جست‌وجو و فیلترها به حالت اولیه
  function resetFilters() {
    setSearch("");
    setCategory("همه محصولات");
    setMinPrice("");
    setMaxPrice("");
    setMinWeight("");
    setMaxWeight("");

    // پاک کردن تمام پارامترهای جست‌وجو از آدرس مرورگر
    setSearchParams({});
  }

  // ==================================================
  // ساختار ظاهری صفحه فروشگاه
  // ==================================================

  return (
    <main className="shop-page">
      <div className="shop-container">

        {/* ==================================================
            بخش اول: عنوان فروشگاه و تعداد نتایج
            ================================================== */}

        <div className="shop-heading">

          <div>
            <span className="section-eyebrow">SABA GOLD COLLECTION</span>

            <h1>فروشگاه صبا گلد</h1>

            <p>زیبایی را در جزئیات انتخاب کن.</p>
          </div>

          {/* نمایش تعداد محصولاتی که با فیلترها مطابقت دارند */}
          <div className="shop-result-count">
            {formatNumber(filteredProducts.length)} محصول
          </div>

        </div>

        {/* ==================================================
            بخش دوم: نوار جست‌وجوی محصولات
            ================================================== */}

        <div className="shop-search">

          <Search size={20} />

          {/* ورودی جست‌وجو بر اساس نام محصول */}
          <input
            type="text"
            placeholder="نام محصول مورد نظرت رو جست‌وجو کن..."
            value={search}
            onChange={(event) =>
              handleSearchChange(event.target.value)
            }
          />

          {/* نمایش دکمه پاک کردن در صورت وارد شدن عبارت جست‌وجو */}
          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              aria-label="پاک کردن جست‌وجو"
            >
              <X size={18} />
            </button>
          )}

        </div>

        {/* ==================================================
            بخش سوم: ساختار فیلترها و محصولات
            ================================================== */}

        <div className="shop-layout">

          {/* --------------------------------------------------
              ستون فیلترهای فروشگاه
              -------------------------------------------------- */}

          <aside className="shop-filters">

            {/* عنوان بخش فیلترها */}
            <div className="filter-title">
              <SlidersHorizontal size={19} />
              <h2>فیلتر محصولات</h2>
            </div>

            {/* --------------------------------------------------
                فیلتر بر اساس دسته‌بندی
                -------------------------------------------------- */}

            <div className="filter-group">
              <h3>دسته‌بندی</h3>

              {/* تولید دکمه‌های دسته‌بندی از روی آرایه categories */}
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    category === item
                      ? "filter-category active"
                      : "filter-category"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* --------------------------------------------------
                فیلتر بر اساس محدوده قیمت
                -------------------------------------------------- */}

            <div className="filter-group">
              <h3>محدوده قیمت (تومان)</h3>

              {/* تعیین حداقل قیمت قابل قبول */}
              <input
                type="number"
                min="0"
                placeholder="حداقل قیمت"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />

              {/* تعیین حداکثر قیمت قابل قبول */}
              <input
                type="number"
                min="0"
                placeholder="حداکثر قیمت"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </div>

            {/* --------------------------------------------------
                فیلتر بر اساس محدوده وزن
                -------------------------------------------------- */}

            <div className="filter-group">
              <h3>محدوده وزن (گرم)</h3>

              {/* تعیین حداقل وزن محصول */}
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="حداقل وزن"
                value={minWeight}
                onChange={(event) => setMinWeight(event.target.value)}
              />

              {/* تعیین حداکثر وزن محصول */}
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="حداکثر وزن"
                value={maxWeight}
                onChange={(event) => setMaxWeight(event.target.value)}
              />
            </div>

            {/* پاک کردن جست‌وجو و تمام فیلترهای فعال */}
            <button
              type="button"
              className="reset-filters"
              onClick={resetFilters}
            >
              حذف همه فیلترها
            </button>

          </aside>

          {/* --------------------------------------------------
              ستون نمایش محصولات
              -------------------------------------------------- */}

          <section className="shop-products">

            {/* عنوان بخش و تعداد محصولات قابل نمایش */}
            <div className="shop-products-top">
              <span>محصولات صبا گلد</span>

              <span>
                نمایش {formatNumber(filteredProducts.length)} محصول
              </span>
            </div>

            {/* --------------------------------------------------
                بررسی وجود محصولات مطابق با فیلترها
                -------------------------------------------------- */}

            {filteredProducts.length > 0 ? (

              // نمایش کارت محصولات در صورت وجود نتیجه
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

            ) : (

              // نمایش پیام مناسب در صورت پیدا نشدن محصول
              <div className="no-products">

                <Search size={35} />

                <h3>محصولی پیدا نشد!</h3>

                <p>
                  عبارت جست‌وجو یا فیلترهای انتخابی رو تغییر بده.
                </p>

                {/* بازگرداندن فروشگاه به حالت نمایش همه محصولات */}
                <button onClick={resetFilters}>
                  نمایش همه محصولات
                </button>

              </div>
            )}

          </section>

        </div>
      </div>
    </main>
  );
}

export default Shop;
