
// تبدیل مقدار عددی به رشته‌ای با قالب اعداد فارسی
// برای نمایش یکپارچه اعداد در بخش‌های مختلف فروشگاه
export function formatNumber(number) {
  return new Intl.NumberFormat("fa-IR").format(number);
}

// قالب‌بندی قیمت محصول و اضافه کردن واحد پول تومان
// این تابع از formatNumber برای نمایش اعداد فارسی استفاده می‌کند.
export function formatPrice(price) {
  return `${formatNumber(price)} تومان`;
}
