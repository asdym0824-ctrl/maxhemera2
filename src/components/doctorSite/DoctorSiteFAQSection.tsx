import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Doctor } from '../../types';

interface Props {
  doctor: Doctor;
}

export const DoctorSiteFAQSection: React.FC<Props> = ({ doctor }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs = [
    {
      question: 'اولین جلسه مشاوره چگونه است؟',
      answer:
        'در جلسه اول، وضعیت دندان‌ها، روابط فکی و نیمرخ صورت شما توسط دکتر به دقت ارزیابی می‌شود. سپس رادیوگرافی‌ها و قالب‌های تشخیصی بررسی شده و گزینه‌های مختلف درمانی به همراه زمان‌بندی و برآورد هزینه به شما توضیح داده می‌شود.'
    },
    {
      question: 'ارتودنسی برای چه سنی مناسب است؟',
      answer:
        'درمان ارتودنسی محدودیت سنی ندارد. انجمن ارتودنتیست‌ها توصیه می‌کند اولین ویزیت غربالگری در سن ۷ سالگی انجام شود تا در صورت وجود ناهنجاری فکی، در سن رشد پیشگیری گردد. با این حال، ارتودنسی بزرگسالان نیز با روش‌های نوین بسیار رایج و موفق است.'
    },
    {
      question: 'مدت درمان ارتودنسی چقدر است؟',
      answer:
        'طول دوره درمان بستگی به میزان به هم ریختگی دندان‌ها، سن، نوع ناهنجاری فکی و همکاری بیمار دارد؛ اما به طور میانگین بین ۱۲ تا ۲۴ ماه متغیر است.'
    },
    {
      question: 'آیا ارتودنسی نامرئی برای همه مناسب است؟',
      answer:
        'الاینرهای شفاف (ارتودنسی نامرئی) برای بیشتر مشکلات ارتودنسی از خفیف تا متوسط و حتی در موارد پیچیده با پروتکل‌های جدید قابل اجرا هستند. بررسی نهایی پس از اسکن سه بعدی دندان‌ها در جلسه اول مشخص می‌شود.'
    },
    {
      question: 'هزینه درمان ارتودنسی و شرایط پرداخت اقساطی به چه صورت است؟',
      answer:
        'هزینه درمان بر اساس نوع ناهنجاری و روش انتخابی (ثابت، متحرک، نامرئی) محاسبه می‌شود. جهت رفاه حال مراجعین محترم، امکان پرداخت هزینه در طول دوره درمان به صورت اقساط ماهانه بدون کارمزد فراهم است.'
    }
  ];

  const faqs = doctor.faqs?.length
    ? doctor.faqs.map(f => ({ question: f.question, answer: f.answer }))
    : defaultFaqs;

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6" dir="rtl">
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60]">
            سوالات متداول
          </h2>
          <p className="text-xs sm:text-sm text-[#718292]">
            پاسخ چند سوال رایج پیرامون روند درمان و مشاوره‌های ارتودنسی
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#e4ebef] rounded-2xl overflow-hidden bg-white shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-right p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0b3b60] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[#0b3b60] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-[#0b3b60] text-white' : ''
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-[13px] text-[#617588] leading-[2] border-t border-slate-100/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
