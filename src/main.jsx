
/*
 * main.jsx
 * --------------------------------------------------
 * نقطه ورود اصلی برنامه صبا گلد
 *
 * وظایف:
 * - ایجاد ریشه اصلی برنامه React
 * - فعال‌سازی سیستم مسیریابی با React Router
 * - فراهم کردن دسترسی سراسری به اطلاعات سبد خرید
 * - بارگذاری فایل‌های استایل اصلی پروژه
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// کامپوننت اصلی برنامه
import App from "./App";

// فراهم کردن دسترسی صفحات به اطلاعات سبد خرید
import { CartProvider } from "./context/CartContext";

// بارگذاری استایل‌های اصلی و عمومی پروژه
import "./index.css";
import "./styles/global.css";

// ==================================================
// راه‌اندازی و نمایش برنامه React
// ==================================================

// ایجاد ریشه React و اتصال برنامه به عنصر root در HTML
ReactDOM.createRoot(document.getElementById("root")).render(
  // فعال‌سازی ابزارهای بررسی خطا و مشکلات احتمالی در زمان توسعه
  <React.StrictMode>
    {/* فعال‌سازی مسیریابی صفحات با استفاده از آدرس مرورگر */}
    <BrowserRouter>
      {/* قرار دادن تمام برنامه داخل CartProvider
          تا همه صفحات بتوانند به اطلاعات سبد خرید دسترسی داشته باشند */}
      <CartProvider>
        {/* نمایش کامپوننت اصلی و مسیرهای تعریف‌شده برنامه */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
