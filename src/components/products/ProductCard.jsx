
/*
 * ProductCard.jsx
 * --------------------------------------------------
 * کامپوننت کارت نمایش محصول در فروشگاه صبا گلد
 *
 * وظایف:
 * - نمایش تصویر و دسته‌بندی محصول
 * - نمایش عیار و اطلاعات فنی طلا
 * - نمایش نام و قیمت محصول
 * - فراهم کردن لینک ورود به صفحه جزئیات محصول
 *
 * ورودی:
 * - product: شیء حاوی اطلاعات محصول که از کامپوننت والد دریافت می‌شود.
 */

import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// ==================================================
// کامپوننت نمایش کارت محصول
// ==================================================

function ProductCard({ product }) {
  return (
    <article className="product-card">

      {/* ==================================================
          بخش تصویر و اطلاعات اولیه محصول
          ================================================== */}

      {/* با کلیک روی تصویر، کاربر به صفحه جزئیات همان محصول منتقل می‌شود. */}
      <Link
        to={`/product/${product.id}`}
        className="product-image"
      >
        {/* تصویر محصول با بارگذاری تنبل برای بهبود عملکرد صفحه */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {/* نمایش دسته‌بندی محصول روی تصویر */}
        <span className="product-category">
          {product.category}
        </span>

        {/* نمایش عیار طلای محصول */}
        <span className="product-karat">
          {product.karat} عیار
        </span>

        {/* راهنمای ورود به صفحه جزئیات محصول */}
        <span className="product-view">
          مشاهده محصول
          <ArrowLeft size={15} />
        </span>
      </Link>

      {/* ==================================================
          بخش اطلاعات و مشخصات محصول
          ================================================== */}

      <div className="product-info">

        {/* نمایش دسته‌بندی محصول در بخش اطلاعات */}
        <span className="product-info-category">
          {product.category}
        </span>

        {/* نام محصول و لینک ورود به صفحه جزئیات آن */}
        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        {/* مشخصات فیزیکی و ظاهری محصول */}
        <div className="product-details">

          {/* وزن محصول بر حسب گرم */}
          <span>
            وزن: {product.weight} گرم
          </span>

          {/* رنگ طلای استفاده‌شده در محصول */}
          <span>
            طلای {product.color}
          </span>

        </div>

        {/* ==================================================
            بخش قیمت محصول
            ================================================== */}

        <div className="product-bottom">

          {/* قالب‌بندی قیمت با تابع مشترک پروژه */}
          <strong>
            {formatPrice(product.price)}
          </strong>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;
