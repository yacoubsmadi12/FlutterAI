import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  en: {
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.getStarted": "Get Started",
    "hero.title": "From Prompt to App — Effortless with AI",
    "hero.subtitle": "Transform your app ideas into complete Flutter applications with just a simple description. Appio Flow uses advanced AI to generate, preview, and package your mobile apps instantly.",
    "hero.cta": "Start Building with Appio Flow",
    "hero.demo": "Watch Demo",
    "features.title": "Powerful Features for Modern App Development",
    "features.subtitle": "Everything you need to transform your ideas into professional Flutter applications",
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle": "Choose the plan that fits your development needs. Pay only for what you use with our credit system.",
    "footer.tagline": "From Prompt to App — Effortless with AI. Part of the Noorixa AI ecosystem.",
  },
  ar: {
    "nav.features": "المميزات",
    "nav.pricing": "الأسعار",
    "nav.about": "حول",
    "nav.contact": "اتصل",
    "nav.login": "تسجيل الدخول",
    "nav.getStarted": "ابدأ الآن",
    "hero.title": "من الفكرة إلى التطبيق — بسهولة مع الذكاء الاصطناعي",
    "hero.subtitle": "حوّل أفكار تطبيقاتك إلى تطبيقات Flutter كاملة بمجرد وصف بسيط. يستخدم Appio Flow الذكاء الاصطناعي المتقدم لإنشاء ومعاينة وتغليف تطبيقاتك المحمولة فوراً.",
    "hero.cta": "ابدأ البناء مع Appio Flow",
    "hero.demo": "شاهد العرض التوضيحي",
    "features.title": "مميزات قوية لتطوير التطبيقات الحديثة",
    "features.subtitle": "كل ما تحتاجه لتحويل أفكارك إلى تطبيقات Flutter احترافية",
    "pricing.title": "أسعار بسيطة وشفافة",
    "pricing.subtitle": "اختر الخطة التي تناسب احتياجات التطوير الخاصة بك. ادفع فقط مقابل ما تستخدمه مع نظام الاعتمادات الخاص بنا.",
    "footer.tagline": "من الفكرة إلى التطبيق — بسهولة مع الذكاء الاصطناعي. جزء من نظام Noorixa AI البيئي.",
  },
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  const isRTL = language === "ar";

  const value = {
    language,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
