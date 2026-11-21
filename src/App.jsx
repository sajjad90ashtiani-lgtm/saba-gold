
/*
 * App.jsx
 * --------------------------------------------------
 * کامپوننت اصلی مدیریت مسیرهای فروشگاه صبا گلد
 *
 * وظایف:
 * - تعریف مسیر صفحات مختلف فروشگاه
 * - اتصال هر مسیر به کامپوننت صفحه مربوطه
 * - استفاده از MainLayout به‌عنوان قالب مشترک صفحات
 */

import { Routes, Route } from "react-router-dom";

// وارد کردن قالب اصلی صفحات فروشگاه
import MainLayout from "./layouts/MainLayout";

// وارد کردن صفحات مختلف فروشگاه
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

// ==================================================
// مدیریت مسیرهای برنامه
// ==================================================

function App() {
  return (
    <Routes>
      {/* قالب مشترک صفحات فروشگاه */}
      <Route element={<MainLayout />}>

        {/* صفحه اصلی فروشگاه */}
        <Route path="/" element={<Home />} />

        {/* صفحه نمایش تمام محصولات */}
        <Route path="/shop" element={<Shop />} />

        {/* صفحه جزئیات محصول بر اساس شناسه محصول */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* صفحه سبد خرید */}
        <Route path="/cart" element={<Cart />} />

        {/* صفحه معرفی برند صبا گلد */}
        <Route path="/about" element={<About />} />

        {/* صفحه ارتباط با فروشگاه */}
        <Route path="/contact" element={<Contact />} />

      </Route>
    </Routes>
  );
}

export default App;
