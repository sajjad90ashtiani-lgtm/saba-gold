
/*
 * Home.jsx
 * --------------------------------------------------
 * صفحه اصلی فروشگاه اینترنتی صبا گلد
 *
 * وظایف:
 * - نمایش بنر اصلی و معرفی مجموعه طلا
 * - معرفی دسته‌بندی‌های مختلف محصولات
 * - نمایش محصولات منتخب فروشگاه
 * - معرفی داستان و هویت برند صبا گلد
 * - نمایش نظرات و تجربه مشتریان
 *
 * منابع داده:
 * - products.json: اطلاعات محصولات فروشگاه
 * - categories: اطلاعات دسته‌بندی محصولات
 * - testimonials: نظرات مشتریان
 *
 * کامپوننت‌های مورد استفاده:
 * - ProductCard: نمایش اطلاعات هر محصول
 */

// ==================================================
// وارد کردن کتابخانه‌ها و کامپوننت‌های موردنیاز
// ==================================================

import { Link } from "react-router-dom";

// آیکون‌های مورد استفاده در بخش‌های مختلف صفحه اصلی
import {
  ArrowLeft,
  ArrowUpLeft,
  Quote,
  Sparkles,
} from "lucide-react";

// دریافت اطلاعات محصولات از فایل داده‌های فروشگاه
import products from "../data/products.json";

// کامپوننت اختصاصی نمایش کارت محصولات
import ProductCard from "../components/products/ProductCard";

// ==================================================
// اطلاعات دسته‌بندی محصولات
// ==================================================

// هر دسته‌بندی شامل شناسه، عنوان فارسی، عنوان انگلیسی و تصویر مربوطه است.
// از این اطلاعات برای ساخت کارت‌های دسته‌بندی در صفحه اصلی استفاده می‌شود.

const categories = [
  {
    id: 1,
    title: "انگشتر",
    english: "RINGS",
    image:
      "../../public/Images/gold-ring.png",
  },
  {
    id: 2,
    title: "گردنبند",
    english: "NECKLACES",
    image:
      "../../public/Images/nakelace.png",
  },
  {
    id: 3,
    title: "دستبند",
    english: "BRACELETS",
    image:
      "../../public/Images/braclate.png",
  },
  {
    id: 4,
    title: "گوشواره",
    english: "EARRINGS",
    image:
      "../../public/Images/earring.png",
  },
  {
    id: 5,
    title: "نیم‌ست",
    english: "SETS",
    image:
      "../../public/Images/half-set.png",
  },
  {
    id: 6,
    title: "سرویس طلا",
    english: "GOLD SETS",
    image:
      "../../public/Images/set.png",
  },
  {
    id: 7,
    title: "طلای آب‌شده",
    english: "MELTED GOLD",
    image:
      "../../public/Images/melted-gold.png",
  },
  {
    id: 8,
    title: "سکه پارسیان",
    english: "PERSIAN COINS",
    image:
      "../../public/Images/gold-coin.png",
  },
];

// ==================================================
// اطلاعات نظرات مشتریان
// ==================================================

// داده‌های نمایشی نظرات مشتریان برای بخش تجربه کاربران.
// هر نظر شامل شناسه، نام مشتری و متن دیدگاه است.

const testimonials = [
  {
    id: 1,
    name: "نگار محمدی",
    text: "طراحی محصولات بسیار ظریف و زیباست. بسته‌بندی و ظاهر محصولات هم حس لوکس و خاصی دارد.",
  },
  {
    id: 2,
    name: "الناز رضایی",
    text: "سادگی و زیبایی محصولات صبا گلد را خیلی دوست دارم. انتخاب‌های جذابی برای سلیقه‌های مختلف دارد.",
  },
  {
    id: 3,
    name: "مریم احمدی",
    text: "ترکیب طراحی مدرن با ظرافت طلا چیزی است که در محصولات این مجموعه برایم جذاب است.",
  },
];

// ==================================================
// کامپوننت اصلی صفحه خانه
// ==================================================

function Home() {

  // انتخاب چهار محصول ابتدایی برای نمایش در بخش محصولات منتخب
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="home-page">

      {/* ==================================================
          بخش اول: بنر اصلی صفحه (Hero Banner)
          ================================================== */}

      <section className="hero-section">

        {/* تصویر اصلی مجموعه جواهرات */}
        <div className="hero-image">
          <img
            src="../../public/Images/logo.png"
            alt="مجموعه جواهرات صبا گلد"
          />

          {/* اطلاعات مجموعه نمایش‌داده‌شده روی تصویر */}
          <div className="hero-image-caption">
            <span>THE ART OF GOLD</span>
            <span>18K COLLECTION</span>
          </div>
        </div>

        {/* محتوای متنی و معرفی برند در بنر اصلی */}
        <div className="hero-content">

          <span className="hero-subtitle">
            SABA GOLD COLLECTION
          </span>

          {/* خط تزئینی جداکننده */}
          <div className="hero-line"></div>

          {/* عنوان اصلی صفحه */}
          <h1>
            زیبایی در جزئیات
            <br />
            <span>درخشش در اصالت</span>
          </h1>

          {/* توضیحات کوتاه درباره مجموعه */}
          <p>
            مجموعه‌ای از زیباترین زیورآلات طلا
            برای لحظه‌هایی که می‌خواهند ماندگار شوند.
          </p>

          {/* هدایت کاربر به صفحه فروشگاه */}
          <Link to="/shop" className="hero-button">
            مشاهده محصولات
            <ArrowLeft size={17} />
          </Link>

          {/* عبارت‌های تکمیلی در انتهای بنر */}
          <div className="hero-bottom-text">
            <span>TIMELESS BEAUTY</span>
            <span>DESIGNED FOR YOU</span>
          </div>

        </div>
      </section>

      {/* ==================================================
          بخش دوم: معرفی کوتاه فروشگاه (Introduction)
          ================================================== */}

      <section className="home-intro">

        {/* عنوان انگلیسی بخش */}
        <span>WELCOME TO SABA GOLD</span>

        {/* عنوان اصلی معرفی */}
        <h2>
          زیبایی را با صبا تجربه کن
        </h2>

        {/* توضیحات معرفی برند */}
        <p>
          انتخابی از طلاهای ظریف و ماندگار،
          برای سلیقه‌هایی که به زیبایی اهمیت می‌دهند.
        </p>

      </section>

      {/* ==================================================
          بخش سوم: دسته‌بندی محصولات (Categories)
          ================================================== */}

      <div className="categories-grid">

        {/* ساخت کارت‌های دسته‌بندی با استفاده از آرایه categories */}
        {categories.map((category) => (
          <Link
            to={`/shop?category=${encodeURIComponent(category.title)}`}
            className="category-card"
            key={category.id}
          >

            {/* تصویر مربوط به دسته‌بندی */}
            <img
              className="category-card-image"
              src={category.image}
              alt={category.title}
              loading="lazy"
            />

            {/* لایه تصویری برای ایجاد جلوه بصری روی عکس */}
            <div className="category-card-overlay" />

            {/* عنوان فارسی و انگلیسی دسته‌بندی */}
            <div className="category-content">
              <span>{category.english}</span>
              <h3>{category.title}</h3>
            </div>

            {/* آیکون هدایت کاربر به دسته‌بندی انتخاب‌شده */}
            <div className="category-arrow">
              <ArrowUpLeft size={19} />
            </div>

          </Link>
        ))}

      </div>

      {/* ==================================================
          بخش چهارم: محصولات منتخب (Featured Products)
          ================================================== */}

      <section className="featured-section section-container">

        {/* عنوان بخش و لینک مشاهده تمام محصولات */}
        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              SABA SELECTION
            </span>

            <h2>منتخب صبا گلد</h2>
          </div>

          {/* انتقال به صفحه فروشگاه */}
          <Link to="/shop" className="section-link">
            مشاهده همه محصولات
            <ArrowLeft size={17} />
          </Link>

        </div>

        {/* نمایش محصولات منتخب در قالب کارت‌های اختصاصی */}
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>

      {/* ==================================================
          بخش پنجم: داستان برند (Brand Story)
          ================================================== */}

      <section className="brand-story">

        {/* تصویر مرتبط با هویت و محصولات برند */}
        <div className="brand-story-image">
          <img
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1100"
            alt="ظرافت جواهرات صبا گلد"
            loading="lazy"
          />

          {/* اطلاعات برند روی تصویر */}
          <div className="brand-image-label">
            <span>SABA GOLD</span>
            <span>EST. WITH ELEGANCE</span>
          </div>

        </div>

        {/* محتوای متنی معرفی داستان و ارزش‌های برند */}
        <div className="brand-story-content">

          {/* شماره و عنوان بخش */}
          <span className="brand-story-number">01 / OUR STORY</span>

          {/* آیکون تزئینی معرفی برند */}
          <Sparkles size={27} className="brand-story-icon" />

          <span className="section-eyebrow">
            THE ART OF ELEGANCE
          </span>

          {/* عنوان اصلی داستان برند */}
          <h2>
            هر قطعه طلا،
            <br />
            <span>روایتی از زیبایی</span>
          </h2>

          {/* جداکننده تزئینی */}
          <div className="brand-story-line"></div>

          {/* توضیحات درباره فلسفه و هویت برند */}
          <p>
            در صبا گلد باور داریم هر قطعه طلا،
            فراتر از یک زیور ساده است.
            نتیجه هنر، دقت و ظرافتی است که
            در تک‌تک جزئیات آن جریان دارد.
          </p>

          <p>
            ما تلاش می‌کنیم انتخاب طلا را به
            تجربه‌ای زیبا و ماندگار تبدیل کنیم؛
            انتخابی که با سلیقه شما معنا پیدا می‌کند.
          </p>

          {/* هدایت کاربر به صفحه درباره ما */}
          <Link to="/about" className="story-link">
            آشنایی با صبا گلد
            <ArrowLeft size={17} />
          </Link>

          {/* امضای بصری برند */}
          <div className="brand-story-signature">
            SABA GOLD
          </div>

        </div>
      </section>

      {/* ==================================================
          بخش ششم: نظرات مشتریان (Testimonials)
          ================================================== */}

      <section className="testimonials-section section-container">

        {/* عنوان و توضیحات بخش نظرات */}
        <div className="testimonials-heading">

          <span className="section-eyebrow">
            CUSTOMER EXPERIENCES
          </span>

          <h2>تجربه‌ای از نگاه مشتریان</h2>

          <p>
            زیبایی وقتی ارزشمندتر می‌شود که با رضایت همراه باشد.
          </p>

        </div>

        {/* نمایش نظرات مشتریان در قالب کارت‌های جداگانه */}
        <div className="testimonials-grid">

          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.id}>

              {/* آیکون نقل‌قول و امتیاز نمایشی */}
              <div className="testimonial-top">

                <Quote size={30} className="testimonial-quote" />

                <div className="testimonial-stars">
                  {"★★★★★"}
                </div>

              </div>

              {/* متن دیدگاه مشتری */}
              <p>{item.text}</p>

              {/* اطلاعات هویتی مشتری ثبت‌کننده نظر */}
              <div className="testimonial-author">

                {/* ساخت آواتار متنی با حرف اول نام مشتری */}
                <div className="author-avatar">
                  {item.name.charAt(0)}
                </div>

                <div className="author-info">
                  <strong>{item.name}</strong>
                  <span>مشتری صبا گلد</span>
                </div>

                {/* نشان تزئینی کنار اطلاعات مشتری */}
                <div className="testimonial-verified">
                  <Sparkles size={15} />
                </div>

              </div>

            </article>
          ))}

        </div>
      </section>

    </main>
  );
}

export default Home;
