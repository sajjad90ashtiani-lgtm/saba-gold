
/*
 * CartContext
 * --------------------------------------------------
 * مدیریت سراسری سبد خرید فروشگاه صبا گلد
 *
 * امکانات:
 * - افزودن محصول به سبد خرید
 * - حذف محصول از سبد خرید
 * - تغییر تعداد محصولات
 * - محاسبه تعداد و مبلغ کل سبد خرید
 * - ذخیره و بازیابی اطلاعات از Local Storage
 */

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

// ==================================================
// 1. تنظیمات و مقادیر ثابت
// ==================================================

// ایجاد Context برای دسترسی صفحات و کامپوننت‌ها به سبد خرید
const CartContext = createContext(null);

// کلید اختصاصی ذخیره اطلاعات سبد خرید در Local Storage
const STORAGE_KEY = "saba-gold-cart";

// تعریف انواع عملیات قابل اجرا روی سبد خرید
const ACTIONS = {
  ADD: "ADD_TO_CART",
  REMOVE: "REMOVE_FROM_CART",
  UPDATE: "UPDATE_QUANTITY",
  CLEAR: "CLEAR_CART",
};

// ==================================================
// 2. بازیابی اطلاعات سبد خرید
// ==================================================

/**
 * دریافت اطلاعات سبد خرید از Local Storage
 *
 * در صورت نبود اطلاعات یا نامعتبر بودن داده‌های ذخیره‌شده،
 * یک آرایه خالی به‌عنوان مقدار اولیه برگردانده می‌شود.
 */
function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

// ==================================================
// 3. توابع کمکی
// ==================================================

/**
 * بررسی یکسان بودن دو محصول
 *
 * دو محصول زمانی یکسان محسوب می‌شوند که شناسه،
 * رنگ و سایز انتخابی آن‌ها با یکدیگر برابر باشد.
 */
function isSameProduct(item, newItem) {
  return (
    item.id === newItem.id &&
    item.color === newItem.color &&
    item.size === newItem.size
  );
}

// ==================================================
// 4. مدیریت عملیات سبد خرید با Reducer
// ==================================================

/**
 * مدیریت تغییرات وضعیت سبد خرید
 *
 * تمام عملیات مربوط به محصولات از طریق این تابع
 * انجام می‌شوند. تابع بر اساس نوع Action، وضعیت
 * جدید سبد خرید را برمی‌گرداند.
 */
function cartReducer(state, action) {
  switch (action.type) {

    // افزودن محصول جدید یا افزایش تعداد محصول موجود
    case ACTIONS.ADD: {
      const newItem = action.payload;

      // بررسی وجود محصولی با مشخصات یکسان در سبد خرید
      const existingItem = state.find((item) =>
        isSameProduct(item, newItem)
      );

      // در صورت وجود محصول، فقط تعداد آن افزایش می‌یابد
      if (existingItem) {
        return state.map((item) =>
          isSameProduct(item, newItem)
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
              }
            : item
        );
      }

      // در غیر این صورت، محصول به سبد خرید اضافه می‌شود
      return [...state, newItem];
    }

    // حذف محصول بر اساس شناسه اختصاصی آن در سبد خرید
    case ACTIONS.REMOVE:
      return state.filter(
        (item) => item.cartId !== action.payload
      );

    // به‌روزرسانی تعداد محصول انتخاب‌شده
    case ACTIONS.UPDATE:
      return state.map((item) =>
        item.cartId === action.payload.cartId
          ? {
              ...item,
              // جلوگیری از ثبت تعداد کمتر از یک
              quantity: Math.max(
                1,
                Number(action.payload.quantity) || 1
              ),
            }
          : item
      );

    // حذف تمام محصولات و خالی کردن سبد خرید
    case ACTIONS.CLEAR:
      return [];

    // در صورت دریافت Action ناشناخته، وضعیت قبلی حفظ می‌شود
    default:
      return state;
  }
}

// ==================================================
// 5. ایجاد Provider و مدیریت سبد خرید
// ==================================================

/**
 * CartProvider
 *
 * این کامپوننت با قرار گرفتن در سطح اصلی برنامه،
 * اطلاعات و توابع مدیریت سبد خرید را در اختیار
 * تمام کامپوننت‌های فرزند قرار می‌دهد.
 */
export function CartProvider({ children }) {

  // مدیریت وضعیت سبد خرید با useReducer
  // اطلاعات اولیه از Local Storage بازیابی می‌شوند
  const [cart, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCart
  );

  // ------------------------------------------------
  // ذخیره‌سازی خودکار اطلاعات سبد خرید
  // ------------------------------------------------

  // با هر تغییر در سبد خرید، اطلاعات جدید ذخیره می‌شوند
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch {
      // جلوگیری از توقف برنامه در صورت خطای ذخیره‌سازی
    }
  }, [cart]);

  // ------------------------------------------------
  // توابع عملیاتی سبد خرید
  // ------------------------------------------------

  // افزودن محصول به سبد خرید
  const addToCart = (product, quantity, color, size) => {
    const newItem = {
      ...product,

      // ایجاد شناسه اختصاصی بر اساس محصول، رنگ و سایز
      cartId: `${product.id}-${color}-${size || "default"}`,

      quantity,
      color,
      size,
    };

    dispatch({
      type: ACTIONS.ADD,
      payload: newItem,
    });
  };

  // حذف محصول از سبد خرید
  const removeFromCart = (cartId) => {
    dispatch({
      type: ACTIONS.REMOVE,
      payload: cartId,
    });
  };

  // تغییر تعداد محصول انتخاب‌شده
  const updateQuantity = (cartId, quantity) => {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: { cartId, quantity },
    });
  };

  // حذف تمام محصولات از سبد خرید
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  // ------------------------------------------------
  // محاسبات مربوط به سبد خرید
  // ------------------------------------------------

  // محاسبه مجموع تعداد تمام محصولات موجود در سبد خرید
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // محاسبه مبلغ نهایی بر اساس قیمت و تعداد هر محصول
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ------------------------------------------------
  // ارائه اطلاعات و توابع به کامپوننت‌های فرزند
  // ------------------------------------------------

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ==================================================
// 6. Hook اختصاصی دسترسی به سبد خرید
// ==================================================

/**
 * useCart
 *
 * Hook اختصاصی برای دسترسی آسان به اطلاعات و عملیات
 * سبد خرید در کامپوننت‌های مختلف برنامه.
 *
 * استفاده از این Hook خارج از CartProvider مجاز نیست.
 */
export function useCart() {
  const context = useContext(CartContext);

  // بررسی قرار داشتن کامپوننت داخل CartProvider
  if (!context) {
    throw new Error(
      "useCart باید داخل CartProvider استفاده شود."
    );
  }

  return context;
}
