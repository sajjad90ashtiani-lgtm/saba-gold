
# صبا گلد | فروشگاه اینترنتی طلا و جواهر

**صبا گلد** یک پروژه فروشگاه اینترنتی طلا و جواهر است که با React و Vite توسعه داده شده است. این پروژه با هدف ارائه تجربه‌ای ساده و منظم برای مشاهده محصولات، بررسی جزئیات هر محصول و مدیریت سبد خرید طراحی شده است.

</div>

<div dir="ltr">

# Saba Gold | Jewelry E-commerce Store

**Saba Gold** is a jewelry e-commerce frontend built with React and Vite. The project is designed to provide a clean shopping experience for browsing products, viewing product details, and managing a shopping cart.

</div>

---

<div dir="rtl">

## فهرست مطالب

- [معرفی پروژه](#معرفی-پروژه)
- [امکانات](#امکانات)
- [تکنولوژی‌ها](#تکنولوژیها)
- [ساختار پروژه](#ساختار-پروژه)
- [صفحات و بخش‌ها](#صفحات-و-بخشها)
- [مدیریت سبد خرید](#مدیریت-سبد-خرید)
- [ساختار اطلاعات محصولات](#ساختار-اطلاعات-محصولات)
- [نصب و راه‌اندازی](#نصب-و-راهاندازی)
- [دستورات پروژه](#دستورات-پروژه)
- [نکات توسعه](#نکات-توسعه)
- [وضعیت پروژه](#وضعیت-پروژه)
- [مشارکت](#مشارکت)
- [مجوز](#مجوز)

</div>

<div dir="ltr">

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages and Sections](#pages-and-sections)
- [Shopping Cart](#shopping-cart)
- [Product Data Structure](#product-data-structure)
- [Installation and Setup](#installation-and-setup)
- [Available Scripts](#available-scripts)
- [Development Notes](#development-notes)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [License](#license)

</div>

---

<div dir="rtl">

## معرفی پروژه

صبا گلد یک رابط کاربری فروشگاهی برای نمایش و بررسی محصولات طلا و جواهر است. ساختار پروژه به‌صورت کامپوننت‌محور طراحی شده و بخش‌هایی مانند صفحات فروشگاه، جزئیات محصول، سبد خرید، درباره ما و تماس با ما را در بر می‌گیرد.

اطلاعات اولیه محصولات در فایل JSON نگهداری می‌شود و بخش‌های مختلف برنامه از این داده‌ها برای نمایش محصولات استفاده می‌کنند.

> این مخزن در وضعیت فعلی یک پروژه فرانت‌اند است. قابلیت‌هایی مانند پرداخت آنلاین واقعی، ثبت سفارش در سرور و ارسال پیام فرم تماس به بک‌اند در مستندات و کد فعلی به‌عنوان امکانات تکمیل‌شده معرفی نمی‌شوند.

## امکانات

- نمایش محصولات طلا و جواهر
- مشاهده فهرست محصولات در صفحه فروشگاه
- دسته‌بندی و جست‌وجوی محصولات در رابط فروشگاه
- مشاهده صفحه جزئیات هر محصول
- افزودن محصولات به سبد خرید
- مدیریت وضعیت سبد خرید با React Context و `useReducer`
- نگهداری اطلاعات سبد خرید در `localStorage`
- نمایش تعداد اقلام سبد خرید
- صفحه اختصاصی سبد خرید
- صفحات درباره ما و تماس با ما
- قالب‌بندی اعداد و قیمت‌ها با ارقام فارسی
- استفاده از آیکون‌های کتابخانه Lucide React
- طراحی واکنش‌گرا برای اندازه‌های مختلف صفحه‌نمایش

## تکنولوژی‌ها

| فناوری | کاربرد |
|---|---|
| React `19.3.1` | ساخت رابط کاربری کامپوننت‌محور |
| React DOM `19.3.1` | نمایش برنامه React در مرورگر |
| Vite `8.3.6` | ابزار توسعه و Build |
| React Router DOM `7.18.6` | مسیریابی بین صفحات |
| Tailwind CSS `4.3.5` | ابزارهای استایل‌دهی |
| `@tailwindcss/vite` `4.3.5` | اتصال Tailwind CSS به Vite |
| Lucide React `1.76.0` | آیکون‌های رابط کاربری |
| Oxlint `1.90.0` | بررسی و تحلیل کد |

نسخه‌ها مطابق محدوده نسخه‌های ثبت‌شده در `package.json` هستند.

## ساختار پروژه

```text
saba-gold/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.jsx
│   │   └── products/
│   │       └── ProductCard.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   ├── products.json
│   │   └── products-documentation.md
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── formatPrice.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── package-lock.json
```

**توضیح پوشه‌ها:**

- `components/`: کامپوننت‌های قابل استفاده مجدد در بخش‌های مختلف سایت.
- `context/`: مدیریت وضعیت‌های مشترک برنامه؛ از جمله وضعیت سبد خرید.
- `data/`: داده‌های اولیه محصولات و مستندات مربوط به آن‌ها.
- `layouts/`: چیدمان کلی صفحات.
- `pages/`: صفحات اصلی فروشگاه.
- `styles/`: فایل‌های استایل عمومی.
- `utils/`: توابع کمکی مانند قالب‌بندی قیمت.
- `App.jsx`: تعریف ساختار اصلی برنامه و مسیرهای صفحات.
- `main.jsx`: نقطه ورود برنامه React و محل اتصال Providerها.

## صفحات و بخش‌ها

| صفحه / بخش | توضیح |
|---|---|
| خانه (`Home`) | صفحه اصلی و نقطه شروع بازدید از فروشگاه |
| فروشگاه (`Shop`) | نمایش و مرور محصولات |
| جزئیات محصول (`ProductDetails`) | نمایش اطلاعات محصول انتخاب‌شده |
| سبد خرید (`Cart`) | مشاهده و مدیریت اقلام انتخاب‌شده |
| درباره ما (`About`) | معرفی فروشگاه و محتوای مرتبط با برند |
| تماس با ما (`Contact`) | نمایش اطلاعات تماس و فرم ارتباطی |
| سربرگ (`Header`) | دسترسی به بخش‌های اصلی و امکانات ناوبری |
| کارت محصول (`ProductCard`) | نمایش خلاصه اطلاعات هر محصول |

## مدیریت سبد خرید

مدیریت سبد خرید در فایل `src/context/CartContext.jsx` انجام می‌شود.

در این بخش:

- از **React Context** برای در دسترس قرار دادن وضعیت سبد خرید در کامپوننت‌های مختلف استفاده شده است.
- از **`useReducer`** برای مدیریت عملیات و تغییرات سبد خرید استفاده می‌شود.
- اطلاعات سبد خرید با استفاده از **`localStorage`** در مرورگر ذخیره می‌شود تا پس از بارگذاری مجدد صفحه نیز قابل بازیابی باشد.
- کامپوننت‌ها می‌توانند از طریق Context به اطلاعات و عملیات سبد خرید دسترسی داشته باشند.

## ساختار اطلاعات محصولات

اطلاعات اولیه محصولات در فایل `src/data/products.json` به‌صورت آرایه‌ای از آبجکت‌ها نگهداری می‌شود.

| فیلد | توضیح |
|---|---|
| `id` | شناسه محصول |
| `name` | نام محصول |
| `category` | دسته‌بندی محصول |
| `weight` | وزن محصول بر حسب گرم |
| `karat` | عیار طلا |
| `wage` | مبلغ اجرت ثبت‌شده |
| `price` | قیمت محصول بر حسب تومان |
| `color` | رنگ طلا |
| `image` | نشانی تصویر محصول |
| `description` | توضیح محصول |

**نکات مهم:**

- مقدار `id` برای هر محصول باید یکتا باشد.
- فیلدهای عددی مانند `weight`، `karat`، `wage` و `price` باید به‌صورت عدد ثبت شوند.
- مقدار `category` باید با نام دسته‌بندی مورد استفاده در رابط کاربری هماهنگ باشد.
- مقدار `image` باید یک نشانی معتبر و قابل دسترسی باشد.
- فایل JSON از کامنت پشتیبانی نمی‌کند؛ توضیحات تکمیلی ساختار داده‌ها در فایل `products-documentation.md` قرار دارد.

## نصب و راه‌اندازی

### پیش‌نیازها

برای اجرای پروژه به موارد زیر نیاز دارید:

- [Node.js](https://nodejs.org/)
- npm (همراه Node.js نصب می‌شود)
- Git برای دریافت مخزن، در صورت نیاز

### دریافت پروژه

```bash
git clone <REPOSITORY-URL>
cd saba-gold
```

به‌جای `<REPOSITORY-URL>` نشانی مخزن GitHub خودتان را قرار دهید.

### نصب وابستگی‌ها

```bash
npm install
```

### اجرای نسخه توسعه

```bash
npm run dev
```

پس از اجرای دستور، نشانی محلی نمایش‌داده‌شده در ترمینال را در مرورگر باز کنید. نشانی پیش‌فرض Vite معمولاً `http://localhost:5173` است.

### ساخت نسخه نهایی

```bash
npm run build
```

فایل‌های خروجی نسخه نهایی در پوشه `dist/` ساخته می‌شوند.

### مشاهده نسخه نهایی به‌صورت محلی

```bash
npm run preview
```

## دستورات پروژه

| دستور | کاربرد |
|---|---|
| `npm run dev` | اجرای سرور توسعه Vite |
| `npm run build` | ساخت نسخه نهایی پروژه |
| `npm run preview` | پیش‌نمایش نسخه Build‌شده |
| `npm run lint` | اجرای Oxlint برای بررسی کد |

## نکات توسعه

- پیش از افزودن محصول جدید، ساختار `products.json` را رعایت کنید.
- برای حفظ هماهنگی فیلترها، نام دسته‌بندی‌ها را یکسان وارد کنید.
- منطق مشترک سبد خرید را در `CartContext.jsx` نگهداری کنید.
- توابع عمومی قالب‌بندی را در پوشه `utils/` قرار دهید.
- برای بخش‌های تکرارشونده، تا حد امکان از کامپوننت‌های قابل استفاده مجدد استفاده کنید.
- پس از تغییرات، دستورات `npm run lint` و `npm run build` را اجرا کنید.

## وضعیت پروژه

این پروژه در حال توسعه است. بخش‌های رابط کاربری و گردش اصلی مشاهده محصولات و مدیریت سبد خرید پیاده‌سازی شده‌اند؛ با این حال، برخی قابلیت‌ها هنوز به سرویس سمت سرور متصل نیستند.

مواردی که برای توسعه‌های بعدی قابل بررسی هستند:

- اتصال فرم تماس به یک API یا سرویس سمت سرور
- پیاده‌سازی فرایند واقعی ثبت سفارش و پرداخت
- افزودن سیستم احراز هویت و حساب کاربری متصل به بک‌اند
- ذخیره و مدیریت محصولات از طریق پایگاه داده
- افزودن آزمون‌های خودکار برای بخش‌های مهم برنامه

## مشارکت

از پیشنهادها، گزارش خطاها و مشارکت در بهبود پروژه استقبال می‌شود.

برای مشارکت:

1. مخزن را Fork کنید.
2. یک شاخه جدید برای تغییرات خود بسازید.
3. تغییرات را با توضیح مناسب Commit کنید.
4. یک Pull Request ارسال کنید.

## مجوز

در حال حاضر مجوز مشخصی برای این پروژه در اطلاعات ارائه‌شده ثبت نشده است. پیش از انتشار عمومی یا استفاده مجدد دیگران از کد، مجوز مناسب پروژه را انتخاب و فایل `LICENSE` را به مخزن اضافه کنید.

</div>

---

<div dir="ltr">

## Project Overview

Saba Gold is a frontend e-commerce interface for browsing and exploring gold and jewelry products. The application follows a component-based structure and includes a home page, shop, product details, shopping cart, About page, and Contact page.

Initial product information is stored in a JSON file and used by the application to render product content.

> The current repository is a frontend project. Features such as real online payments, server-side order processing, and backend-powered contact form submission are not described as completed features.

## Features

- Browse gold and jewelry products.
- View the product listing.
- Search and browse products by category in the shop interface.
- Open individual product detail pages.
- Add products to the shopping cart.
- Manage cart state with React Context and `useReducer`.
- Persist cart data in browser `localStorage`.
- Display the cart item count.
- Dedicated shopping cart page.
- About and Contact pages.
- Persian number and price formatting.
- Lucide React icons.
- Responsive user interface for different screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| React `19.3.1` | Component-based user interface |
| React DOM `19.3.1` | Rendering React in the browser |
| Vite `8.3.6` | Development server and build tool |
| React Router DOM `7.18.6` | Client-side routing |
| Tailwind CSS `4.3.5` | Utility-first styling |
| `@tailwindcss/vite` `4.3.5` | Tailwind CSS integration for Vite |
| Lucide React `1.76.0` | Interface icons |
| Oxlint `1.90.0` | Code linting |

Versions are based on the version ranges declared in `package.json`.

## Project Structure

```text
saba-gold/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.jsx
│   │   └── products/
│   │       └── ProductCard.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   ├── products.json
│   │   └── products-documentation.md
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── formatPrice.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── package-lock.json
```

**Directory overview:**

- `components/`: Reusable UI components.
- `context/`: Shared application state, including the shopping cart.
- `data/`: Initial product data and related documentation.
- `layouts/`: Shared page layouts.
- `pages/`: Main application pages.
- `styles/`: Global stylesheets.
- `utils/`: Helper functions such as price formatting.
- `App.jsx`: Main application structure and page routes.
- `main.jsx`: React entry point and provider setup.

## Pages and Sections

| Page / Component | Description |
|---|---|
| `Home` | Main landing page |
| `Shop` | Product browsing and listing |
| `ProductDetails` | Details for the selected product |
| `Cart` | View and manage selected items |
| `About` | Store and brand information |
| `Contact` | Contact information and contact form |
| `Header` | Main navigation and shared header |
| `ProductCard` | Reusable product summary component |

## Shopping Cart

Shopping cart functionality is managed in `src/context/CartContext.jsx`.

- **React Context** makes cart state available to different components.
- **`useReducer`** handles cart actions and state transitions.
- **`localStorage`** persists cart data in the browser so it can be restored after a page reload.
- Components can access cart data and actions through the shared context.

## Product Data Structure

Initial product data is stored as an array of objects in `src/data/products.json`.

| Field | Description |
|---|---|
| `id` | Product identifier |
| `name` | Product name |
| `category` | Product category |
| `weight` | Product weight in grams |
| `karat` | Gold purity |
| `wage` | Recorded workmanship fee |
| `price` | Product price in toman |
| `color` | Gold color |
| `image` | Product image URL |
| `description` | Product description |

**Important notes:**

- Every product must have a unique `id`.
- Numeric fields such as `weight`, `karat`, `wage`, and `price` must remain numbers.
- Category values must match the category names used by the user interface.
- The `image` field must contain a valid, accessible URL.
- JSON does not support comments. Additional data-structure documentation is provided in `products-documentation.md`.

## Installation and Setup

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- Git, if you want to clone the repository

### Clone the Repository

```bash
git clone <REPOSITORY-URL>
cd saba-gold
```

Replace `<REPOSITORY-URL>` with your GitHub repository URL.

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL printed in your terminal. Vite's default development URL is usually `http://localhost:5173`.

### Create a Production Build

```bash
npm run build
```

The production files will be generated in the `dist/` directory.

### Preview the Production Build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint to analyze the code |

## Development Notes

- Follow the existing `products.json` structure when adding products.
- Keep category names consistent with those used by the interface.
- Keep shared cart logic in `CartContext.jsx`.
- Place reusable formatting helpers in the `utils/` directory.
- Prefer reusable components for repeated interface elements.
- Run `npm run lint` and `npm run build` after making changes.

## Project Status

Saba Gold is under development. The main interface and core product-browsing and cart flows have been implemented, but some features are not yet connected to a backend service.

Potential next steps include:

- Connecting the contact form to an API or backend service.
- Implementing real order processing and online payment.
- Adding backend-connected authentication and user accounts.
- Managing products through a database.
- Adding automated tests for important application features.

## Contributing

Suggestions, bug reports, and contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes with a clear message.
4. Open a Pull Request.

## License

No license has been specified in the project information provided. Before making the code available for reuse, choose an appropriate license and add a `LICENSE` file to the repository.

</div>
"""