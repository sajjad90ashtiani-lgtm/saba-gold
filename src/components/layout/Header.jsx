
/*
 * Header.jsx
 * --------------------------------------------------
 * کامپوننت هدر اصلی فروشگاه صبا گلد
 *
 * وظایف:
 * - نمایش لوگو و لینک‌های ناوبری فروشگاه
 * - مدیریت منوی مخصوص نمایشگرهای موبایل
 * - فراهم کردن امکان جست‌وجوی محصولات
 * - مدیریت تغییر تم روشن و تاریک
 * - نمایش تعداد محصولات موجود در سبد خرید
 * - مدیریت پنل کشویی سبد خرید
 * - امکان مشاهده، حذف و تغییر تعداد محصولات سبد خرید
 */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// آیکون‌های مورد استفاده در بخش‌های مختلف هدر
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  Sun,
  Moon,
  ArrowLeft,
} from "lucide-react";

import { Minus, Plus } from "lucide-react";

// ==================================================
// کامپوننت اصلی هدر
// ==================================================

function Header() {

  // --------------------------------------------------
  // وضعیت منوها و پنل‌های مختلف
  // --------------------------------------------------

  // کنترل باز و بسته بودن منوی موبایل
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // کنترل نمایش پنل کشویی سبد خرید
  const [cartOpen, setCartOpen] = useState(false);

  // کنترل نمایش کادر جست‌وجو
  const [searchOpen, setSearchOpen] = useState(false);

  // نگهداری متن واردشده توسط کاربر در کادر جست‌وجو
  const [searchText, setSearchText] = useState("");

  // --------------------------------------------------
  // دریافت اطلاعات و عملیات سبد خرید
  // --------------------------------------------------

  // استفاده از CartContext برای دسترسی به اطلاعات سبد خرید
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // --------------------------------------------------
  // مدیریت تم ظاهری سایت
  // --------------------------------------------------

  // بازیابی تم ذخیره‌شده در مرورگر
  // در صورت نبود مقدار ذخیره‌شده، تم روشن انتخاب می‌شود.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("saba-theme") || "light";
  });

  // ابزار تغییر مسیر صفحات
  const navigate = useNavigate();

  // اعمال تم انتخاب‌شده روی کل سند و ذخیره آن در مرورگر
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("saba-theme", theme);
  }, [theme]);

  // جابه‌جایی بین تم روشن و تاریک
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  // --------------------------------------------------
  // مدیریت وضعیت منوها
  // --------------------------------------------------

  // بستن تمام منوها و پنل‌های قابل نمایش در هدر
  const closeMenus = () => {
    setMobileMenuOpen(false);
    setCartOpen(false);
    setSearchOpen(false);
  };

  // --------------------------------------------------
  // مدیریت جست‌وجوی محصولات
  // --------------------------------------------------

  // جلوگیری از ارسال عادی فرم و انتقال کاربر به صفحه فروشگاه
  const handleSearch = (event) => {
    event.preventDefault();

    // فقط در صورت وارد شدن عبارت غیرخالی، جست‌وجو انجام می‌شود.
    if (searchText.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchText.trim())}`);

      // پاک کردن عبارت جست‌وجو و بستن کادر آن
      setSearchText("");
      setSearchOpen(false);
    }
  };

  // --------------------------------------------------
  // لینک‌های اصلی ناوبری فروشگاه
  // --------------------------------------------------

  // این آرایه برای نمایش یکسان لینک‌ها در منوی دسکتاپ و موبایل استفاده می‌شود.
  const navLinks = [
    { title: "خانه", path: "/" },
    { title: "فروشگاه", path: "/shop" },
    { title: "درباره ما", path: "/about" },
    { title: "تماس با ما", path: "/contact" },
  ];

  // ==================================================
  // ساختار ظاهری هدر و پنل‌های وابسته
  // ==================================================

  return (
    <>
      {/* ==================================================
          هدر اصلی فروشگاه
          ================================================== */}

      <header className="site-header">
        <div className="header-inner">

          {/* منوی ناوبری نسخه دسکتاپ */}
          <nav className="header-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenus}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* دکمه باز کردن منوی موبایل */}
          <button
            className="mobile-menu"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="باز کردن منو"
          >
            <Menu />
          </button>

          {/* لوگوی مرکزی برند و لینک بازگشت به صفحه اصلی */}
          <Link to="/" className="brand-logo" onClick={closeMenus}>
            <span>صبا گلد</span>
            <small>SABA GOLD</small>
          </Link>

          {/* ==================================================
              دکمه‌ها و ابزارهای هدر
              ================================================== */}

          <div className="header-actions">

            {/* نمایش و مخفی کردن کادر جست‌وجو */}
            <button
              aria-label="جست‌وجو"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search />
            </button>

            {/* انتقال کاربر به صفحه ورود */}
            <button
              aria-label="حساب کاربری"
              onClick={() => navigate("/login")}
            >
              <UserRound />
            </button>

            {/* تغییر بین تم روشن و تاریک */}
            <button
              aria-label="تغییر تم"
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>

            {/* باز کردن سبد خرید و نمایش تعداد محصولات */}
            <button
              className="cart-button"
              aria-label="سبد خرید"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag />

              {/* نمایش نشان تعداد فقط در صورت وجود محصول در سبد خرید */}
              {cartCount > 0 && (
                <span className="cart-count">
                  {new Intl.NumberFormat("fa-IR").format(cartCount)}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* ==================================================
            کادر جست‌وجوی محصولات
            ================================================== */}

        {searchOpen && (
          <form className="search-panel" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="نام محصول موردنظر را وارد کنید..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              autoFocus
            />

            {/* ارسال عبارت جست‌وجو */}
            <button type="submit" aria-label="جست‌وجو">
              <Search />
            </button>

            {/* بستن کادر جست‌وجو */}
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="بستن جست‌وجو"
            >
              <X />
            </button>
          </form>
        )}
      </header>

      {/* ==================================================
          پس‌زمینه تاریک پنل‌های کشویی
          ================================================== */}

      {/* با کلیک روی پس‌زمینه، منوهای باز بسته می‌شوند. */}
      {(cartOpen || mobileMenuOpen) && (
        <div className="drawer-overlay" onClick={closeMenus} />
      )}

      {/* ==================================================
          منوی کشویی نسخه موبایل
          ================================================== */}

      <aside className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>

        {/* عنوان منو و دکمه بستن */}
        <div className="drawer-header">
          <span>منوی صبا گلد</span>

          <button onClick={() => setMobileMenuOpen(false)}>
            <X />
          </button>
        </div>

        {/* لینک‌های ناوبری نسخه موبایل */}
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenus}
            >
              {link.title}
              <ArrowLeft size={16} />
            </Link>
          ))}
        </nav>

        {/* شعار برند در انتهای منوی موبایل */}
        <p className="drawer-caption">
          درخشش طلا در زحمت پشت آن نهفته است.
        </p>
      </aside>

      {/* ==================================================
          پنل کشویی سبد خرید
          ================================================== */}

      {/* پس‌زمینه قابل کلیک برای بستن پنل سبد خرید */}
      {cartOpen && (
        <button
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
          aria-label="بستن پنل سبد خرید"
        />
      )}

      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`}>

        {/* --------------------------------------------------
            سربرگ پنل سبد خرید
            -------------------------------------------------- */}

        <div className="drawer-header">
          <div>
            <h3>سبد خرید</h3>

            {/* نمایش تعداد کل محصولات موجود در سبد خرید */}
            <span>
              {new Intl.NumberFormat("fa-IR").format(cartCount)}
              {" "}محصول در سبد خرید
            </span>
          </div>

          {/* بستن پنل سبد خرید */}
          <button onClick={() => setCartOpen(false)}>
            <X />
          </button>
        </div>

        {/* --------------------------------------------------
            بررسی خالی بودن سبد خرید
            -------------------------------------------------- */}

        {cart.length === 0 ? (
          // نمایش پیام و دکمه هدایت به فروشگاه در صورت خالی بودن سبد
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={35} />
            </div>

            <h3>سبد خرید شما خالی است!</h3>

            <p>
              هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
            </p>

            {/* انتقال به فروشگاه برای مشاهده محصولات */}
            <button
              className="gold-button"
              onClick={() => {
                setCartOpen(false);
                navigate("/shop");
              }}
            >
              مشاهده محصولات
              <ArrowLeft size={17} />
            </button>
          </div>
        ) : (
          // نمایش محصولات و خلاصه سفارش در صورت خالی نبودن سبد
          <>
            {/* --------------------------------------------------
                فهرست محصولات موجود در سبد خرید
                -------------------------------------------------- */}

            <div className="drawer-cart-items">
              {cart.map((item) => (
                <div className="drawer-cart-item" key={item.cartId}>

                  {/* تصویر محصول */}
                  <img src={item.image} alt={item.name} />

                  <div className="drawer-cart-info">

                    {/* نام محصول */}
                    <strong>{item.name}</strong>

                    {/* کنترل افزایش و کاهش تعداد محصول */}
                    <div className="drawer-quantity">

                      {/* کاهش تعداد محصول انتخاب‌شده */}
                      <button
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity - 1)
                        }
                        aria-label="کاهش تعداد"
                      >
                        <Minus size={14} />
                      </button>

                      {/* نمایش تعداد فعلی محصول */}
                      <span>
                        {new Intl.NumberFormat("fa-IR").format(item.quantity)}
                      </span>

                      {/* افزایش تعداد محصول انتخاب‌شده */}
                      <button
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity + 1)
                        }
                        aria-label="افزایش تعداد"
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                    {/* محاسبه و نمایش قیمت محصول بر اساس تعداد انتخاب‌شده */}
                    <strong>
                      {new Intl.NumberFormat("fa-IR").format(
                        item.price * item.quantity
                      )} تومان
                    </strong>

                    {/* حذف محصول از سبد خرید */}
                    <button onClick={() => removeFromCart(item.cartId)}>
                      حذف محصول
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* --------------------------------------------------
                خلاصه سفارش و مبلغ نهایی
                -------------------------------------------------- */}

            <div className="drawer-cart-summary">
              <div>
                <span>جمع کل</span>

                {/* نمایش مجموع قیمت تمام محصولات سبد خرید */}
                <strong>
                  {new Intl.NumberFormat("fa-IR").format(cartTotal)} تومان
                </strong>
              </div>

              {/* انتقال به صفحه اصلی سبد خرید */}
              <button
                className="gold-button"
                onClick={() => {
                  setCartOpen(false);
                  navigate("/cart");
                }}
              >
                مشاهده سبد خرید
                <ArrowLeft size={17} />
              </button>
            </div>
          </>
        )}

        {/* --------------------------------------------------
            فوتر پنل سبد خرید
            -------------------------------------------------- */}

        <div className="drawer-footer">
          <span>صبا گلد</span>
          <span>انتخابی برای درخشش بیشتر</span>
        </div>

      </aside>
    </>
  );
}

export default Header;
