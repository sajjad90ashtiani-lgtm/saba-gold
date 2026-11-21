
import { formatPrice } from "../utils/formatPrice";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  ShoppingBag,
  Minus,
  Plus,
  ArrowRight,
  Check,
} from "lucide-react";

import products from "../data/products.json";
import ProductCard from "../components/products/ProductCard";
import { useCart } from "../context/CartContext";

// صفحه جزئیات محصول:
// نمایش اطلاعات کامل محصول، انتخاب ویژگی‌ها، تعیین تعداد
// و افزودن محصول به سبد خرید را مدیریت می‌کند.
function ProductDetails() {
  // دریافت شناسه محصول از پارامترهای آدرس صفحه
  const { id } = useParams();

  // دریافت تابع افزودن محصول به سبد خرید از Context
  const { addToCart } = useCart();

  // جست‌وجوی محصول در اطلاعات ذخیره‌شده بر اساس شناسه موجود در URL
  const product = products.find(
    (item) => item.id === Number(id)
  );

  // وضعیت انتخاب‌های کاربر:
  // تعداد محصول، رنگ انتخاب‌شده و سایز انگشتر
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("زرد");
  const [selectedSize, setSelectedSize] = useState("");

  // در صورت معتبر نبودن شناسه یا پیدا نشدن محصول،
  // پیام مناسب نمایش داده می‌شود و امکان بازگشت به فروشگاه وجود دارد.
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>محصول مورد نظر پیدا نشد!</h2>
        <Link to="/shop">بازگشت به فروشگاه</Link>
      </div>
    );
  }

  // استخراج حداکثر چهار محصول مشابه:
  // محصولات باید هم‌دسته با محصول فعلی باشند و شناسه متفاوتی داشته باشند.
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="product-details-page">
      <div className="product-details-container">

        {/* مسیر راهنما برای نمایش موقعیت فعلی کاربر در فروشگاه */}
        <div className="product-breadcrumb">
          <Link to="/">خانه</Link>
          <ArrowRight size={14} />
          <Link to="/shop">فروشگاه</Link>
          <ArrowRight size={14} />
          <span>{product.name}</span>
        </div>

        {/* بخش اصلی صفحه شامل تصویر و اطلاعات محصول */}
        <section className="product-main">

          {/* نمایش تصویر اصلی محصول */}
          <div className="product-gallery">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          {/* اطلاعات، مشخصات و گزینه‌های قابل انتخاب محصول */}
          <div className="product-information">

            {/* دسته‌بندی و نام محصول */}
            <span className="product-details-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            {/* توضیحات تکمیلی محصول */}
            <p className="product-description">
              {product.description}
            </p>

            {/* نمایش قیمت با استفاده از تابع قالب‌بندی قیمت */}
            <div className="product-detail-price">
              {formatPrice(product.price)}
            </div>

            {/* مشخصات فنی و اطلاعات محصول */}
            <div className="product-specifications">

              <div>
                <span>وزن</span>
                <strong>{product.weight} گرم</strong>
              </div>

              <div>
                <span>عیار</span>
                <strong>{product.karat}</strong>
              </div>

              <div>
                <span>اجرت</span>
                <strong>{formatPrice(product.wage)}</strong>
              </div>

              <div>
                <span>رنگ</span>
                <strong>طلای {product.color}</strong>
              </div>

            </div>

            {/* انتخاب رنگ محصول و مشخص کردن گزینه فعال */}
            <div className="product-option">
              <h3>رنگ طلا</h3>

              <div className="color-options">
                {["زرد", "سفید", "رزگلد"].map((color) => (
                  <button
                    key={color}
                    className={
                      selectedColor === color ? "selected" : ""
                    }
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <Check size={14} />
                    )}

                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* نمایش گزینه انتخاب سایز فقط برای محصولات دسته انگشتر */}
            {product.category === "انگشتر" && (
              <div className="product-option">
                <h3>سایز انگشتر</h3>

                <select
                  value={selectedSize}
                  onChange={(event) =>
                    setSelectedSize(event.target.value)
                  }
                >
                  <option value="">انتخاب سایز</option>

                  {[48, 50, 52, 54, 56, 58, 60].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* بخش تعیین تعداد و افزودن محصول به سبد خرید */}
            <div className="product-purchase">

              {/* کنترل تعداد محصول با محدودیت حداقل یک عدد */}
              <div className="quantity-control">

                <button
                  onClick={() =>
                    setQuantity((old) => Math.max(1, old - 1))
                  }
                  aria-label="کاهش تعداد"
                >
                  <Minus size={16} />
                </button>

                {/* نمایش تعداد با اعداد فارسی */}
                <span>
                  {new Intl.NumberFormat("fa-IR").format(quantity)}
                </span>

                <button
                  onClick={() =>
                    setQuantity((old) => old + 1)
                  }
                  aria-label="افزایش تعداد"
                >
                  <Plus size={16} />
                </button>

              </div>

              {/* ارسال اطلاعات محصول و انتخاب‌های کاربر به سبد خرید */}
              <button
                className="add-to-cart-button"
                onClick={() => {
                  addToCart(
                    product,
                    quantity,
                    selectedColor,
                    selectedSize
                  );

                  // نمایش پیام تأیید پس از افزودن محصول
                  alert("محصول به سبد خرید اضافه شد.");
                }}
                // تا زمان انتخاب سایز، افزودن انگشتر به سبد خرید غیرفعال است.
                disabled={
                  product.category === "انگشتر" && !selectedSize
                }
              >
                <ShoppingBag size={19} />
                افزودن به سبد خرید
              </button>

            </div>

            {/* نمایش پیام اطمینان‌بخش درباره عیار و مشخصات محصول */}
            <p className="product-guarantee">
              <Check size={16} />
              محصول با عیار ۱۸ و مشخصات ثبت‌شده
            </p>

          </div>

        </section>

        {/* نمایش محصولات هم‌دسته با محصول فعلی، در صورت وجود */}
        {relatedProducts.length > 0 && (
          <section className="related-products">

            {/* عنوان بخش و لینک مشاهده تمام محصولات فروشگاه */}
            <div className="section-heading">

              <div>
                <span className="section-eyebrow">
                  YOU MAY ALSO LIKE
                </span>

                <h2>محصولات مشابه</h2>
              </div>

              <Link to="/shop">
                مشاهده فروشگاه
              </Link>

            </div>

            {/* استفاده مجدد از کامپوننت ProductCard برای نمایش محصولات مشابه */}
            <div className="products-grid">

              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}

            </div>

          </section>
        )}

      </div>
    </main>
  );
}

export default ProductDetails;
