
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // فعلاً فرم نمایشی است و اطلاعات به سرور ارسال نمی‌شود.
    setSubmitted(true);

    setFormData({
      name: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <span className="section-eyebrow">GET IN TOUCH</span>
        <Sparkles size={28} />
        <h1>با ما در ارتباط باشید</h1>
        <p>
          ما همیشه آماده شنیدن نظرات، پیشنهادها و پاسخ‌گویی
          به پرسش‌های شما هستیم.
        </p>
      </section>

      {/* CONTACT CONTENT */}
      <section className="contact-container">

        <div className="contact-info">
          <span className="contact-label">WE ARE HERE FOR YOU</span>

          <h2>
            ارتباطی به زیبایی
            <br />
            <span>درخشش طلا</span>
          </h2>

          <p className="contact-description">
            اگر درباره محصولات صبا گلد سؤالی دارید یا برای
            انتخاب محصول مناسب به راهنمایی نیاز دارید،
            از طریق راه‌های ارتباطی یا فرم زیر با ما در تماس باشید.
          </p>

          <div className="contact-info-list">

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Phone size={21} />
              </div>
              <div>
                <strong>شماره تماس</strong>
                <span>اطلاعات تماس به‌زودی تکمیل می‌شود</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Mail size={21} />
              </div>
              <div>
                <strong>ایمیل</strong>
                <span>آدرس ایمیل به‌زودی اعلام می‌شود</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <MapPin size={21} />
              </div>
              <div>
                <strong>آدرس</strong>
                <span>اطلاعات آدرس به‌زودی تکمیل می‌شود</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <Clock size={21} />
              </div>
              <div>
                <strong>ساعات پاسخ‌گویی</strong>
                <span>به‌زودی اعلام می‌شود</span>
              </div>
            </div>

          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form-wrapper">
          <div className="contact-form-heading">
            <MessageCircle size={24} />
            <h3>پیام خود را برای ما بنویسید</h3>
            <p>فرم زیر را تکمیل کنید.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="contact-form-row">
              <div className="form-group">
                <label>نام و نام خانوادگی</label>
                <input
                  type="text"
                  name="name"
                  placeholder="نام خود را وارد کنید"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>شماره موبایل</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="09xxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>موضوع پیام</label>
              <input
                type="text"
                name="subject"
                placeholder="موضوع پیام خود را بنویسید"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>متن پیام</label>
              <textarea
                name="message"
                rows="5"
                placeholder="پیام خود را اینجا بنویسید..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit">
              ارسال پیام
              <Send size={17} />
            </button>

            {submitted && (
              <div className="contact-success">
                پیام شما در این نسخه نمایشی ثبت شد.
                برای ارسال واقعی پیام، باید بک‌اند متصل شود.
              </div>
            )}

          </form>
        </div>

      </section>

      {/* BOTTOM BANNER */}
      <section className="contact-bottom">
        <Sparkles size={24} />
        <h2>صبا گلد؛ همراه لحظه‌های درخشان شما</h2>
        <p>از اینکه صبا گلد را برای انتخاب زیبایی‌هایتان انتخاب کرده‌اید، سپاسگزاریم.</p>
      </section>

    </main>
  );
}

export default Contact;
