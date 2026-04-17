import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════════════════════════ */
const T = {
  ru: {
    nav: ["Главная","О нас","Меню","Атмосфера","Отзывы","Контакты"],
    navIds: ["home","about","menu","atmosphere","reviews","contact"],
    hero: {
      eyebrow: "Ташкент · 2 филиала",
      line1: "Место, где",
      line2: "встречается",
      line3: "вкус и уют",
      sub: "Кофейня нового поколения в сердце Ташкента",
      cta1: "Забронировать стол",
      cta2: "Смотреть меню",
      scroll: "прокрутите",
    },
    about: {
      label: "Наша история",
      title: "Больше,\nчем кофейня",
      p1: "Rodena — это пространство, где каждая деталь продумана до совершенства. Мы объединили европейскую кухню, азиатские акценты и душу Ташкента в одном месте.",
      p2: "Живая музыка каждый вечер, свободный Wi-Fi, уютные зоны для работы и тихих бесед — атмосфера, созданная для людей.",
      p3: "Каждое блюдо — история. Каждая чашка — ритуал.",
      stats: [
        { n: 2, s: "+", l: "Филиала" },
        { n: 5, s: "", l: "Лет с вами" },
        { n: 40, s: "+", l: "Мест" },
        { n: 2025, s: "", l: "Лучшая кофейня" },
      ],
    },
    menu: {
      label: "Гастрономия",
      title: "Меню",
      tabs: ["Завтраки","Основные блюда","Десерты","Напитки"],
      keys: ["Завтраки","Основные блюда","Десерты","Напитки"],
      avg: "Средний чек · 150 000 — 200 000 сум",
      items: {
        "Завтраки": [
          { n:"Бельгийские вафли", d:"Лесные ягоды · свежий крем · кленовый сироп", p:"45 000", tag:"Хит" },
          { n:"Блины с лососем", d:"Копчёный лосось · сливочный сыр · каперсы · микрозелень", p:"55 000" },
          { n:"Яйцо пашот с авокадо", d:"Тост бриошь · авокадо · яйцо пашот · трюфельное масло", p:"42 000" },
          { n:"Гранола с йогуртом", d:"Домашняя гранола · греческий йогурт · сезонные ягоды · мёд", p:"38 000" },
        ],
        "Основные блюда": [
          { n:"Паста Карбонара", d:"Свежая паста · гуанчале · пармезан · желток · чёрный перец", p:"68 000", tag:"Chef" },
          { n:"Рибай-стейк", d:"Мраморная говядина · соус берблан · сезонные овощи · картофель", p:"120 000" },
          { n:"Том-ям с тигровыми креветками", d:"Кокосовое молоко · лемонграсс · галангал · лайм · чили", p:"72 000" },
          { n:"Вок с курицей и лапшой", d:"Рисовая лапша · бок-чой · устричный соус · кунжут", p:"58 000" },
          { n:"Ризотто с трюфелем", d:"Арборио · трюфельный крем · пармезан · руккола", p:"85 000", tag:"Новинка" },
        ],
        "Десерты": [
          { n:"Тирамису Rodena", d:"Маскарпоне ·  савоярди · эспрессо · какао · амаретто", p:"38 000", tag:"Хит" },
          { n:"Чизкейк Нью-Йорк", d:"Сливочный крем · ягодный конфитюр · песочная основа", p:"42 000" },
          { n:"Шоколадный фондан", d:"Горький шоколад 70% · ванильное мороженое · малиновый соус", p:"45 000" },
          { n:"Панна котта", d:"Ваниль · клубничный кули · мята · хрустящий туиль", p:"36 000" },
        ],
        "Напитки": [
          { n:"Фирменный латте Rodena", d:"Двойной эспрессо · карамельный сироп · вспененное молоко", p:"28 000", tag:"Хит" },
          { n:"Матча церемониальный", d:"Японский матча первого сбора · кокосовое молоко · агава", p:"32 000" },
          { n:"Лимонад Rodena", d:"Лимон · имбирь · мята · газированная вода · розмарин", p:"25 000" },
          { n:"Горячий шоколад", d:"Бельгийский шоколад 62% · ваниль · взбитые сливки", p:"30 000" },
          { n:"Глинтвейн", d:"Красное вино · специи · апельсин · корица · гвоздика", p:"35 000" },
        ],
      },
    },
    atmosphere: {
      label: "Пространство",
      title: "Атмосфера",
      cards: [
        { icon:"♪", t:"Живая музыка", d:"Каждый вечер живые выступления создают особое настроение" },
        { icon:"⌨", t:"Работа и встречи", d:"Бесплатный Wi-Fi · розетки на каждом столе · тихие зоны" },
        { icon:"☕", t:"Авторский кофе", d:"Зёрна из лучших регионов мира · 8 методов заваривания" },
        { icon:"🌿", t:"Для всей семьи", d:"Детское меню · уютное пространство · дружелюбная атмосфера" },
        { icon:"🍷", t:"Бар", d:"Авторские коктейли · вина · крафтовое пиво · глинтвейн" },
        { icon:"✦", t:"События", d:"Арт-вечера · джаз-сессии · бизнес-завтраки · приватные встречи" },
      ],
      quote: "Вкус. Уют. Атмосфера.",
    },
    reviews: {
      label: "Гости о нас",
      title: "Отзывы",
      items: [
        { name:"Алина М.", city:"Ташкент", stars:5, text:"Лучшее место для утреннего кофе в городе. Атмосфера невероятная — уходить не хочется. Латте здесь просто волшебный!" },
        { name:"Дилшод Р.", city:"Ташкент", stars:5, text:"Наконец-то нашёл место, где понимают настоящий матча. Тирамису — лучший в городе, проверял лично. Интерьер стильный и уютный." },
        { name:"Sarah K.", city:"Dubai", stars:5, text:"A true hidden gem in Tashkent. Exceptional coffee, beautiful atmosphere and the staff genuinely care. I came back three times in one week." },
        { name:"Камола Ю.", city:"Ташкент", stars:5, text:"Живая музыка по вечерам — это что-то особенное. Ризотто с трюфелем превзошло все ожидания. Обязательно вернёмся!" },
        { name:"Bobur T.", city:"Toshkent", stars:5, text:"Eng zo'r kofe uyi! Muhit, xizmat, taom — hammasi beshta. Har hafta kelamiz, hech qachon hayal qilmaymiz." },
        { name:"Михаил С.", city:"Москва", stars:5, text:"Был в командировке неделю. Rodena стала моим ежедневным ритуалом. Стейк на уровне лучших московских ресторанов — рекомендую!" },
      ],
    },
    contact: {
      label: "Найдите нас",
      title: "Контакты",
      b1n: "Яшнабадский район", b1a: "ул. Авиасозлар, 65",
      b2n: "Мирзо-Улугбекский", b2a: "ул. Паркент, 199",
      hours: "Ежедневно · 08:00 — 23:00",
      phone: "+998 95 475-88-55",
      cta1: "Позвонить", cta2: "Заказать доставку",
    },
    footer: { copy:"© 2025 Rodena Coffee & Bakery", tagline:"Вкус. Уют. Атмосфера." },
  },
  en: {
    nav: ["Home","About","Menu","Atmosphere","Reviews","Contact"],
    navIds: ["home","about","menu","atmosphere","reviews","contact"],
    hero: {
      eyebrow: "Tashkent · 2 Locations",
      line1: "Where flavor",
      line2: "meets",
      line3: "comfort",
      sub: "A next-generation café in the heart of Tashkent",
      cta1: "Reserve a Table",
      cta2: "View Menu",
      scroll: "scroll",
    },
    about: {
      label: "Our Story",
      title: "More than\na café",
      p1: "Rodena is a space where every detail has been crafted to perfection. We've brought together European cuisine, Asian accents, and the soul of Tashkent in one place.",
      p2: "Live music every evening, free Wi-Fi, cozy work zones and quiet corners — an atmosphere created for people.",
      p3: "Every dish is a story. Every cup is a ritual.",
      stats: [
        { n: 2, s: "+", l: "Locations" },
        { n: 5, s: "", l: "Years with you" },
        { n: 40, s: "+", l: "Seats" },
        { n: 2025, s: "", l: "Best Café" },
      ],
    },
    menu: {
      label: "Gastronomy",
      title: "Menu",
      tabs: ["Breakfast","Main Dishes","Desserts","Drinks"],
      keys: ["Breakfast","Main Dishes","Desserts","Drinks"],
      avg: "Average check · 150 000 – 200 000 UZS",
      items: {
        "Breakfast": [
          { n:"Belgian Waffles", d:"Forest berries · fresh cream · maple syrup", p:"45 000", tag:"Hit" },
          { n:"Blini with Salmon", d:"Smoked salmon · cream cheese · capers · microgreens", p:"55 000" },
          { n:"Poached Egg & Avocado", d:"Brioche toast · avocado · poached egg · truffle oil", p:"42 000" },
          { n:"Granola & Yogurt", d:"House granola · Greek yogurt · seasonal berries · honey", p:"38 000" },
        ],
        "Main Dishes": [
          { n:"Pasta Carbonara", d:"Fresh pasta · guanciale · parmesan · egg yolk · black pepper", p:"68 000", tag:"Chef" },
          { n:"Ribeye Steak", d:"Marbled beef · beurre blanc · seasonal vegetables · potatoes", p:"120 000" },
          { n:"Tom Yum with Tiger Prawns", d:"Coconut milk · lemongrass · galangal · lime · chilli", p:"72 000" },
          { n:"Chicken Wok Noodles", d:"Rice noodles · bok choy · oyster sauce · sesame", p:"58 000" },
          { n:"Truffle Risotto", d:"Arborio · truffle cream · parmesan · arugula", p:"85 000", tag:"New" },
        ],
        "Desserts": [
          { n:"Rodena Tiramisu", d:"Mascarpone · savoiardi · espresso · cocoa · amaretto", p:"38 000", tag:"Hit" },
          { n:"New York Cheesecake", d:"Cream cheese · berry jam · shortcrust base", p:"42 000" },
          { n:"Chocolate Fondant", d:"70% dark chocolate · vanilla ice cream · raspberry sauce", p:"45 000" },
          { n:"Panna Cotta", d:"Vanilla · strawberry coulis · mint · crispy tuile", p:"36 000" },
        ],
        "Drinks": [
          { n:"Signature Rodena Latte", d:"Double espresso · caramel syrup · steamed milk", p:"28 000", tag:"Hit" },
          { n:"Ceremonial Matcha", d:"First-flush Japanese matcha · coconut milk · agave", p:"32 000" },
          { n:"Rodena Lemonade", d:"Lemon · ginger · mint · sparkling water · rosemary", p:"25 000" },
          { n:"Hot Chocolate", d:"Belgian 62% chocolate · vanilla · whipped cream", p:"30 000" },
          { n:"Mulled Wine", d:"Red wine · spices · orange · cinnamon · clove", p:"35 000" },
        ],
      },
    },
    atmosphere: {
      label: "Our Space",
      title: "Atmosphere",
      cards: [
        { icon:"♪", t:"Live Music", d:"Live performances every evening create a unique mood" },
        { icon:"⌨", t:"Work & Meet", d:"Free Wi-Fi · power at every table · quiet zones" },
        { icon:"☕", t:"Artisan Coffee", d:"Beans from the world's finest regions · 8 brew methods" },
        { icon:"🌿", t:"Family Friendly", d:"Kids menu · welcoming space · warm atmosphere" },
        { icon:"🍷", t:"Bar", d:"Signature cocktails · wines · craft beer · mulled wine" },
        { icon:"✦", t:"Events", d:"Art evenings · jazz sessions · business breakfasts · private events" },
      ],
      quote: "Taste. Comfort. Atmosphere.",
    },
    reviews: {
      label: "Our Guests",
      title: "Reviews",
      items: [
        { name:"Alina M.", city:"Tashkent", stars:5, text:"The best place for a morning coffee in the city. The atmosphere is incredible — you just don't want to leave. The latte is pure magic!" },
        { name:"Dilshod R.", city:"Tashkent", stars:5, text:"Finally found a place that understands real matcha. The tiramisu is the best in town — I tested personally. Stylish and cozy interior." },
        { name:"Sarah K.", city:"Dubai", stars:5, text:"A true hidden gem in Tashkent. Exceptional coffee, beautiful atmosphere and the staff genuinely care. I came back three times in one week." },
        { name:"Kamola Y.", city:"Tashkent", stars:5, text:"Live music in the evenings is something special. The truffle risotto exceeded all expectations. We will definitely be back!" },
        { name:"Bobur T.", city:"Toshkent", stars:5, text:"The best café! Atmosphere, service, food — everything is five stars. We come every week without fail." },
        { name:"Mikhail S.", city:"Moscow", stars:5, text:"Was on a business trip for a week. Rodena became my daily ritual. The steak is on par with the best Moscow restaurants." },
      ],
    },
    contact: {
      label: "Find Us",
      title: "Contact",
      b1n: "Yashnabad District", b1a: "Aviasozlar St., 65",
      b2n: "Mirzo Ulugbek District", b2a: "Parkent St., 199",
      hours: "Daily · 08:00 — 23:00",
      phone: "+998 95 475-88-55",
      cta1: "Call Us", cta2: "Order Delivery",
    },
    footer: { copy:"© 2025 Rodena Coffee & Bakery", tagline:"Taste. Comfort. Atmosphere." },
  },
  uz: {
    nav: ["Bosh sahifa","Biz haqimizda","Menyu","Muhit","Sharhlar","Kontakt"],
    navIds: ["home","about","menu","atmosphere","reviews","contact"],
    hero: {
      eyebrow: "Toshkent · 2 Filial",
      line1: "Ta'm va",
      line2: "qulaylik",
      line3: "makoni",
      sub: "Toshkent qalbidagi yangi avlod kofe uyi",
      cta1: "Stol band qilish",
      cta2: "Menyuni ko'rish",
      scroll: "aylantiring",
    },
    about: {
      label: "Bizning tarix",
      title: "Kofe uyidan\nko'proq",
      p1: "Rodena — har bir tafsilot mukammal o'ylangan makon. Biz Yevropa oshxonasi, Osiyo ta'mlari va Toshkent ruhini bir joyda birlashtirdik.",
      p2: "Har kech jonli musiqa, bepul Wi-Fi, ish va tinch suhbat uchun qulay zonalar — odamlar uchun yaratilgan muhit.",
      p3: "Har bir taom — hikoya. Har bir finjon — marosim.",
      stats: [
        { n: 2, s: "+", l: "Filial" },
        { n: 5, s: "", l: "Yildan beri" },
        { n: 40, s: "+", l: "O'rindiq" },
        { n: 2025, s: "", l: "Eng yaxshi kofe uyi" },
      ],
    },
    menu: {
      label: "Gastonomiya",
      title: "Menyu",
      tabs: ["Nonushta","Asosiy taomlar","Desertlar","Ichimliklar"],
      keys: ["Nonushta","Asosiy taomlar","Desertlar","Ichimliklar"],
      avg: "O'rtacha hisob · 150 000 — 200 000 so'm",
      items: {
        "Nonushta": [
          { n:"Belgiya vafli", d:"O'rmon mevasi · yangi qaymoq · zaytun siropiyla", p:"45 000", tag:"Hit" },
          { n:"Lososli blin", d:"Tutunli losos · slivochny pishloq · kapers · mikro o'tlar", p:"55 000" },
          { n:"Avokadoli pashot tuxum", d:"Briosh tost · avokado · pashot tuxum · trufel yog'i", p:"42 000" },
          { n:"Granola va yogurt", d:"Uy granolasi · grek yogurti · mavsumiy mevalar · asal", p:"38 000" },
        ],
        "Asosiy taomlar": [
          { n:"Pasta Karbonara", d:"Yangi pasta · guanchale · parmezan · sarig'i · qora qalampir", p:"68 000", tag:"Chef" },
          { n:"Ribeye steyk", d:"Marmar go'sht · byur-blan sousi · mavsumiy sabzavotlar", p:"120 000" },
          { n:"Tom-yam qisqichbaqali", d:"Kokos suti · lemongrass · galangal · laym · chili", p:"72 000" },
          { n:"Tovuqli vok makaron", d:"Guruch makaron · bok-choy · ustritsa sousi · kunjut", p:"58 000" },
          { n:"Trufel rizotto", d:"Arborio · trufel kremi · parmezan · aruugula", p:"85 000", tag:"Yangi" },
        ],
        "Desertlar": [
          { n:"Rodena Tiramisu", d:"Maskarpone · savoyardi · espresso · kakao · amaretto", p:"38 000", tag:"Hit" },
          { n:"Nyu-York Chizkeyki", d:"Kremli pishloq · meva murabbosi · qum asosi", p:"42 000" },
          { n:"Shokolad fondan", d:"70% achchiq shokolad · vanil muzqaymoq · malina sousi", p:"45 000" },
          { n:"Panna kotta", d:"Vanil · qulupnay kuli · yalpiz · qozon tuil", p:"36 000" },
        ],
        "Ichimliklar": [
          { n:"Rodena maxsus latte", d:"Ikki qism espresso · karamel siropiyla · ko'pikli sut", p:"28 000", tag:"Hit" },
          { n:"Marosim matcha", d:"Birinchi terim yapon matchasi · kokos suti · agava", p:"32 000" },
          { n:"Rodena limonadi", d:"Limon · zanjabil · yalpiz · gazlangan suv · rozmarin", p:"25 000" },
          { n:"Issiq shokolad", d:"Belgiya 62% shokoladi · vanil · qaymoq", p:"30 000" },
          { n:"Glintveyn", d:"Qizil sharob · ziravorlar · apelsin · dol ichida", p:"35 000" },
        ],
      },
    },
    atmosphere: {
      label: "Bizning makon",
      title: "Muhit",
      cards: [
        { icon:"♪", t:"Jonli musiqa", d:"Har kech jonli chiqishlar o'ziga xos kayfiyat yaratadi" },
        { icon:"⌨", t:"Ish va uchrashuvlar", d:"Bepul Wi-Fi · har bir stolda rozetka · sokin zonalar" },
        { icon:"☕", t:"Muallif qahva", d:"Dunyo eng yaxshi regionlaridan donalar · 8 pishirish usuli" },
        { icon:"🌿", t:"Butun oila uchun", d:"Bolalar menyusi · qulay makon · iliq muhit" },
        { icon:"🍷", t:"Bar", d:"Muallif kokteyllar · vinolar · craft pivo · glintveyn" },
        { icon:"✦", t:"Tadbirlar", d:"San'at kechalari · jazz · biznes nonushtalari · xususiy uchrashuvlar" },
      ],
      quote: "Ta'm. Qulaylik. Muhit.",
    },
    reviews: {
      label: "Mehmonlarimiz",
      title: "Sharhlar",
      items: [
        { name:"Alina M.", city:"Toshkent", stars:5, text:"Shahardagi ertalabki qahva uchun eng yaxshi joy. Muhit ajoyib — ketgisi kelmaydi. Latte sehrli!" },
        { name:"Dilshod R.", city:"Toshkent", stars:5, text:"Nihoyat haqiqiy matchani tushunadigan joy topdim. Tiramisu shahardagi eng yaxshisi — shaxsan tekshirdim." },
        { name:"Sarah K.", city:"Dubai", stars:5, text:"A true hidden gem in Tashkent. Exceptional coffee, beautiful atmosphere and the staff genuinely care. I came back three times in one week." },
        { name:"Kamola Yu.", city:"Toshkent", stars:5, text:"Kechki jonli musiqa — bu alohida bir narsa. Trufel rizotto barcha kutganlarni ortda qoldirdi. Albatta qaytamiz!" },
        { name:"Bobur T.", city:"Toshkent", stars:5, text:"Eng zo'r kofe uyi! Muhit, xizmat, taom — hammasi beshta. Har hafta kelamiz, hech qachon hayal qilmaymiz." },
        { name:"Mixail S.", city:"Moskva", stars:5, text:"Bir hafta ish safarida bo'ldim. Rodena kunlik marosimim bo'lib qoldi. Steyk Moskvaning eng yaxshi restoranlariga teng!" },
      ],
    },
    contact: {
      label: "Bizni toping",
      title: "Kontaktlar",
      b1n: "Yashnobod tumani", b1a: "Aviasozlar ko'chasi, 65",
      b2n: "Mirzo Ulug'bek tumani", b2a: "Parkent ko'chasi, 199",
      hours: "Har kuni · 08:00 — 23:00",
      phone: "+998 95 475-88-55",
      cta1: "Qo'ng'iroq qilish", cta2: "Yetkazib berish",
    },
    footer: { copy:"© 2025 Rodena Coffee & Bakery", tagline:"Ta'm. Qulaylik. Muhit." },
  },
};

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════════ */
function Counter({ to, suffix = "", dur = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const t0 = performance.now();
        const tick = now => {
          const p = Math.min((now - t0) / dur, 1);
          const e2 = 1 - Math.pow(1 - p, 4);
          setVal(Math.round(e2 * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to, dur]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON HOOK
═══════════════════════════════════════════════════════════════ */
function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = e => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
    };
    const leave = () => setPos({ x: 0, y: 0 });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
  return { ref, style: { transform: `translate(${pos.x}px,${pos.y}px)`, transition: pos.x === 0 ? "transform 0.5s cubic-bezier(0.23,1,0.32,1)" : "transform 0.1s ease" } };
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
═══════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const [vis, setVis] = useState({});
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting && e.target.id) setVis(v => ({ ...v, [e.target.id]: true })); }),
      { threshold }
    );
    document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return vis;
}

/* ═══════════════════════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════════════════════ */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring_pos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * 0.12;
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * 0.12;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${ring_pos.current.x - 20}px,${ring_pos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot} style={{ position:"fixed",width:8,height:8,borderRadius:"50%",background:"#C9A96E",pointerEvents:"none",zIndex:9999,top:0,left:0,mixBlendMode:"difference" }} />
      <div ref={ring} style={{ position:"fixed",width:40,height:40,borderRadius:"50%",border:"1px solid rgba(201,169,110,0.6)",pointerEvents:"none",zIndex:9998,top:0,left:0 }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NOISE CANVAS
═══════════════════════════════════════════════════════════════ */
function Noise() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = 256; c.height = 256;
    const img = ctx.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i+1] = img.data[i+2] = v;
      img.data[i+3] = 18;
    }
    ctx.putImageData(img, 0, 0);
  }, []);
  return <canvas ref={ref} style={{ position:"fixed",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none",zIndex:1,opacity:1,mixBlendMode:"overlay" }} />;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Rodena() {
  const [lang, setLang] = useState("ru");
  const [menuTab, setMenuTab] = useState(0);
  const [menuTabVis, setMenuTabVis] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [revIdx, setRevIdx] = useState(0);
  const [revDir, setRevDir] = useState(1);
  const vis = useReveal(0.1);
  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setRevDir(1);
      setRevIdx(i => (i + 1) % t.reviews.items.length);
    }, 5000);
    return () => clearInterval(id);
  }, [t.reviews.items.length]);

  const goto = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const switchTab = i => {
    setMenuTabVis(false);
    setTimeout(() => { setMenuTab(i); setMenuTabVis(true); }, 260);
  };

  const switchLang = l => {
    setLang(l);
    setMenuTab(0);
    setMenuTabVis(true);
  };

  const revPrev = () => { setRevDir(-1); setRevIdx(i => (i - 1 + t.reviews.items.length) % t.reviews.items.length); };
  const revNext = () => { setRevDir(1); setRevIdx(i => (i + 1) % t.reviews.items.length); };

  const rv = (id, delay = 0) => ({
    id, "data-reveal": true,
    style: {
      opacity: vis[id] ? 1 : 0,
      transform: vis[id] ? "none" : "translateY(48px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    },
  });

  const rl = (id, delay = 0) => ({
    id, "data-reveal": true,
    style: {
      opacity: vis[id] ? 1 : 0,
      transform: vis[id] ? "none" : "translateX(-60px)",
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    },
  });

  const rr = (id, delay = 0) => ({
    id, "data-reveal": true,
    style: {
      opacity: vis[id] ? 1 : 0,
      transform: vis[id] ? "none" : "translateX(60px)",
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    },
  });

  const navScrolled = scrollY > 60;
  const parallaxR = scrollY * 0.28;
  const parallaxHero = scrollY * -0.18;

  const currentItems = t.menu.items[t.menu.keys[menuTab]] || [];

  return (
    <div style={{ background:"#080808",color:"#E8E0D0",fontFamily:"'Cormorant Garamond',Georgia,serif",overflowX:"hidden",minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500&family=Jost:wght@100;200;300;400&family=IM+Fell+English:ital@1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-track{background:#080808}
        ::-webkit-scrollbar-thumb{background:#C9A96E}

        .jost{font-family:'Jost',sans-serif}
        .cormorant{font-family:'Cormorant Garamond',serif}
        .fell{font-family:'IM Fell English',serif}

        .label{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:5px;text-transform:uppercase;color:#C9A96E;font-weight:200}
        .gold{color:#C9A96E}
        .muted{color:rgba(232,224,208,0.45)}

        .line{display:block;overflow:hidden}
        .line-inner{display:block;animation:none}

        @keyframes lineUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(3deg)}}
        @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes borderAnim{0%,100%{clip-path:inset(0 0 98% 0)}25%{clip-path:inset(0 98% 0 0)}50%{clip-path:inset(98% 0 0 0)}75%{clip-path:inset(0 0 0 98%)}}
        @keyframes pulse{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes drawLine{from{width:0}to{width:100%}}

        .hero-word{
          display:inline-block;
          animation:lineUp 1.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        .btn-gold{
          font-family:'Jost',sans-serif;font-size:10px;letter-spacing:4px;
          text-transform:uppercase;font-weight:300;
          background:#C9A96E;color:#080808;
          border:none;padding:18px 48px;cursor:pointer;
          transition:all 0.5s cubic-bezier(0.23,1,0.32,1);
          position:relative;overflow:hidden;
          display:inline-block;text-decoration:none;
        }
        .btn-gold::before{
          content:'';position:absolute;top:0;left:-100%;
          width:100%;height:100%;
          background:rgba(255,255,255,0.15);
          transform:skewX(-20deg);
          transition:left 0.6s;
        }
        .btn-gold:hover::before{left:120%}
        .btn-gold:hover{letter-spacing:6px;background:#E8C87A}

        .btn-ghost{
          font-family:'Jost',sans-serif;font-size:10px;letter-spacing:4px;
          text-transform:uppercase;font-weight:300;
          background:transparent;color:#E8E0D0;
          border:1px solid rgba(232,224,208,0.35);
          padding:17px 48px;cursor:pointer;
          transition:all 0.5s cubic-bezier(0.23,1,0.32,1);
          display:inline-block;text-decoration:none;
        }
        .btn-ghost:hover{border-color:#C9A96E;color:#C9A96E;letter-spacing:6px}

        .nav-link-item{
          font-family:'Jost',sans-serif;font-size:10px;letter-spacing:3px;
          text-transform:uppercase;font-weight:200;
          cursor:pointer;color:rgba(232,224,208,0.7);
          transition:color 0.3s;padding:4px 0;
          position:relative;text-decoration:none;background:none;border:none;
        }
        .nav-link-item::after{
          content:'';position:absolute;bottom:-2px;left:0;
          width:0;height:1px;background:#C9A96E;transition:width 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .nav-link-item:hover{color:#C9A96E}
        .nav-link-item:hover::after{width:100%}

        .menu-tab-btn{
          font-family:'Jost',sans-serif;font-size:10px;letter-spacing:3px;
          text-transform:uppercase;font-weight:300;
          background:none;border:none;cursor:pointer;
          padding:12px 0;color:rgba(232,224,208,0.35);
          transition:color 0.4s;position:relative;margin-right:36px;
          white-space:nowrap;
        }
        .menu-tab-btn::after{
          content:'';position:absolute;bottom:0;left:0;
          height:1px;background:#C9A96E;width:0;transition:width 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .menu-tab-btn.active{color:#E8E0D0}
        .menu-tab-btn.active::after{width:100%}
        .menu-tab-btn:hover{color:rgba(232,224,208,0.7)}

        .mi-row{
          display:flex;justify-content:space-between;align-items:flex-start;
          padding:28px 0;border-bottom:1px solid rgba(232,224,208,0.06);
          gap:20px;transition:all 0.4s cubic-bezier(0.23,1,0.32,1);
          cursor:default;position:relative;
        }
        .mi-row::before{
          content:'';position:absolute;left:0;bottom:0;width:0;height:1px;
          background:linear-gradient(to right,#C9A96E,transparent);
          transition:width 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .mi-row:last-child{border-bottom:none}
        .mi-row:hover::before{width:100%}
        .mi-row:hover{padding-left:12px}

        .feat-card{
          padding:48px 36px;
          border:1px solid rgba(232,224,208,0.08);
          transition:all 0.6s cubic-bezier(0.23,1,0.32,1);
          position:relative;overflow:hidden;
          cursor:default;
        }
        .feat-card::before{
          content:'';position:absolute;inset:0;
          background:radial-gradient(circle at 30% 50%, rgba(201,169,110,0.06), transparent 70%);
          opacity:0;transition:opacity 0.6s;
        }
        .feat-card:hover{
          border-color:rgba(201,169,110,0.25);
          transform:translateY(-6px);
          background:rgba(201,169,110,0.03);
        }
        .feat-card:hover::before{opacity:1}

        .rev-card{
          background:rgba(232,224,208,0.03);
          border:1px solid rgba(232,224,208,0.08);
          padding:52px 48px;
          position:relative;
          animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .rev-card::before{
          content:'"';
          position:absolute;top:-20px;left:36px;
          font-family:'Cormorant Garamond',serif;
          font-size:140px;color:#C9A96E;opacity:0.1;
          line-height:1;
          pointer-events:none;
        }

        .dot-btn{
          width:6px;height:6px;border-radius:50%;
          background:rgba(232,224,208,0.2);border:none;cursor:pointer;
          transition:all 0.4s;padding:0;
        }
        .dot-btn.on{background:#C9A96E;transform:scale(1.5)}

        .lang-btn-r{
          font-family:'Jost',sans-serif;font-size:10px;letter-spacing:2px;
          background:none;border:none;cursor:pointer;
          color:rgba(232,224,208,0.35);font-weight:200;
          transition:color 0.3s;padding:4px 8px;
          text-transform:uppercase;
        }
        .lang-btn-r.on{color:#C9A96E}
        .lang-btn-r:hover{color:rgba(232,224,208,0.8)}

        .tag{
          font-family:'Jost',sans-serif;font-size:8px;letter-spacing:2px;
          text-transform:uppercase;color:#C9A96E;
          border:1px solid rgba(201,169,110,0.4);
          padding:3px 8px;margin-left:10px;vertical-align:middle;
          white-space:nowrap;
        }

        .contact-card{
          border:1px solid rgba(232,224,208,0.08);
          padding:52px 48px;
          position:relative;overflow:hidden;
          transition:border-color 0.5s;
        }
        .contact-card::after{
          content:'';
          position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(to right,transparent,#C9A96E,transparent);
          transform:scaleX(0);transition:transform 0.8s cubic-bezier(0.16,1,0.3,1);
          transform-origin:left;
        }
        .contact-card:hover::after{transform:scaleX(1)}
        .contact-card:hover{border-color:rgba(232,224,208,0.15)}

        .mobile-nav{
          position:fixed;inset:0;z-index:200;
          background:rgba(8,8,8,0.98);backdrop-filter:blur(20px);
          display:flex;flex-direction:column;justify-content:center;align-items:center;
          gap:48px;
          transform:translateY(-100%);
          transition:transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-nav.open{transform:translateY(0)}
        .mobile-nav .nav-link-item{font-size:24px;letter-spacing:8px;font-weight:200}

        @media(max-width:900px){
          .nav-desktop{display:none!important}
          .hm-tog{display:flex!important}
          .hero-title{font-size:clamp(48px,12vw,80px)!important}
          .ab-grid{grid-template-columns:1fr!important}
          .st-grid{grid-template-columns:1fr 1fr!important}
          .feat-grid{grid-template-columns:1fr 1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .rev-card{padding:36px 28px!important}
          .rev-card::before{font-size:80px!important}
        }
        @media(max-width:540px){
          .feat-grid{grid-template-columns:1fr!important}
          .st-grid{grid-template-columns:1fr 1fr!important}
          .rev-card{padding:28px 20px!important}
        }
      `}</style>

      {/* Custom cursor (desktop only) */}
      <Cursor />
      <Noise />

      {/* Mobile Nav */}
      <div className={`mobile-nav ${navOpen ? "open" : ""}`}>
        <button onClick={() => setNavOpen(false)} style={{ position:"absolute",top:32,right:32,background:"none",border:"none",color:"#E8E0D0",fontSize:28,cursor:"pointer",lineHeight:1 }}>✕</button>
        {t.nav.map((n, i) => (
          <button key={i} className="nav-link-item" style={{ fontSize:20,letterSpacing:8 }} onClick={() => goto(t.navIds[i])}>{n}</button>
        ))}
        <div style={{ display:"flex",gap:4 }}>
          {["ru","en","uz"].map(l => <button key={l} className={`lang-btn-r ${lang===l?"on":""}`} onClick={() => { switchLang(l); setNavOpen(false); }}>{l.toUpperCase()}</button>)}
        </div>
      </div>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        padding:"0 6%",height:72,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background: navScrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(232,224,208,0.06)" : "none",
        transition:"all 0.6s cubic-bezier(0.23,1,0.32,1)",
      }}>
        {/* Logo */}
        <div onClick={() => goto("home")} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:400,letterSpacing:8,textTransform:"uppercase",color:"#E8E0D0" }}>RODENA</span>
          <span style={{ width:1,height:16,background:"#C9A96E",opacity:0.6 }} />
          <span className="jost" style={{ fontSize:8,letterSpacing:3,color:"#C9A96E",textTransform:"uppercase",fontWeight:200 }}>Coffee</span>
        </div>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display:"flex",gap:36,alignItems:"center" }}>
          {t.nav.map((n, i) => <button key={i} className="nav-link-item" onClick={() => goto(t.navIds[i])}>{n}</button>)}
        </div>

        {/* Right side */}
        <div style={{ display:"flex",gap:4,alignItems:"center" }}>
          <div className="nav-desktop" style={{ display:"flex",gap:0,marginRight:24,borderLeft:"1px solid rgba(232,224,208,0.1)",paddingLeft:16 }}>
            {["ru","en","uz"].map(l => <button key={l} className={`lang-btn-r ${lang===l?"on":""}`} onClick={() => switchLang(l)}>{l.toUpperCase()}</button>)}
          </div>
          <button className="hm-tog" onClick={() => setNavOpen(true)} style={{ display:"none",flexDirection:"column",gap:6,background:"none",border:"none",cursor:"pointer",padding:4 }}>
            {[22,14,22].map((w,i) => <span key={i} style={{ display:"block",width:w,height:1,background:"#E8E0D0",transition:"all 0.3s" }} />)}
          </button>
        </div>
      </nav>
      <style>{`.hm-tog{display:flex!important}@media(min-width:901px){.hm-tog{display:none!important}}`}</style>

      {/* ═══ HERO ═══ */}
      <section id="home" style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 6%",position:"relative",overflow:"hidden" }}>

        {/* Ambient gradient blobs */}
        <div style={{ position:"absolute",top:"20%",right:"5%",width:"40vw",height:"40vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(201,169,110,0.04) 0%,transparent 70%)",pointerEvents:"none",transform:`translateY(${scrollY*0.12}px)` }} />
        <div style={{ position:"absolute",bottom:"10%",left:"-10%",width:"50vw",height:"50vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(201,169,110,0.03) 0%,transparent 70%)",pointerEvents:"none" }} />

        {/* Giant decorative R */}
        <div style={{
          position:"absolute",right:"-2%",top:"50%",
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(220px,32vw,480px)",
          fontWeight:200,
          color:"transparent",
          WebkitTextStroke:"1px rgba(201,169,110,0.12)",
          lineHeight:1,userSelect:"none",pointerEvents:"none",
          transform:`translateY(calc(-50% + ${parallaxR}px))`,
          transition:"transform 0.1s linear",
          animation:"fadeIn 2s ease 0.5s both",
          letterSpacing:-10,
        }}>R</div>

        {/* Vertical line left */}
        <div style={{ position:"absolute",left:"6%",top:"20%",width:1,height:"60%",background:"linear-gradient(to bottom,transparent,rgba(201,169,110,0.3),transparent)",animation:"fadeIn 2s ease 0.3s both" }} />

        {/* Year badge */}
        <div style={{ position:"absolute",left:"6%",top:"20%",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeIn 1.5s ease 0.8s both" }}>
          <span className="jost" style={{ fontSize:9,letterSpacing:3,color:"rgba(201,169,110,0.6)",textTransform:"uppercase",fontWeight:200,writingMode:"vertical-rl",letterSpacing:6 }}>2020</span>
        </div>

        {/* Main content */}
        <div style={{ maxWidth:800,paddingLeft:"6%",transform:`translateY(${parallaxHero}px)`,transition:"transform 0.1s linear" }}>
          <div style={{ animation:"fadeUp 0.8s ease 0.2s both" }}>
            <span className="label" style={{ display:"flex",alignItems:"center",gap:12,marginBottom:32 }}>
              <span style={{ display:"inline-block",width:32,height:1,background:"#C9A96E" }} />
              {t.hero.eyebrow}
            </span>
          </div>

          <h1 className="hero-title" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(56px,10vw,130px)",fontWeight:200,lineHeight:0.95,letterSpacing:-2,marginBottom:32 }}>
            <span className="line"><span className="hero-word" style={{ animationDelay:"0.3s" }}>{t.hero.line1}</span></span>
            <span className="line"><em className="hero-word" style={{ fontStyle:"italic",color:"#C9A96E",animationDelay:"0.5s" }}>{t.hero.line2}</em></span>
            <span className="line"><span className="hero-word" style={{ animationDelay:"0.7s" }}>{t.hero.line3}</span></span>
          </h1>

          <div style={{ width:60,height:1,background:"linear-gradient(to right,#C9A96E,transparent)",margin:"32px 0",animation:"drawLine 1s ease 1s both" }} />

          <p className="jost" style={{ fontSize:13,fontWeight:200,letterSpacing:1.5,color:"rgba(232,224,208,0.5)",marginBottom:48,maxWidth:420,lineHeight:1.8,animation:"fadeUp 1s ease 1s both" }}>
            {t.hero.sub}
          </p>

          <div style={{ display:"flex",gap:16,flexWrap:"wrap",animation:"fadeUp 1s ease 1.1s both" }}>
            <button className="btn-gold" onClick={() => goto("contact")}>{t.hero.cta1}</button>
            <button className="btn-ghost" onClick={() => goto("menu")}>{t.hero.cta2}</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:10,animation:"fadeIn 1.5s ease 1.5s both" }}>
          <span className="jost muted" style={{ fontSize:8,letterSpacing:5,textTransform:"uppercase",fontWeight:200 }}>{t.hero.scroll}</span>
          <div style={{ width:1,height:48,position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,#C9A96E,transparent)",animation:"lineUp 1.5s ease-in-out infinite" }} />
          </div>
        </div>

        {/* Floating orbs */}
        {[
          { x:"15%",y:"25%",s:4,d:6.2,o:0.4 },
          { x:"82%",y:"40%",s:3,d:8.1,o:0.3 },
          { x:"70%",y:"70%",s:5,d:7.4,o:0.25 },
          { x:"25%",y:"75%",s:3,d:9.0,o:0.35 },
          { x:"55%",y:"15%",s:4,d:5.5,o:0.2 },
        ].map((p,i) => (
          <div key={i} style={{ position:"absolute",left:p.x,top:p.y,width:p.s,height:p.s,borderRadius:"50%",background:"#C9A96E",opacity:p.o,pointerEvents:"none",animation:`float ${p.d}s ease-in-out ${i*0.8}s infinite` }} />
        ))}
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding:"140px 6%",position:"relative" }}>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,#080808 0%,#0D0D0D 50%,#080808 100%)",pointerEvents:"none" }} />

        <div className="ab-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px 100px",alignItems:"center",position:"relative",zIndex:1 }}>
          {/* Left */}
          <div>
            <div {...rl("ab-eyebrow",0)} style={{ marginBottom:24 }}>
              <span className="label">{t.about.label}</span>
            </div>
            <div {...rl("ab-title",0.1)}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,5.5vw,72px)",fontWeight:200,lineHeight:1.05,marginBottom:40,whiteSpace:"pre-line" }}>{t.about.title}</h2>
            </div>
            <div {...rl("ab-body",0.2)} style={{ borderLeft:"1px solid rgba(201,169,110,0.25)",paddingLeft:32 }}>
              <p className="jost" style={{ fontSize:14,fontWeight:200,lineHeight:1.9,color:"rgba(232,224,208,0.65)",marginBottom:16 }}>{t.about.p1}</p>
              <p className="jost" style={{ fontSize:14,fontWeight:200,lineHeight:1.9,color:"rgba(232,224,208,0.65)",marginBottom:16 }}>{t.about.p2}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic",color:"#C9A96E",fontWeight:300 }}>{t.about.p3}</p>
            </div>
          </div>

          {/* Right — stats */}
          <div {...rr("ab-stats",0.15)}>
            <div className="st-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:1 }}>
              {t.about.stats.map((s,i) => (
                <div key={i} style={{
                  padding:"52px 40px",
                  background: [0,3].includes(i) ? "rgba(201,169,110,0.06)" : "rgba(232,224,208,0.02)",
                  borderTop: [0,1].includes(i) ? "1px solid rgba(201,169,110,0.2)" : "1px solid rgba(232,224,208,0.05)",
                  display:"flex",flexDirection:"column",gap:8,
                  transition:"background 0.4s",
                }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,4vw,52px)",fontWeight:200,color: [0,3].includes(i) ? "#C9A96E" : "#E8E0D0",lineHeight:1 }}>
                    <Counter to={s.n} suffix={s.s} dur={1800} />
                  </span>
                  <span className="jost muted" style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase",fontWeight:200 }}>{s.l}</span>
                </div>
              ))}
            </div>

            {/* Best café badge */}
            <div style={{ marginTop:1,padding:"24px 40px",border:"1px solid rgba(201,169,110,0.15)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(201,169,110,0.04)" }}>
              <div>
                <p className="label" style={{ marginBottom:4 }}>2GIS · 2025</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300 }}>Лучшая кофейня Ташкента</p>
              </div>
              <div style={{ display:"flex",gap:2 }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color:"#C9A96E",fontSize:12 }}>★</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div style={{ padding:"0 6%",position:"relative" }}>
        <div style={{ height:1,background:"linear-gradient(to right,transparent,rgba(201,169,110,0.2),transparent)" }} />
      </div>

      {/* ═══ MENU ═══ */}
      <section id="menu" style={{ padding:"140px 6%",position:"relative" }}>
        {/* Bg text */}
        <div style={{ position:"absolute",top:"10%",right:"-2%",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(80px,14vw,180px)",fontWeight:200,color:"transparent",WebkitTextStroke:"1px rgba(232,224,208,0.03)",pointerEvents:"none",userSelect:"none",lineHeight:1 }}>MENU</div>

        <div {...rv("menu-head",0)} style={{ marginBottom:72 }}>
          <span className="label" style={{ display:"block",marginBottom:20 }}>{t.menu.label}</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:200,lineHeight:1,marginBottom:40 }}>{t.menu.title}</h2>
          <div style={{ width:48,height:1,background:"linear-gradient(to right,#C9A96E,transparent)" }} />
        </div>

        {/* Tabs */}
        <div style={{ display:"flex",borderBottom:"1px solid rgba(232,224,208,0.06)",marginBottom:56,overflowX:"auto",paddingBottom:0 }}>
          {t.menu.tabs.map((tab,i) => (
            <button key={i} className={`menu-tab-btn ${menuTab===i?"active":""}`} onClick={() => switchTab(i)}>{tab}</button>
          ))}
        </div>

        {/* Items */}
        <div style={{ opacity:menuTabVis?1:0,transform:menuTabVis?"none":"translateY(16px)",transition:"all 0.3s ease" }}>
          {currentItems.map((item,i) => (
            <div key={i} className="mi-row">
              <div>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,2vw,22px)",fontWeight:400 }}>{item.n}</span>
                {item.tag && <span className="tag">{item.tag}</span>}
                <p className="jost muted" style={{ fontSize:12,fontWeight:200,letterSpacing:1,marginTop:6,lineHeight:1.7 }}>{item.d}</p>
              </div>
              <div style={{ textAlign:"right",flexShrink:0 }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:"#C9A96E" }}>{item.p}</span>
                <span className="jost muted" style={{ fontSize:10,letterSpacing:2,display:"block",marginTop:2,fontWeight:200 }}>UZS</span>
              </div>
            </div>
          ))}
        </div>

        <p className="jost muted" style={{ fontSize:11,letterSpacing:2,marginTop:48,textTransform:"uppercase",fontWeight:200 }}>{t.menu.avg}</p>
      </section>

      {/* ═══ ATMOSPHERE ═══ */}
      <section id="atmosphere" style={{ padding:"140px 6%",background:"#0D0D0D",position:"relative" }}>
        {/* Decorative circle */}
        <div style={{ position:"absolute",right:"-5%",top:"50%",width:"50vw",height:"50vw",borderRadius:"50%",border:"1px solid rgba(201,169,110,0.04)",transform:"translateY(-50%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",right:"5%",top:"50%",width:"35vw",height:"35vw",borderRadius:"50%",border:"1px solid rgba(201,169,110,0.03)",transform:"translateY(-50%)",pointerEvents:"none",animation:"rotateSlow 40s linear infinite" }} />

        <div {...rv("atm-head",0)} style={{ marginBottom:72 }}>
          <span className="label" style={{ display:"block",marginBottom:20 }}>{t.atmosphere.label}</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:200,lineHeight:1,marginBottom:40 }}>{t.atmosphere.title}</h2>
          <div style={{ width:48,height:1,background:"linear-gradient(to right,#C9A96E,transparent)" }} />
        </div>

        <div {...rv("atm-grid",0.1)} className="feat-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1 }}>
          {t.atmosphere.cards.map((c,i) => (
            <div key={i} className="feat-card">
              <span style={{ display:"block",fontSize:28,marginBottom:24,filter:"grayscale(0.3)" }}>{c.icon}</span>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:400,marginBottom:12,color:"#E8E0D0" }}>{c.t}</h3>
              <p className="jost muted" style={{ fontSize:13,fontWeight:200,lineHeight:1.8 }}>{c.d}</p>
            </div>
          ))}
        </div>

        {/* Quote band */}
        <div {...rv("atm-quote",0.2)} style={{ marginTop:100,padding:"60px 0",borderTop:"1px solid rgba(232,224,208,0.06)",borderBottom:"1px solid rgba(232,224,208,0.06)",textAlign:"center",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at center,rgba(201,169,110,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
          <blockquote style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(28px,5vw,56px)",fontWeight:200,fontStyle:"italic",color:"#C9A96E",lineHeight:1.2,letterSpacing:2 }}>
            «{t.atmosphere.quote}»
          </blockquote>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section id="reviews" style={{ padding:"140px 6%",position:"relative" }}>
        <div {...rv("rev-head",0)} style={{ marginBottom:80 }}>
          <span className="label" style={{ display:"block",marginBottom:20 }}>{t.reviews.label}</span>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:20 }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:200,lineHeight:1 }}>{t.reviews.title}</h2>
            <div style={{ display:"flex",gap:8 }}>
              {[revPrev,revNext].map((fn,i) => (
                <button key={i} onClick={fn} style={{
                  width:52,height:52,
                  background:"none",
                  border:"1px solid rgba(232,224,208,0.15)",
                  color:"#E8E0D0",cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:18,transition:"all 0.4s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#C9A96E"; e.currentTarget.style.color="#C9A96E"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(232,224,208,0.15)"; e.currentTarget.style.color="#E8E0D0"; }}
                >{i===0?"←":"→"}</button>
              ))}
            </div>
          </div>
          <div style={{ width:48,height:1,background:"linear-gradient(to right,#C9A96E,transparent)",marginTop:32 }} />
        </div>

        {/* Featured review */}
        <div key={revIdx} className="rev-card" style={{ marginBottom:24 }}>
          <div style={{ display:"flex",gap:3,marginBottom:28 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color:"#C9A96E",fontSize:14 }}>★</span>)}
          </div>
          <blockquote style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:300,lineHeight:1.65,color:"rgba(232,224,208,0.9)",marginBottom:40,maxWidth:800 }}>
            {t.reviews.items[revIdx].text}
          </blockquote>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <div style={{ width:44,height:44,borderRadius:"50%",background:"rgba(201,169,110,0.15)",border:"1px solid rgba(201,169,110,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"#C9A96E",flexShrink:0 }}>
              {t.reviews.items[revIdx].name[0]}
            </div>
            <div>
              <p className="jost" style={{ fontSize:13,fontWeight:300,letterSpacing:1,color:"#E8E0D0" }}>{t.reviews.items[revIdx].name}</p>
              <p className="jost muted" style={{ fontSize:11,letterSpacing:2,fontWeight:200,marginTop:2 }}>{t.reviews.items[revIdx].city}</p>
            </div>
          </div>
        </div>

        {/* Mini cards row */}
        <div style={{ display:"grid",gridTemplateColumns:`repeat(${Math.min(t.reviews.items.length,3)},1fr)`,gap:1,marginBottom:40,opacity:0.4 }}>
          {t.reviews.items.slice(0,3).map((r,i) => (
            <div key={i} onClick={() => setRevIdx(i)} style={{ padding:"20px 24px",border:"1px solid rgba(232,224,208,0.06)",cursor:"pointer",transition:"all 0.3s",background: revIdx===i ? "rgba(201,169,110,0.06)" : "transparent",opacity: revIdx===i ? 1 : 0.5 }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity = revIdx===i ? "1" : "0.5"}
            >
              <p className="jost" style={{ fontSize:11,letterSpacing:1,fontWeight:300,color:"#E8E0D0",marginBottom:4 }}>{r.name}</p>
              <p className="jost muted" style={{ fontSize:10,fontWeight:200,letterSpacing:1 }}>{r.city}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display:"flex",gap:10,justifyContent:"center" }}>
          {t.reviews.items.map((_,i) => (
            <button key={i} className={`dot-btn ${revIdx===i?"on":""}`} onClick={() => setRevIdx(i)} />
          ))}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding:"140px 6%",background:"#0D0D0D",position:"relative" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 50%,rgba(201,169,110,0.03) 0%,transparent 60%)",pointerEvents:"none" }} />

        <div {...rv("cont-head",0)} style={{ marginBottom:72 }}>
          <span className="label" style={{ display:"block",marginBottom:20 }}>{t.contact.label}</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:200,lineHeight:1,marginBottom:40 }}>{t.contact.title}</h2>
          <div style={{ width:48,height:1,background:"linear-gradient(to right,#C9A96E,transparent)" }} />
        </div>

        <div className="contact-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,marginBottom:80 }}>
          {[
            { name:t.contact.b1n, addr:t.contact.b1a },
            { name:t.contact.b2n, addr:t.contact.b2a },
          ].map((b,i) => (
            <div key={i} {...rv(`br${i}`,i*0.15)} className="contact-card">
              <span className="label" style={{ display:"block",marginBottom:20 }}>{b.name}</span>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:300,marginBottom:32,color:"#E8E0D0" }}>{b.addr}</p>
              <div style={{ width:32,height:1,background:"rgba(201,169,110,0.4)",margin:"28px 0" }} />
              <p className="jost muted" style={{ fontSize:12,letterSpacing:2,fontWeight:200,marginBottom:6 }}>{t.contact.hours}</p>
              <p className="jost" style={{ fontSize:16,letterSpacing:1,fontWeight:200,color:"#C9A96E" }}>{t.contact.phone}</p>
            </div>
          ))}
        </div>

        <div {...rv("cont-btns",0.3)} style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
          <a href={`tel:${t.contact.phone.replace(/\s/g,"")}`} className="btn-gold">{t.contact.cta1}</a>
          <a href="https://broniboy.ru/tashkent/restaurants/p_Rodena/" target="_blank" rel="noopener noreferrer" className="btn-ghost">{t.contact.cta2}</a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding:"48px 6%",borderTop:"1px solid rgba(232,224,208,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20 }}>
        <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300,letterSpacing:8,textTransform:"uppercase",color:"#E8E0D0" }}>RODENA</span>
          <span className="jost muted" style={{ fontSize:9,letterSpacing:3,textTransform:"uppercase",fontWeight:200 }}>{t.footer.tagline}</span>
        </div>
        <div style={{ display:"flex",gap:24,alignItems:"center",flexWrap:"wrap" }}>
          {t.nav.slice(1).map((n,i) => (
            <button key={i} className="nav-link-item" style={{ fontSize:9,letterSpacing:2 }} onClick={() => goto(t.navIds[i+1])}>{n}</button>
          ))}
        </div>
        <span className="jost muted" style={{ fontSize:10,letterSpacing:1,fontWeight:200 }}>{t.footer.copy}</span>
      </footer>



    </div>
  );
}