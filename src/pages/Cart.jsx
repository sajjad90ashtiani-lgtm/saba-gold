
import { formatPrice } from "../utils/formatPrice";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "../context/CartContext";

// صفحه سبد خرید:
// نمایش محصولات انتخاب‌شده، مدیریت تعداد، حذف محصولات
// و محاسبه مبلغ نهایی سفارش را بر عهده دارد.
function Cart() {
  // دریافت اطلاعات و توابع مدیریت سبد خرید از CartContext
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  // در صورتی که سبد خرید خالی باشد،
  // به‌جای فهرست محصولات، پیام مناسب نمایش داده می‌شود.
  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <ShoppingBag size={55} />
            <h1>سبد خرید شما خالی است</h1>
            <p>هنوز محصولی به سبد خرید اضافه نکرده‌اید.</p>

            {/* هدایت کاربر به صفحه فروشگاه برای انتخاب محصولات */}
            <Link to="/shop" className="continue-shopping">
              مشاهده محصولات
              <ArrowLeft size={17} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">

        {/* عنوان صفحه و نمایش تعداد کل محصولات موجود در سبد خرید */}
        <div className="cart-heading">
          <div>
            <span className="section-eyebrow">
              YOUR SHOPPING BAG
            </span>
            <h1>سبد خرید</h1>
          </div>

          <span>{cartCount} عدد محصول</span>
        </div>

        {/* چیدمان اصلی صفحه شامل فهرست محصولات و خلاصه سفارش */}
        <div className="cart-layout">

          {/* بخش نمایش و مدیریت محصولات انتخاب‌شده */}
          <section className="cart-items">

            {/* پیمایش محصولات موجود در سبد خرید */}
            {cart.map((item) => (
              <article className="cart-item" key={item.cartId}>

                {/* تصویر محصول */}
                <img
                  src={item.image}
                  alt={item.name}
                />

                {/* اطلاعات و مشخصات محصول انتخاب‌شده */}
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`}>
                    {item.name}
                  </Link>

                  <span>وزن: {item.weight} گرم</span>
                  <span>عیار: {item.karat}</span>
                  <span>رنگ: {item.color}</span>

                  {/* نمایش سایز فقط برای محصولاتی که سایز دارند */}
                  {item.size && (
                    <span>سایز: {item.size}</span>
                  )}

                  {/* قیمت هر واحد محصول */}
                  <strong>
                    {formatPrice(item.price)}
                  </strong>
                </div>

                {/* کنترل تعداد، حذف محصول و نمایش قیمت نهایی آن */}
                <div className="cart-item-actions">

                  {/* تغییر تعداد محصول با استفاده از تابع updateQuantity */}
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.cartId,
                          item.quantity - 1
                        )
                      }
                      aria-label="کاهش تعداد"
                    >
                      <Minus size={15} />
                    </button>

                    {/* نمایش تعداد با اعداد فارسی */}
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(item.quantity)}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.cartId,
                          item.quantity + 1
                        )
                      }
                      aria-label="افزایش تعداد"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  {/* حذف محصول مشخص‌شده از سبد خرید */}
                  <button
                    className="remove-cart-item"
                    onClick={() => removeFromCart(item.cartId)}
                  >
                    <Trash2 size={16} />
                    حذف
                  </button>

                  {/* محاسبه قیمت کل هر محصول بر اساس تعداد انتخاب‌شده */}
                  <strong className="cart-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </strong>

                </div>

              </article>
            ))}

            {/* عملیات مربوط به کل سبد خرید */}
            <div className="cart-bottom-actions">

              {/* بازگشت به فروشگاه بدون حذف محصولات */}
              <Link to="/shop">
                <ArrowLeft size={16} />
                ادامه خرید
              </Link>

              {/* حذف تمام محصولات موجود در سبد خرید */}
              <button onClick={clearCart}>
                خالی کردن سبد خرید
              </button>
            </div>

          </section>

          {/* خلاصه سفارش و نمایش مبالغ محاسبه‌شده */}
          <aside className="cart-summary">
            <h2>خلاصه سفارش</h2>

            {/* تعداد کل واحدهای محصول در سبد خرید */}
            <div className="summary-row">
              <span>تعداد محصولات</span>
              <strong>{cartCount}</strong>
            </div>

            {/* مجموع قیمت تمام محصولات */}
            <div className="summary-row">
              <span>جمع کل</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            {/* مبلغ نهایی قابل پرداخت در سفارش فعلی */}
            <div className="summary-total">
              <span>مبلغ قابل پرداخت</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            {/* دکمه ورود به مرحله تسویه حساب */}
            <button
              className="checkout-button"
              onClick={() =>
                alert("صفحه تسویه حسابی وجود نداره!!!")
              }
            >
              ادامه فرایند خرید
            </button>

            {/* توضیحات مربوط به هزینه ارسال و جزئیات سفارش */}
            <p>
              هزینه‌های ارسال و سایر جزئیات در مرحله بعد مشخص خواهند شد.
            </p>
          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;
