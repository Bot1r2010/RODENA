import { useState, useEffect, useRef } from "react";

const translations = {
  ru: {
    nav: { home: "Главная", about: "О нас", menu: "Меню", gallery: "Атмосфера", reviews: "Отзывы", contacts: "Контакты" },
    hero: { tagline: "Место, где встречается", tagline2: "вкус и уют", sub: "Кофейня в сердце Ташкента", cta: "Забронировать стол", scroll: "Прокрутите вниз" },
    about: {
      title: "О нас", label: "История",
      p1: "Rodena — это не просто кофейня. Это место, где каждая чашка кофе рассказывает историю, а каждое блюдо создаётся с душой.",
      p2: "Мы верим, что атмосфера так же важна, как еда. Поэтому мы тщательно продумали каждую деталь интерьера, каждый звук и каждый аромат.",
      p3: "Живая музыка, свободный Wi-Fi, уютные уголки для работы и встреч — всё для того, чтобы вы чувствовали себя дома.",
      stat1: 2, stat1s: "+", stat1l: "Филиала",
      stat2: 8, stat2s: ":00", stat2l: "Открытие",
      stat3: 40, stat3s: "+", stat3l: "Мест",
      stat4: 2025, stat4s: "", stat4l: "Лучшая кофейня",
    },
    menu: {
      title: "Меню", label: "Гастрономия",
      cats: ["Завтраки", "Основные блюда", "Десерты", "Напитки"],
      items: {
        "Завтраки": [
          { name: "Бельгийские вафли", desc: "С ягодами, кремом и кленовым сиропом", price: "45 000" },
          { name: "Блины с лососем", desc: "Нежные блины, копчёный лосось, сливочный сыр", price: "55 000" },
          { name: "Сэндвич с авокадо", desc: "Тост, авокадо, яйцо пашот, микрозелень", price: "42 000" },
        ],
        "Основные блюда": [
          { name: "Паста Карбонара", desc: "Классический рецепт, бекон, пармезан, желток", price: "68 000" },
          { name: "Стейк из говядины", desc: "Мраморная говядина, соус берблан, сезонные овощи", price: "120 000" },
          { name: "Том-ям с морепродуктами", desc: "Острый тайский суп, кокосовое молоко, тигровые креветки", price: "72 000" },
          { name: "Вок-лапша с курицей", desc: "Рисовая лапша, овощи, устричный соус", price: "58 000" },
        ],
        "Десерты": [
          { name: "Тирамису", desc: "Маскарпоне, савоярди, эспрессо", price: "38 000" },
          { name: "Чизкейк Нью-Йорк", desc: "Сливочный, с ягодным конфитюром", price: "42 000" },
          { name: "Шоколадный фондан", desc: "Горячий, с ванильным мороженым", price: "45 000" },
        ],
        "Напитки": [
          { name: "Фирменный латте", desc: "Двойной эспрессо, вспененное молоко, карамель", price: "28 000" },
          { name: "Матча латте", desc: "Японский церемониальный матча, кокосовое молоко", price: "32 000" },
          { name: "Лимонад Rodena", desc: "Свежий лимон, мята, имбирь, газированная вода", price: "25 000" },
          { name: "Горячий шоколад", desc: "Бельгийский шоколад, взбитые сливки", price: "30 000" },
        ],
      },
      avg: "Средний чек ~150 000 сум",
    },
    atmosphere: {
      title: "Атмосфера", label: "Пространство",
      features: [
        { icon: "♪", title: "Живая музыка", desc: "Каждый вечер атмосферные выступления" },
        { icon: "⌨", title: "Работайте у нас", desc: "Бесплатный Wi-Fi, розетки на каждом столике" },
        { icon: "☕", title: "Уютные уголки", desc: "Тихие зоны для встреч и спокойной работы" },
        { icon: "🌿", title: "Детское меню", desc: "Специальное меню для самых маленьких гостей" },
      ],
    },
    reviews: {
      title: "Отзывы гостей", label: "Что говорят о нас",
      items: [
        { name: "Алина М.", city: "Ташкент", text: "Лучшее место для утреннего кофе! Атмосфера невероятная, латте просто волшебный. Приходим сюда каждые выходные всей семьёй." },
        { name: "Дилшод Р.", city: "Ташкент", text: "Наконец-то кофейня, где умеют делать настоящий матча латте. Интерьер стильный, тихо, можно спокойно поработать с ноутбуком." },
        { name: "Sarah K.", city: "Dubai", text: "Visited while on a trip to Tashkent. Rodena is a hidden gem — incredible pastries, exceptional coffee, and a warm atmosphere you rarely find." },
        { name: "Камола Ю.", city: "Ташкент", text: "Тирамису здесь лучшее в городе, без преувеличения. Живая музыка по вечерам создаёт особую атмосферу. Обязательно ещё вернёмся!" },
        { name: "Bobur T.", city: "Toshkent", text: "Juda zo'r joy! Kofe mazali, muhit ajoyib. Har hafta kelamiz. Barcha do'stlarimga tavsiya qilamiz!" },
        { name: "Михаил С.", city: "Москва", text: "Был в командировке в Ташкенте. Rodena стала любимым местом на весь визит. Стейк и паста на уровне хороших московских ресторанов." },
      ],
    },
    contact: {
      title: "Контакты", label: "Найдите нас",
      branch1: "Яшнабадский район", branch2: "Мирзо-Улугбекский район",
      addr1: "ул. Авиасозлар, 65", addr2: "ул. Паркент, 199",
      hours: "Ежедневно 08:00 — 23:00", phone: "+998 95 475-88-55",
      reserve: "Забронировать стол", delivery: "Заказать доставку",
    },
    footer: { copy: "© 2025 Rodena. Все права защищены.", tagline: "Вкус. Уют. Атмосфера." },
  },
  en: {
    nav: { home: "Home", about: "About", menu: "Menu", gallery: "Atmosphere", reviews: "Reviews", contacts: "Contacts" },
    hero: { tagline: "Where flavor", tagline2: "meets comfort", sub: "A café in the heart of Tashkent", cta: "Reserve a Table", scroll: "Scroll down" },
    about: {
      title: "About Us", label: "Our Story",
      p1: "Rodena is more than a café. It's a place where every cup of coffee tells a story and every dish is crafted with soul.",
      p2: "We believe that atmosphere is just as important as food. That's why we've carefully considered every interior detail, every sound, and every aroma.",
      p3: "Live music, free Wi-Fi, cozy corners for work and meetings — everything to make you feel at home.",
      stat1: 2, stat1s: "+", stat1l: "Locations",
      stat2: 8, stat2s: ":00", stat2l: "Opens At",
      stat3: 40, stat3s: "+", stat3l: "Seats",
      stat4: 2025, stat4s: "", stat4l: "Best Café",
    },
    menu: {
      title: "Menu", label: "Gastronomy",
      cats: ["Breakfast", "Main Dishes", "Desserts", "Drinks"],
      items: {
        "Breakfast": [
          { name: "Belgian Waffles", desc: "With berries, cream, and maple syrup", price: "45 000" },
          { name: "Blini with Salmon", desc: "Delicate blini, smoked salmon, cream cheese", price: "55 000" },
          { name: "Avocado Sandwich", desc: "Toast, avocado, poached egg, microgreens", price: "42 000" },
        ],
        "Main Dishes": [
          { name: "Pasta Carbonara", desc: "Classic recipe, bacon, parmesan, yolk", price: "68 000" },
          { name: "Beef Steak", desc: "Marbled beef, beurre blanc sauce, seasonal vegetables", price: "120 000" },
          { name: "Tom Yum Seafood", desc: "Spicy Thai soup, coconut milk, tiger prawns", price: "72 000" },
          { name: "Wok Noodles", desc: "Rice noodles, vegetables, oyster sauce", price: "58 000" },
        ],
        "Desserts": [
          { name: "Tiramisu", desc: "Mascarpone, savoiardi, espresso", price: "38 000" },
          { name: "NY Cheesecake", desc: "Creamy, with berry jam", price: "42 000" },
          { name: "Chocolate Fondant", desc: "Warm, with vanilla ice cream", price: "45 000" },
        ],
        "Drinks": [
          { name: "Signature Latte", desc: "Double espresso, steamed milk, caramel", price: "28 000" },
          { name: "Matcha Latte", desc: "Japanese ceremonial matcha, coconut milk", price: "32 000" },
          { name: "Rodena Lemonade", desc: "Fresh lemon, mint, ginger, sparkling water", price: "25 000" },
          { name: "Hot Chocolate", desc: "Belgian chocolate, whipped cream", price: "30 000" },
        ],
      },
      avg: "Average check ~150 000 UZS",
    },
    atmosphere: {
      title: "Atmosphere", label: "Our Space",
      features: [
        { icon: "♪", title: "Live Music", desc: "Atmospheric performances every evening" },
        { icon: "⌨", title: "Work With Us", desc: "Free Wi-Fi, power outlets at every table" },
        { icon: "☕", title: "Cozy Corners", desc: "Quiet zones for meetings and peaceful work" },
        { icon: "🌿", title: "Kids Menu", desc: "A special menu for our youngest guests" },
      ],
    },
    reviews: {
      title: "Guest Reviews", label: "What People Say",
      items: [
        { name: "Alina M.", city: "Tashkent", text: "The best spot for a morning coffee! The atmosphere is incredible and the latte is pure magic. We come every weekend as a family." },
        { name: "Dilshod R.", city: "Tashkent", text: "Finally a café that knows how to make a real matcha latte. Stylish interior, quiet enough to work from your laptop." },
        { name: "Sarah K.", city: "Dubai", text: "Rodena is a hidden gem — incredible pastries, exceptional coffee, and a warm atmosphere you rarely find anywhere." },
        { name: "Kamola Y.", city: "Tashkent", text: "The tiramisu here is the best in the city. Live music in the evenings creates a very special mood." },
        { name: "Bobur T.", city: "Tashkent", text: "Amazing place! Delicious coffee, wonderful atmosphere. We come every week and recommend to all our friends!" },
        { name: "Mikhail S.", city: "Moscow", text: "Rodena became my favourite spot for the whole trip. The steak and pasta are on par with good Moscow restaurants." },
      ],
    },
    contact: {
      title: "Contact", label: "Find Us",
      branch1: "Yashnabad District", branch2: "Mirzo Ulugbek District",
      addr1: "Aviasozlar St., 65", addr2: "Parkent St., 199",
      hours: "Daily 08:00 — 23:00", phone: "+998 95 475-88-55",
      reserve: "Reserve a Table", delivery: "Order Delivery",
    },
    footer: { copy: "© 2025 Rodena. All rights reserved.", tagline: "Taste. Comfort. Atmosphere." },
  },
  uz: {
    nav: { home: "Bosh sahifa", about: "Biz haqimizda", menu: "Menyu", gallery: "Muhit", reviews: "Sharhlar", contacts: "Kontaktlar" },
    hero: { tagline: "Ta'm va", tagline2: "qulaylik makoni", sub: "Toshkent qalbidagi kofe uyi", cta: "Stol band qilish", scroll: "Pastga aylantiring" },
    about: {
      title: "Biz haqimizda", label: "Tariximiz",
      p1: "Rodena — bu shunchaki kofe uyi emas. Bu har bir finjon qahva hikoya aytadigan va har bir taom qalbdan tayyorlanadigan joy.",
      p2: "Biz muhit ovqat kabi muhim deb hisoblaymiz. Shuning uchun interyerning har bir tafsilotini, har bir ovozni va har bir hidni diqqat bilan o'yladik.",
      p3: "Jonli musiqa, bepul Wi-Fi, ish va uchrashuvlar uchun qulay burchaklar — hammasi siz o'zingizni uyda his qilishingiz uchun.",
      stat1: 2, stat1s: "+", stat1l: "Filial",
      stat2: 8, stat2s: ":00", stat2l: "Ochilish vaqti",
      stat3: 40, stat3s: "+", stat3l: "O'rindiq",
      stat4: 2025, stat4s: "", stat4l: "Eng yaxshi kofe uyi",
    },
    menu: {
      title: "Menyu", label: "Gastonomiya",
      cats: ["Nonushta", "Asosiy taomlar", "Desertlar", "Ichimliklar"],
      items: {
        "Nonushta": [
          { name: "Belgiya vafli", desc: "Meva, qaymoq va zaytun siropiyla", price: "45 000" },
          { name: "Lososli blin", desc: "Nozik blin, tutunli losos, slivochny pishloq", price: "55 000" },
          { name: "Avokadoli sandvich", desc: "Tost, avokado, pashot tuxum, mikro o'tlar", price: "42 000" },
        ],
        "Asosiy taomlar": [
          { name: "Pasta Karbonara", desc: "Klassik retsept, bekon, parmezan, sarig'i", price: "68 000" },
          { name: "Mol go'shti steyki", desc: "Marmar go'sht, byur-blan sousi, mavsumiy sabzavotlar", price: "120 000" },
          { name: "Tom-yam dengiz mahsulotlari", desc: "Qizgin tay sho'rvasi, kokos suti, qisqichbaqa", price: "72 000" },
          { name: "Tovuqli vok makaron", desc: "Guruch makaron, sabzavotlar, ustritsa sousi", price: "58 000" },
        ],
        "Desertlar": [
          { name: "Tiramisu", desc: "Maskarpone, savoyardi, espresso", price: "38 000" },
          { name: "Nyu-York Chizkeyki", desc: "Kremli, meva murabbosi bilan", price: "42 000" },
          { name: "Shokolad fondan", desc: "Issiq, vanil muzqaymoq bilan", price: "45 000" },
        ],
        "Ichimliklar": [
          { name: "Maxsus Latte", desc: "Ikki qism espresso, ko'pikli sut, karamel", price: "28 000" },
          { name: "Macha latte", desc: "Yapon matcha, kokos suti", price: "32 000" },
          { name: "Rodena limonadi", desc: "Yangi limon, yalpiz, zanjabil, gazlangan suv", price: "25 000" },
          { name: "Issiq shokolad", desc: "Belgiya shokoladi, qaymoq", price: "30 000" },
        ],
      },
      avg: "O'rtacha hisob ~150 000 so'm",
    },
    atmosphere: {
      title: "Muhit", label: "Bizning Makon",
      features: [
        { icon: "♪", title: "Jonli musiqa", desc: "Har kech oqshom atmosferik chiqishlar" },
        { icon: "⌨", title: "Biz bilan ishlang", desc: "Bepul Wi-Fi, har bir stolda rozetka" },
        { icon: "☕", title: "Qulay burchaklar", desc: "Uchrashuvlar va tinch ish uchun sokin zonalar" },
        { icon: "🌿", title: "Bolalar menyusi", desc: "Kichik mehmonlarimiz uchun maxsus menyu" },
      ],
    },
    reviews: {
      title: "Mehmonlar sharhlari", label: "Ular nima deyishadi",
      items: [
        { name: "Alina M.", city: "Toshkent", text: "Ertalabki qahva uchun eng yaxshi joy! Muhit ajoyib, latte sehrli. Har dam olish kunlari oila bilan kelamiz." },
        { name: "Dilshod R.", city: "Toshkent", text: "Nihoyat haqiqiy matcha latte tayyorlay oladigan kofe uyi topildi. Zamonaviy interer, tinch, noutbuk bilan ishlash qulay." },
        { name: "Sarah K.", city: "Dubai", text: "Toshkentga sayohat paytida bordim. Rodena — yashirin durdon: ajoyib pishiriqlar, zo'r qahva va kamdan-kam uchraydigan iliq muhit." },
        { name: "Kamola Yu.", city: "Toshkent", text: "Bu yerdagi tiramisu shahardagi eng yaxshisi. Kechki jonli musiqa alohida kayfiyat yaratadi." },
        { name: "Bobur T.", city: "Toshkent", text: "Juda zo'r joy! Kofe mazali, muhit ajoyib. Har hafta kelamiz. Barcha do'stlarimga tavsiya qilamiz!" },
        { name: "Mixail S.", city: "Moskva", text: "Toshkentda ish safari paytida Rodena sevimli joyimga aylandi. Steyk va pasta darajasi zo'r." },
      ],
    },
    contact: {
      title: "Kontaktlar", label: "Bizni toping",
      branch1: "Yashnobod tumani", branch2: "Mirzo Ulug'bek tumani",
      addr1: "Aviasozlar ko'chasi, 65", addr2: "Parkent ko'chasi, 199",
      hours: "Har kuni 08:00 — 23:00", phone: "+998 95 475-88-55",
      reserve: "Stol band qilish", delivery: "Yetkazib berish",
    },
    footer: { copy: "© 2025 Rodena. Barcha huquqlar himoyalangan.", tagline: "Ta'm. Qulaylik. Muhit." },
  },
};

const menuCatMap = {
  ru: ["Завтраки", "Основные блюда", "Десерты", "Напитки"],
  en: ["Breakfast", "Main Dishes", "Desserts", "Drinks"],
  uz: ["Nonushta", "Asosiy taomlar", "Desertlar", "Ichimliklar"],
};

function Counter({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const PARTICLES = [
  { x: 12, y: 22, s: 18, d: 6.2 }, { x: 80, y: 38, s: 12, d: 8.1 },
  { x: 47, y: 68, s: 22, d: 7.4 }, { x: 90, y: 58, s: 14, d: 9.0 },
  { x: 28, y: 82, s: 10, d: 5.5 }, { x: 63, y: 14, s: 20, d: 10.2 },
  { x: 93, y: 78, s: 16, d: 6.8 }, { x: 6,  y: 52, s: 24, d: 8.5 },
];

export default function RodenaSite() {
  const [lang, setLang] = useState("ru");
  const [menuCat, setMenuCat] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState({});
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [parallax, setParallax] = useState(0);
  const [menuVisible, setMenuVisible] = useState(true);
  const t = translations[lang];
  const cats = menuCatMap[lang];
  const reviews = t.reviews.items;

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 50); setParallax(window.scrollY * 0.35); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.id]: true })); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-animate]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % reviews.length), 4800);
    return () => clearInterval(t);
  }, [reviews.length]);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileMenu(false); };

  const fade = (id, delay = 0) => ({
    id, "data-animate": true,
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    },
  });

  const slideL = (id, delay = 0) => ({
    id, "data-animate": true,
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateX(0)" : "translateX(-50px)",
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
    },
  });

  const changeMenuCat = i => {
    setMenuVisible(false);
    setTimeout(() => { setMenuCat(i); setMenuVisible(true); }, 200);
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#FAF8F4", color: "#1a1a1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#c8a97e;border-radius:2px}

        .nl{font-family:'Jost',sans-serif;font-weight:300;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;color:#1a1a1a;text-decoration:none;transition:color .3s;padding:4px 0;position:relative}
        .nl::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:#c8a97e;transition:width .3s}
        .nl:hover::after{width:100%}.nl:hover{color:#c8a97e}

        .lb{font-family:'Jost',sans-serif;font-size:10px;font-weight:400;letter-spacing:1.5px;text-transform:uppercase;border:1px solid #1a1a1a;background:transparent;padding:5px 10px;cursor:pointer;transition:all .3s;color:#1a1a1a}
        .lb.on{background:#1a1a1a;color:#FAF8F4}
        .lb:hover:not(.on){background:#c8a97e;border-color:#c8a97e;color:white}

        .bp{font-family:'Jost',sans-serif;font-weight:400;font-size:11px;letter-spacing:3px;text-transform:uppercase;background:#1a1a1a;color:#FAF8F4;border:none;padding:16px 40px;cursor:pointer;transition:all .4s;display:inline-block;text-decoration:none}
        .bp:hover{background:#c8a97e;letter-spacing:4px}
        .bo{font-family:'Jost',sans-serif;font-weight:400;font-size:11px;letter-spacing:3px;text-transform:uppercase;background:transparent;color:#1a1a1a;border:1px solid #1a1a1a;padding:16px 40px;cursor:pointer;transition:all .4s;display:inline-block;text-decoration:none}
        .bo:hover{background:#1a1a1a;color:#FAF8F4}

        .mt{font-family:'Jost',sans-serif;font-weight:300;font-size:10px;letter-spacing:2px;text-transform:uppercase;background:none;border:none;padding:10px 0;cursor:pointer;color:#999;transition:color .3s;position:relative;margin-right:32px}
        .mt::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:#c8a97e;transition:width .3s}
        .mt.on{color:#1a1a1a}.mt.on::after{width:100%}.mt:hover{color:#1a1a1a}

        .sl{font-family:'Jost',sans-serif;font-weight:300;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#c8a97e;margin-bottom:16px}
        .dv{width:40px;height:1px;background:#c8a97e;margin:24px 0}
        .mi{padding:24px 0;border-bottom:1px solid #e8e2d9;display:flex;justify-content:space-between;align-items:flex-start;gap:16px;transition:padding-left .3s}
        .mi:last-child{border-bottom:none}.mi:hover{padding-left:8px}

        .rd{width:8px;height:8px;border-radius:50%;background:#e8e2d9;border:none;cursor:pointer;transition:all .3s;padding:0}
        .rd.on{background:#c8a97e;transform:scale(1.4)}

        @keyframes floatUp{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-18px) rotate(5deg)}66%{transform:translateY(-8px) rotate(-3deg)}}
        @keyframes fadeDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes grain{0%,100%{transform:translate(0,0)}20%{transform:translate(-2%,-3%)}40%{transform:translate(2%,1%)}60%{transform:translate(-1%,3%)}80%{transform:translate(3%,-1%)}}.grain::after{content:'';position:fixed;inset:-200%;width:400%;height:400%;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;opacity:.04;animation:grain 8s steps(10) infinite;z-index:9999}

        .mnp{position:fixed;top:0;right:0;width:280px;height:100vh;background:#FAF8F4;z-index:1001;padding:80px 40px 40px;box-shadow:-10px 0 40px rgba(0,0,0,.1);transform:translateX(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;gap:32px}
        .mnp.op{transform:translateX(0)}
        .ovl{position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:1000;opacity:0;pointer-events:none;transition:opacity .4s}.ovl.op{opacity:1;pointer-events:all}

        .miw{transition:opacity .2s ease,transform .2s ease}
        .miw.hid{opacity:0;transform:translateY(8px)}.miw.vis{opacity:1;transform:translateY(0)}

        @media(max-width:900px){.dn{display:none!important}.mt{margin-right:20px}.hero-t{font-size:56px!important}.ag,.cg{grid-template-columns:1fr!important}.sg{grid-template-columns:1fr 1fr!important}.fg{grid-template-columns:1fr 1fr!important}.rg{grid-template-columns:1fr!important}}
        @media(max-width:540px){.fg,.rg{grid-template-columns:1fr!important}}
      `}</style>

      <div className="grain" />
      <div className={`ovl ${mobileMenu ? "op" : ""}`} onClick={() => setMobileMenu(false)} />

      {/* Mobile nav */}
      <div className={`mnp ${mobileMenu ? "op" : ""}`}>
        <button onClick={() => setMobileMenu(false)} style={{ position:"absolute",top:24,right:24,background:"none",border:"none",fontSize:24,cursor:"pointer" }}>✕</button>
        {Object.entries(t.nav).map(([k,v]) => (
          <span key={k} className="nl" style={{ fontSize:13,letterSpacing:3 }} onClick={() => scrollTo(k)}>{v}</span>
        ))}
        <div style={{ display:"flex",gap:6,marginTop:16 }}>
          {["ru","en","uz"].map(l => (
            <button key={l} className={`lb ${lang===l?"on":""}`} onClick={() => { setLang(l); setMenuCat(0); }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 5%",height:70,display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(250,248,244,0.96)":"transparent",backdropFilter:scrolled?"blur(14px)":"none",transition:"all .4s",borderBottom:scrolled?"1px solid #e8e2d9":"1px solid transparent" }}>
        <div style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:8 }} onClick={() => scrollTo("home")}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:500,letterSpacing:4,textTransform:"uppercase" }}>Rodena</span>
          <span style={{ width:1,height:20,background:"#c8a97e",display:"inline-block",marginLeft:4 }} />
          <span style={{ fontFamily:"Jost,sans-serif",fontSize:9,fontWeight:300,letterSpacing:2,color:"#c8a97e",textTransform:"uppercase" }}>Coffee</span>
        </div>
        <div className="dn" style={{ display:"flex",gap:24,alignItems:"center" }}>
          {Object.entries(t.nav).map(([k,v]) => <span key={k} className="nl" onClick={() => scrollTo(k)}>{v}</span>)}
        </div>
        <div style={{ display:"flex",gap:6,alignItems:"center" }}>
          <div className="dn" style={{ display:"flex",gap:4 }}>
            {["ru","en","uz"].map(l => <button key={l} className={`lb ${lang===l?"on":""}`} onClick={() => { setLang(l); setMenuCat(0); }}>{l.toUpperCase()}</button>)}
          </div>
          <button onClick={() => setMobileMenu(true)} style={{ display:"none",flexDirection:"column",gap:5,background:"none",border:"none",cursor:"pointer",padding:4 }} className="mob-tog">
            {[22,16,22].map((w,i) => <span key={i} style={{ display:"block",width:w,height:1,background:"#1a1a1a" }} />)}
          </button>
        </div>
      </nav>
      <style>{`.mob-tog{display:flex!important}@media(min-width:901px){.mob-tog{display:none!important}}`}</style>

      {/* HERO */}
      <section id="home" style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 5%",position:"relative",overflow:"hidden" }}>
        {PARTICLES.map((p,i) => (
          <div key={i} style={{ position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,borderRadius:"50%",background:"#c8a97e",opacity:0.055,pointerEvents:"none",animation:`floatUp ${p.d}s ease-in-out ${i*0.6}s infinite` }} />
        ))}
        <div style={{ position:"absolute",right:"3%",top:"50%",transform:`translateY(calc(-50% + ${parallax*0.4}px))`,fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(200px,28vw,420px)",fontWeight:300,color:"transparent",WebkitTextStroke:"1px #e8e2d9",lineHeight:1,userSelect:"none",pointerEvents:"none",animation:"fadeDown 1.2s ease .3s both",transition:"transform .05s linear" }}>R</div>
        <div style={{ position:"absolute",left:"5%",top:"30%",width:1,height:"40%",background:"linear-gradient(to bottom,transparent,#c8a97e,transparent)" }} />
        <div style={{ maxWidth:700,paddingLeft:"4%",transform:`translateY(${parallax*-0.15}px)`,animation:"fadeDown .9s ease .1s both" }}>
          <p className="sl" style={{ marginBottom:24 }}>Tashkent — 2 locations</p>
          <h1 className="hero-t" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(52px,8vw,110px)",fontWeight:300,lineHeight:1.05,letterSpacing:-1 }}>
            {t.hero.tagline}<br />
            <em style={{ fontStyle:"italic",color:"#c8a97e" }}>{t.hero.tagline2}</em>
          </h1>
          <div className="dv" />
          <p style={{ fontFamily:"Jost,sans-serif",fontWeight:300,fontSize:15,letterSpacing:1,color:"#666",marginBottom:40 }}>{t.hero.sub}</p>
          <button className="bp" onClick={() => scrollTo("contact")}>{t.hero.cta}</button>
        </div>
        <div style={{ position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeDown 1s ease 1s both" }}>
          <span style={{ fontFamily:"Jost,sans-serif",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"#999" }}>{t.hero.scroll}</span>
          <div style={{ width:1,height:40,background:"linear-gradient(to bottom,#c8a97e,transparent)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding:"100px 5%",background:"#F2EFE9" }}>
        <div className="ag" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px 60px",alignItems:"start" }}>
          <div {...slideL("ab-l",0)}>
            <p className="sl">{t.about.label}</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,60px)",fontWeight:300,lineHeight:1.15,marginBottom:32 }}>{t.about.title}</h2>
            <div className="dv" />
            {[t.about.p1,t.about.p2,t.about.p3].map((p,i) => <p key={i} style={{ fontFamily:"Jost,sans-serif",fontWeight:300,fontSize:15,lineHeight:1.8,color:"#444",marginBottom:16 }}>{p}</p>)}
          </div>
          <div {...fade("ab-r",0.2)}>
            <div className="sg" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:2 }}>
              {[
                { v:t.about.stat1,s:t.about.stat1s,l:t.about.stat1l },
                { v:t.about.stat2,s:t.about.stat2s,l:t.about.stat2l },
                { v:t.about.stat3,s:t.about.stat3s,l:t.about.stat3l },
                { v:t.about.stat4,s:t.about.stat4s,l:t.about.stat4l },
              ].map((s,i) => (
                <div key={i} style={{ padding:"48px 32px",background:i%2===0?"#1a1a1a":"#FAF8F4",color:i%2===0?"#FAF8F4":"#1a1a1a",display:"flex",flexDirection:"column",gap:8 }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:42,fontWeight:300,color:i%2===0?"#c8a97e":"#1a1a1a" }}>
                    <Counter target={s.v} suffix={s.s} duration={1600} />
                  </span>
                  <span style={{ fontFamily:"Jost,sans-serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",fontWeight:300,opacity:0.6 }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" style={{ padding:"100px 5%",background:"#FAF8F4" }}>
        <div {...fade("mh",0)} style={{ marginBottom:60 }}>
          <p className="sl">{t.menu.label}</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,60px)",fontWeight:300,lineHeight:1.15,marginBottom:16 }}>{t.menu.title}</h2>
          <div className="dv" />
        </div>
        <div style={{ borderBottom:"1px solid #e8e2d9",marginBottom:48,display:"flex",overflowX:"auto" }}>
          {cats.map((c,i) => <button key={i} className={`mt ${menuCat===i?"on":""}`} onClick={() => changeMenuCat(i)}>{c}</button>)}
        </div>
        <div className={`miw ${menuVisible?"vis":"hid"}`}>
          {t.menu.items[cats[menuCat]]?.map((item,i) => (
            <div key={i} className="mi">
              <div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:500,marginBottom:4 }}>{item.name}</p>
                <p style={{ fontFamily:"Jost,sans-serif",fontWeight:300,fontSize:13,color:"#888",letterSpacing:0.5 }}>{item.desc}</p>
              </div>
              <div style={{ textAlign:"right",flexShrink:0 }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:500,color:"#c8a97e" }}>{item.price}</span>
                <span style={{ fontFamily:"Jost,sans-serif",fontSize:11,color:"#aaa",display:"block",letterSpacing:1 }}>UZS</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily:"Jost,sans-serif",fontSize:12,color:"#aaa",letterSpacing:1,marginTop:40,textTransform:"uppercase" }}>{t.menu.avg}</p>
      </section>

      {/* ATMOSPHERE */}
      <section id="gallery" style={{ padding:"100px 5%",background:"#1a1a1a",color:"#FAF8F4" }}>
        <div {...fade("ah",0)} style={{ marginBottom:60 }}>
          <p className="sl">{t.atmosphere.label}</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,60px)",fontWeight:300,lineHeight:1.15,marginBottom:16 }}>{t.atmosphere.title}</h2>
          <div style={{ width:40,height:1,background:"#c8a97e",margin:"24px 0" }} />
        </div>
        <div className="fg" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2 }}>
          {t.atmosphere.features.map((f,i) => (
            <div key={i} {...fade(`ft${i}`,i*0.1)}
              style={{ padding:40,border:"1px solid #333",background:"#1a1a1a",color:"#FAF8F4",transition:"all .4s",cursor:"default" }}
              onMouseEnter={e => { const el=e.currentTarget; el.style.background="#FAF8F4"; el.style.color="#1a1a1a"; el.style.borderColor="#FAF8F4"; el.style.transform="translateY(-4px)"; }}
              onMouseLeave={e => { const el=e.currentTarget; el.style.background="#1a1a1a"; el.style.color="#FAF8F4"; el.style.borderColor="#333"; el.style.transform="translateY(0)"; }}
            >
              <span style={{ fontSize:28,display:"block",marginBottom:20,color:"#c8a97e" }}>{f.icon}</span>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:500,marginBottom:12 }}>{f.title}</p>
              <p style={{ fontFamily:"Jost,sans-serif",fontWeight:300,fontSize:13,lineHeight:1.7,color:"#aaa" }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div {...fade("aq",0.3)} style={{ textAlign:"center",padding:"80px 0 20px",borderTop:"1px solid #333",marginTop:80 }}>
          <blockquote style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(24px,4vw,44px)",fontWeight:300,fontStyle:"italic",lineHeight:1.4,color:"#c8a97e",maxWidth:700,margin:"0 auto" }}>
            «RODENA — {t.footer.tagline}»
          </blockquote>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding:"100px 5%",background:"#F2EFE9",overflow:"hidden" }}>
        <div {...fade("rh",0)} style={{ marginBottom:60 }}>
          <p className="sl">{t.reviews.label}</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,60px)",fontWeight:300,lineHeight:1.15 }}>{t.reviews.title}</h2>
          <div className="dv" />
        </div>

        <div {...fade("rs",0.1)}>
          {/* Cards — show 3 on desktop */}
          <div className="rg" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2 }}>
            {[0,1,2].map(offset => {
              const idx = (reviewIdx + offset) % reviews.length;
              const r = reviews[idx];
              const isMain = offset === 0;
              return (
                <div key={`${reviewIdx}-${offset}`} style={{
                  padding:40,
                  background: isMain ? "#1a1a1a" : "#FAF8F4",
                  color: isMain ? "#FAF8F4" : "#1a1a1a",
                  borderTop: `3px solid ${isMain ? "#c8a97e" : "#e8e2d9"}`,
                  border: isMain ? "1px solid #333" : "1px solid #e8e2d9",
                  opacity: isMain ? 1 : 0.65,
                  transform: isMain ? "scale(1)" : "scale(0.975)",
                  transition: "all .6s cubic-bezier(.4,0,.2,1)",
                  animation: "fadeInUp .5s ease both",
                }}>
                  {/* Stars */}
                  <div style={{ display:"flex",gap:3,marginBottom:20 }}>
                    {Array(5).fill(0).map((_,si) => <span key={si} style={{ color:"#c8a97e",fontSize:14 }}>★</span>)}
                  </div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:300,fontStyle:"italic",lineHeight:1.75,marginBottom:28,color:isMain?"#d8d2c8":"#444" }}>
                    "{r.text}"
                  </p>
                  {/* Author */}
                  <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                    <div style={{ width:40,height:40,borderRadius:"50%",background:"#c8a97e",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:500,color:"#FAF8F4",flexShrink:0 }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p style={{ fontFamily:"Jost,sans-serif",fontWeight:400,fontSize:13,letterSpacing:0.8 }}>{r.name}</p>
                      <p style={{ fontFamily:"Jost,sans-serif",fontWeight:300,fontSize:11,letterSpacing:1,opacity:0.45,marginTop:2 }}>{r.city}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div style={{ display:"flex",gap:8,justifyContent:"center",marginTop:40 }}>
            {reviews.map((_,i) => (
              <button key={i} className={`rd ${i===reviewIdx?"on":""}`} onClick={() => setReviewIdx(i)} />
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display:"flex",gap:10,justifyContent:"center",marginTop:18 }}>
            {["←","→"].map((a,ai) => (
              <button key={ai}
                onClick={() => setReviewIdx(i => (i + (ai===0?-1:1) + reviews.length) % reviews.length)}
                style={{ fontFamily:"Jost,sans-serif",fontSize:18,background:"none",border:"1px solid #c8a97e",color:"#c8a97e",width:44,height:44,cursor:"pointer",transition:"all .3s",display:"flex",alignItems:"center",justifyContent:"center" }}
                onMouseEnter={e => { e.currentTarget.style.background="#c8a97e"; e.currentTarget.style.color="#FAF8F4"; }}
                onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.color="#c8a97e"; }}
              >{a}</button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"100px 5%",background:"#FAF8F4" }}>
        <div {...fade("ch",0)} style={{ marginBottom:60 }}>
          <p className="sl">{t.contact.label}</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,60px)",fontWeight:300,lineHeight:1.15 }}>{t.contact.title}</h2>
          <div className="dv" />
        </div>
        <div className="cg" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,marginBottom:60 }}>
          {[
            { name:t.contact.branch1,addr:t.contact.addr1 },
            { name:t.contact.branch2,addr:t.contact.addr2 },
          ].map((b,i) => (
            <div key={i} {...fade(`br${i}`,i*0.15)} style={{ padding:"48px 40px",background:i===0?"#1a1a1a":"#F2EFE9",color:i===0?"#FAF8F4":"#1a1a1a",borderTop:"3px solid #c8a97e" }}>
              <p className="sl" style={{ color:"#c8a97e" }}>{b.name}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:400,marginBottom:16 }}>{b.addr}</p>
              <div style={{ width:30,height:1,background:"#c8a97e",margin:"20px 0" }} />
              <p style={{ fontFamily:"Jost,sans-serif",fontWeight:300,fontSize:13,letterSpacing:1,opacity:0.7,marginBottom:4 }}>{t.contact.hours}</p>
              <p style={{ fontFamily:"Jost,sans-serif",fontWeight:300,fontSize:13,letterSpacing:1,opacity:0.7 }}>{t.contact.phone}</p>
            </div>
          ))}
        </div>
        <div {...fade("cb",0.3)} style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
          <a href={`tel:${t.contact.phone.replace(/\s/g,"")}`} className="bp">{t.contact.reserve}</a>
          <a href="https://broniboy.ru/tashkent/restaurants/p_Rodena/" target="_blank" rel="noopener noreferrer" className="bo">{t.contact.delivery}</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"40px 5%",background:"#1a1a1a",color:"#FAF8F4",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16 }}>
        <div>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:400,letterSpacing:4,textTransform:"uppercase" }}>Rodena</span>
          <span style={{ fontFamily:"Jost,sans-serif",fontSize:10,color:"#c8a97e",letterSpacing:2,textTransform:"uppercase",marginLeft:12 }}>{t.footer.tagline}</span>
        </div>
        <span style={{ fontFamily:"Jost,sans-serif",fontSize:10,letterSpacing:1,color:"#555" }}>{t.footer.copy}</span>
      </footer>
    </div>
  );
}