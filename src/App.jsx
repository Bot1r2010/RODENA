import { useState, useEffect, useRef, } from "react";

/* ══════════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════════ */
const L = {
  ru: {
    nav:["Главная","О нас","Меню","Атмосфера","Галерея","Отзывы","Контакты"],
    ids:["home","about","menu","atm","gallery","reviews","contact"],
    hero:{
      eye:"Ташкент · 2 филиала · с 2020 года",
      l1:"Место, где встречается",
      l2:"вкус и уют",
      sub:"Кофейня нового поколения в сердце Ташкента",
      cta1:"Забронировать стол",cta2:"Смотреть меню",scroll:"прокрутите",
    },
    about:{
      lbl:"Наша история",title:"Больше,\nчем кофейня",
      p1:"Rodena — это пространство, где каждая деталь продумана до совершенства. Мы объединили европейскую кухню, азиатские акценты и душу Ташкента в одном месте.",
      p2:"Живая музыка каждый вечер, свободный Wi-Fi, уютные зоны для работы и тихих бесед — атмосфера, созданная для людей.",
      p3:"Каждое блюдо — история. Каждая чашка — ритуал.",
      stats:[{n:2,s:"+",l:"Филиала"},{n:5,s:"",l:"Лет с вами"},{n:40,s:"+",l:"Мест"},{n:2025,s:"",l:"Лучшая кофейня"}],
      badge:"Лучшая кофейня Ташкента · 2GIS 2025",
    },
    menu:{
      lbl:"Гастрономия",title:"Меню",
      tabs:["Завтраки","Основные блюда","Десерты","Напитки"],
      keys:["b","m","d","r"],
      avg:"Средний чек · 150 000 — 200 000 сум",
    },
    atm:{
      lbl:"Пространство",title:"Атмосфера",quote:"Вкус. Уют. Атмосфера.",
      cards:[
        {ico:"♪",t:"Живая музыка",d:"Каждый вечер — джаз, bossa nova, акустика создают особое настроение"},
        {ico:"⌨",t:"Работа и встречи",d:"Бесплатный Wi-Fi · розетки на каждом столике · тихие зоны"},
        {ico:"☕",t:"Авторский кофе",d:"Зёрна из Эфиопии, Колумбии, Грузии · 8 методов заваривания"},
        {ico:"🌿",t:"Для всей семьи",d:"Детское меню · уютное пространство · дружелюбная атмосфера"},
        {ico:"✦",t:"События",d:"Арт-вечера · джаз-сессии · бизнес-завтраки · приватные встречи"},
      ],
    },
    gal:{lbl:"Фотогалерея",title:"Галерея",sub:"Атмосфера Rodena в деталях"},
    rev:{
      lbl:"Гости о нас",title:"Отзывы",
      items:[
        {name:"Алина М.",city:"Ташкент",text:"Лучшее место для утреннего кофе в городе. Атмосфера невероятная — уходить не хочется. Латте здесь просто волшебный!"},
        {name:"Дилшод Р.",city:"Ташкент",text:"Наконец-то нашёл место, где понимают настоящий матча. Тирамису — лучший в городе, проверял лично. Интерьер стильный и уютный."},
        {name:"Sarah K.",city:"Dubai",text:"A true hidden gem in Tashkent. Exceptional coffee, beautiful atmosphere and staff who genuinely care. I came back three times in one week."},
        {name:"Камола Ю.",city:"Ташкент",text:"Живая музыка по вечерам — это что-то особенное. Ризотто с трюфелем превзошло все ожидания. Обязательно вернёмся!"},
        {name:"Bobur T.",city:"Toshkent",text:"Eng zo'r kofe uyi! Muhit, xizmat, taom — hammasi beshta. Har hafta kelamiz, hech qachon hayal qilmaymiz."},
        {name:"Михаил С.",city:"Москва",text:"Был в командировке неделю. Rodena стала моим ежедневным ритуалом. Стейк на уровне лучших московских ресторанов!"},
      ],
    },
    con:{
      lbl:"Найдите нас",title:"Контакты",
      b1n:"Яшнабадский район",b1a:"ул. Авиасозлар, 65",
      b2n:"Мирзо-Улугбекский район",b2a:"ул. Паркент, 199",
      hours:"Ежедневно · 08:00 — 23:00",phone:"+998 95 475-88-55",
      cta1:"Позвонить",cta2:"Заказать доставку",
    },
    foot:{copy:"© 2025 Rodena Coffee & Bakery",tag:"Вкус. Уют. Атмосфера."},
    theme:["Тёмная","Светлая"],
  },
  en:{
    nav:["Home","About","Menu","Atmosphere","Gallery","Reviews","Contact"],
    ids:["home","about","menu","atm","gallery","reviews","contact"],
    hero:{
      eye:"Tashkent · 2 Locations · since 2020",
      l1:"Where flavor meets",
      l2:"comfort",
      sub:"A next-generation café in the heart of Tashkent",
      cta1:"Reserve a Table",cta2:"View Menu",scroll:"scroll",
    },
    about:{
      lbl:"Our Story",title:"More than\na café",
      p1:"Rodena is a space where every detail has been crafted to perfection. We've brought together European cuisine, Asian accents, and the soul of Tashkent.",
      p2:"Live music every evening, free Wi-Fi, cozy work zones and quiet corners — an atmosphere created for people.",
      p3:"Every dish is a story. Every cup is a ritual.",
      stats:[{n:2,s:"+",l:"Locations"},{n:5,s:"",l:"Years with you"},{n:40,s:"+",l:"Seats"},{n:2025,s:"",l:"Best Café"}],
      badge:"Best Café in Tashkent · 2GIS 2025",
    },
    menu:{
      lbl:"Gastronomy",title:"Menu",
      tabs:["Breakfast","Main Dishes","Desserts","Drinks"],
      keys:["b","m","d","r"],
      avg:"Average check · 150 000 – 200 000 UZS",
    },
    atm:{
      lbl:"Our Space",title:"Atmosphere",quote:"Taste. Comfort. Atmosphere.",
      cards:[
        {ico:"♪",t:"Live Music",d:"Every evening — jazz, bossa nova, acoustic sets create a special mood"},
        {ico:"⌨",t:"Work & Meet",d:"Free Wi-Fi · power outlets at every table · quiet zones"},
        {ico:"☕",t:"Artisan Coffee",d:"Beans from Ethiopia, Colombia, Georgia · 8 brewing methods"},
        {ico:"🌿",t:"Family Friendly",d:"Kids menu · welcoming space · warm and relaxed atmosphere"},
        {ico:"✦",t:"Events",d:"Art evenings · jazz sessions · business breakfasts · private gatherings"},
      ],
    },
    gal:{lbl:"Photo Gallery",title:"Gallery",sub:"The atmosphere of Rodena in detail"},
    rev:{
      lbl:"Our Guests",title:"Reviews",
      items:[
        {name:"Alina M.",city:"Tashkent",text:"The best place for morning coffee in the city. The atmosphere is incredible — you just don't want to leave. The latte is pure magic!"},
        {name:"Dilshod R.",city:"Tashkent",text:"Finally a café that truly understands matcha. The tiramisu is the best in town — tested personally. Stylish and cosy interior."},
        {name:"Sarah K.",city:"Dubai",text:"A true hidden gem in Tashkent. Exceptional coffee, beautiful atmosphere and staff who genuinely care. I came back three times in one week."},
        {name:"Kamola Y.",city:"Tashkent",text:"Live music in the evenings is something special. The truffle risotto exceeded all expectations. We will definitely be back!"},
        {name:"Bobur T.",city:"Toshkent",text:"The best café! Atmosphere, service, food — everything is five stars. We come every week without fail."},
        {name:"Mikhail S.",city:"Moscow",text:"Rodena became my daily ritual for the whole trip. The steak is on par with the best Moscow restaurants. Highly recommend!"},
      ],
    },
    con:{
      lbl:"Find Us",title:"Contact",
      b1n:"Yashnabad District",b1a:"Aviasozlar St., 65",
      b2n:"Mirzo Ulugbek District",b2a:"Parkent St., 199",
      hours:"Daily · 08:00 — 23:00",phone:"+998 95 475-88-55",
      cta1:"Call Us",cta2:"Order Delivery",
    },
    foot:{copy:"© 2025 Rodena Coffee & Bakery",tag:"Taste. Comfort. Atmosphere."},
    theme:["Dark","Light"],
  },
  uz:{
    nav:["Bosh sahifa","Biz haqimizda","Menyu","Muhit","Galereya","Sharhlar","Kontakt"],
    ids:["home","about","menu","atm","gallery","reviews","contact"],
    hero:{
      eye:"Toshkent · 2 Filial · 2020 yildan",
      l1:"Ta'm va qulaylik",
      l2:"makoni",
      sub:"Toshkent qalbidagi yangi avlod kofe uyi",
      cta1:"Stol band qilish",cta2:"Menyuni ko'rish",scroll:"aylantiring",
    },
    about:{
      lbl:"Bizning tarix",title:"Kofe uyidan\nko'proq",
      p1:"Rodena — har bir tafsilot mukammal o'ylangan makon. Biz Yevropa oshxonasi, Osiyo ta'mlari va Toshkent ruhini bir joyda birlashtirdik.",
      p2:"Har kech jonli musiqa, bepul Wi-Fi, ish va tinch suhbat uchun qulay zonalar — odamlar uchun yaratilgan muhit.",
      p3:"Har bir taom — hikoya. Har bir finjon — marosim.",
      stats:[{n:2,s:"+",l:"Filial"},{n:5,s:"",l:"Yildan beri"},{n:40,s:"+",l:"O'rindiq"},{n:2025,s:"",l:"Eng yaxshi kofe uyi"}],
      badge:"Toshkentning eng yaxshi kofe uyi · 2GIS 2025",
    },
    menu:{
      lbl:"Gastonomiya",title:"Menyu",
      tabs:["Nonushta","Asosiy taomlar","Desertlar","Ichimliklar"],
      keys:["b","m","d","r"],
      avg:"O'rtacha hisob · 150 000 — 200 000 so'm",
    },
    atm:{
      lbl:"Bizning makon",title:"Muhit",quote:"Ta'm. Qulaylik. Muhit.",
      cards:[
        {ico:"♪",t:"Jonli musiqa",d:"Har kech — jazz, bossa nova, akustika chiqishlari o'ziga xos kayfiyat yaratadi"},
        {ico:"⌨",t:"Ish va uchrashuvlar",d:"Bepul Wi-Fi · har bir stolda rozetka · sokin zonalar"},
        {ico:"☕",t:"Muallif qahva",d:"Efiopiya, Kolumbiya, Gruziya donalari · 8 pishirish usuli"},
        {ico:"🌿",t:"Butun oila uchun",d:"Bolalar menyusi · qulay makon · iliq va do'stona muhit"},
        {ico:"✦",t:"Tadbirlar",d:"San'at kechalari · jazz · biznes nonushtalari · xususiy uchrashuvlar"},
      ],
    },
    gal:{lbl:"Foto galereya",title:"Galereya",sub:"Rodena muhiti tafsilotlarda"},
    rev:{
      lbl:"Mehmonlarimiz",title:"Sharhlar",
      items:[
        {name:"Alina M.",city:"Toshkent",text:"Shahardagi ertalabki qahva uchun eng yaxshi joy. Muhit ajoyib — ketgisi kelmaydi. Latte sehrli!"},
        {name:"Dilshod R.",city:"Toshkent",text:"Nihoyat haqiqiy matchani tushunadigan joy topdim. Tiramisu shahardagi eng yaxshisi — shaxsan tekshirdim."},
        {name:"Sarah K.",city:"Dubai",text:"A true hidden gem in Tashkent. Exceptional coffee, beautiful atmosphere and staff who genuinely care. I came back three times in one week."},
        {name:"Kamola Yu.",city:"Toshkent",text:"Kechki jonli musiqa — bu alohida bir narsa. Trufel rizotto barcha kutganlarni ortda qoldirdi. Albatta qaytamiz!"},
        {name:"Bobur T.",city:"Toshkent",text:"Juda zo'r joy! Kofe mazali, muhit ajoyib. Har hafta kelamiz. Barcha do'stlarimga tavsiya qilamiz!"},
        {name:"Mixail S.",city:"Moskva",text:"Toshkentda ish safari paytida Rodena sevimli joyimga aylandi. Steyk va pasta darajasi zo'r!"},
      ],
    },
    con:{
      lbl:"Bizni toping",title:"Kontaktlar",
      b1n:"Yashnobod tumani",b1a:"Aviasozlar ko'chasi, 65",
      b2n:"Mirzo Ulug'bek tumani",b2a:"Parkent ko'chasi, 199",
      hours:"Har kuni · 08:00 — 23:00",phone:"+998 95 475-88-55",
      cta1:"Qo'ng'iroq qilish",cta2:"Yetkazib berish",
    },
    foot:{copy:"© 2025 Rodena Coffee & Bakery",tag:"Ta'm. Qulaylik. Muhit."},
    theme:["Qorong'u","Yorug'"],
  },
};

const MENU = {
  b:[
    {n:"Бельгийские вафли",en:"Belgian Waffles",d:"Лесные ягоды · свежий крем · кленовый сироп",p:"45 000",tag:"Хит",img:"https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80"},
    {n:"Блины с лососем",en:"Blini with Salmon",d:"Копчёный лосось · сливочный сыр · каперсы · микрозелень",p:"55 000",img:"https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=400&q=80"},
    {n:"Яйцо пашот с авокадо",en:"Avocado & Poached Egg",d:"Тост бриошь · авокадо · яйцо пашот · трюфельное масло",p:"42 000",img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80"},
    {n:"Гранола с йогуртом",en:"Granola Bowl",d:"Домашняя гранола · греческий йогурт · ягоды · мёд",p:"38 000",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80"},
  ],
  m:[
    {n:"Паста Карбонара",en:"Pasta Carbonara",d:"Свежая паста · гуанчале · пармезан · желток · чёрный перец",p:"68 000",tag:"Chef",img:"https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80"},
    {n:"Рибай-стейк",en:"Ribeye Steak",d:"Мраморная говядина · соус берблан · сезонные овощи",p:"120 000",img:"https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&q=80"},
    {n:"Том-ям",en:"Tom Yum Soup",d:"Кокосовое молоко · лемонграсс · тигровые креветки · лайм",p:"72 000",img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80"},
    {n:"Вок-лапша",en:"Wok Noodles",d:"Рисовая лапша · бок-чой · устричный соус · кунжут",p:"58 000",img:"https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80"},
    {n:"Ризотто с трюфелем",en:"Truffle Risotto",d:"Арборио · трюфельный крем · пармезан · руккола",p:"85 000",tag:"New",img:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80"},
  ],
  d:[
    {n:"Тирамису Rodena",en:"Rodena Tiramisu",d:"Маскарпоне · савоярди · эспрессо · амаретто",p:"38 000",tag:"Хит",img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80"},
    {n:"Чизкейк Нью-Йорк",en:"NY Cheesecake",d:"Сливочный крем · ягодный конфитюр · песочная основа",p:"42 000",img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80"},
    {n:"Шоколадный фондан",en:"Chocolate Fondant",d:"Горький шоколад 70% · ванильное мороженое · малиновый соус",p:"45 000",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80"},
    {n:"Панна котта",en:"Panna Cotta",d:"Ваниль · клубничный кули · хрустящий туиль",p:"36 000",img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80"},
  ],
  r:[
    {n:"Латте Rodena",en:"Signature Latte",d:"Двойной эспрессо · карамельный сироп · вспененное молоко",p:"28 000",tag:"Хит",img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80"},
    {n:"Матча латте",en:"Matcha Latte",d:"Японский матча первого сбора · кокосовое молоко · агава",p:"32 000",img:"https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80"},
    {n:"Лимонад Rodena",en:"Rodena Lemonade",d:"Свежий лимон · имбирь · мята · газированная вода",p:"25 000",img:"https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80"},
    {n:"Горячий шоколад",en:"Hot Chocolate",d:"Бельгийский шоколад 62% · ваниль · взбитые сливки",p:"30 000",img:"https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80"},
    {n:"Глинтвейн",en:"Mulled Wine",d:"Красное вино · пряности · апельсин · корица",p:"35 000",img:"https://images.unsplash.com/photo-1543756780-4f36e6ccecbb?w=400&q=80"},
  ],
};

const GALLERY = [
  {url:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85",cap:"Интерьер"},
  {url:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=85",cap:"Кофе"},
  {url:"https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=85",cap:"Десерты"},
  {url:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85",cap:"Латте арт"},
  {url:"https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&q=85",cap:"Завтрак"},
  {url:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",cap:"Вечер"},
  {url:"https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=85",cap:"Атмосфера"},
  {url:"https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=85",cap:"Блюда"},
];

/* ══════ COUNTER ══════ */
function Counter({ to, suffix="", dur=1900 }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || fired.current) return;
      fired.current = true;
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        setV(Math.round((1 - Math.pow(1 - p, 4)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to, dur]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ══════ CUSTOM CURSOR ══════ */
function Cursor({ acc }) {
  const dot = useRef(null);
  const ring = useRef(null);
  const m = useRef({ x:0, y:0 });
  const r = useRef({ x:0, y:0 });
  const hov = useRef(false);
  useEffect(() => {
    const mv = e => { m.current = { x: e.clientX, y: e.clientY }; };
    const over = e => {
      const tag = e.target.tagName;
      hov.current = ["BUTTON","A","INPUT"].includes(tag) || e.target.closest("button,a,[data-hover]");
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    let raf;
    const loop = () => {
      r.current.x += (m.current.x - r.current.x) * 0.11;
      r.current.y += (m.current.y - r.current.y) * 0.11;
      if (dot.current) {
        dot.current.style.transform = `translate(${m.current.x-4}px,${m.current.y-4}px)`;
        dot.current.style.transform += hov.current ? " scale(2)" : "";
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${r.current.x-24}px,${r.current.y-24}px)`;
        ring.current.style.width = hov.current ? "56px" : "48px";
        ring.current.style.height = hov.current ? "56px" : "48px";
        ring.current.style.marginTop = hov.current ? "-4px" : "0";
        ring.current.style.marginLeft = hov.current ? "-4px" : "0";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={dot} style={{ position:"fixed",top:0,left:0,width:8,height:8,borderRadius:"50%",background:acc,pointerEvents:"none",zIndex:9999,mixBlendMode:"difference",transition:"transform .1s" }} />
      <div ref={ring} style={{ position:"fixed",top:0,left:0,width:48,height:48,borderRadius:"50%",border:`1.5px solid ${acc}`,opacity:.5,pointerEvents:"none",zIndex:9998,transition:"width .3s,height .3s,opacity .3s" }} />
    </>
  );
}

/* ══════ PARALLAX IMAGE ══════ */
function ParallaxImg({ src, alt, strength=0.12, style={}, imgStyle={} }) {
  const ref = useRef(null);
  const [off, setOff] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOff(center * strength);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [strength]);
  return (
    <div ref={ref} style={{ overflow:"hidden", ...style }}>
      <img src={src} alt={alt} loading="lazy" style={{ width:"100%", height:"120%", objectFit:"cover", transform:`translateY(${off}px)`, transition:"transform .05s linear", display:"block", ...imgStyle }} />
    </div>
  );
}

/* ══════ REVEAL HOOK ══════ */
function useReveal() {
  const [vis, setVis] = useState({});
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting && e.target.dataset.rid) setVis(v => ({...v,[e.target.dataset.rid]:true})); }),
      { threshold: 0.08 }
    );
    setTimeout(() => document.querySelectorAll("[data-rid]").forEach(el => io.observe(el)), 100);
    return () => io.disconnect();
  }, []);
  return vis;
}

/* ══════ THEME TOGGLE ══════ */
function ThemeToggle({ dark, toggle, label }) {
  return (
    <button onClick={toggle} data-hover="1" title={label} style={{
      width:50,height:28,borderRadius:14,border:"none",cursor:"pointer",
      position:"relative",background:dark?"#C9A96E":"rgba(139,105,20,0.2)",
      transition:"background .4s",flexShrink:0,
    }}>
      <span style={{
        position:"absolute",top:4,left:dark?26:4,
        width:20,height:20,borderRadius:"50%",
        background:dark?"#1a1208":"#C9A96E",
        transition:"left .38s cubic-bezier(0.34,1.56,0.64,1),background .3s",
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,
      }}>
        {dark?"☽":"☀"}
      </span>
    </button>
  );
}

/* ══════ MENU CARD ══════ */
function MenuCard({ item, C }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-hover="1"
      style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",
        gap:16,padding:"22px 0",borderBottom:`1px solid ${C.border}`,
        transition:"padding-left .35s cubic-bezier(0.23,1,0.32,1),background .3s",
        paddingLeft: hov ? 12 : 0,
        position:"relative",cursor:"default",
      }}
    >
      {/* shimmer line */}
      <div style={{ position:"absolute",bottom:0,left:0,height:1,width:hov?"100%":"0",background:`linear-gradient(to right,${C.acc},transparent)`,transition:"width .5s cubic-bezier(0.23,1,0.32,1)" }} />

      <div style={{ display:"flex",gap:16,alignItems:"center",flex:1,minWidth:0 }}>
        {/* dish thumbnail */}
        <div style={{ width:60,height:60,borderRadius:4,overflow:"hidden",flexShrink:0,
          boxShadow: hov ? `0 8px 24px rgba(0,0,0,0.3)` : "none",
          transform: hov ? "scale(1.06)" : "scale(1)",
          transition:"transform .4s cubic-bezier(0.23,1,0.32,1),box-shadow .4s",
        }}>
          <img src={item.img} alt={item.n} loading="lazy" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
        </div>
        <div style={{ minWidth:0 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap" }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,1.8vw,20px)",fontWeight:400,color:C.fg,transition:"color .5s",whiteSpace:"nowrap" }}>{item.n}</span>
            {item.tag && <span style={{ fontFamily:"'Jost',sans-serif",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:C.acc,border:`1px solid ${C.acc3}`,padding:"2px 7px",fontWeight:300,flexShrink:0 }}>{item.tag}</span>}
          </div>
          <p style={{ fontFamily:"'Jost',sans-serif",fontSize:12,fontWeight:200,letterSpacing:.7,marginTop:4,lineHeight:1.6,color:C.fg2,transition:"color .5s" }}>{item.d}</p>
        </div>
      </div>
      <div style={{ textAlign:"right",flexShrink:0 }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:hov?C.acc:C.fg,transition:"color .3s" }}>{item.p}</span>
        <span style={{ fontFamily:"'Jost',sans-serif",fontSize:9,letterSpacing:2,display:"block",marginTop:2,fontWeight:200,color:C.fg2,transition:"color .5s" }}>UZS</span>
      </div>
    </div>
  );
}

/* ══════ MAIN ══════ */
export default function Rodena() {
  const [lang, setLang]     = useState("ru");
  const [dark, setDark]     = useState(true);
  const [tab, setTab]       = useState(0);
  const [tabVis, setTabVis] = useState(true);
  const [scrollY, setSY]    = useState(0);
  const [mnav, setMnav]     = useState(false);
  const [revIdx, setRevIdx] = useState(0);
  const [lightbox, setLB]   = useState(null);
  const vis = useReveal();
  const t = L[lang];

  const C = dark ? {
    bg:"#070707",bg2:"#0E0E0E",bg3:"#131313",
    fg:"#EDE5D5",fg2:"rgba(237,229,213,0.44)",fg3:"rgba(237,229,213,0.06)",
    acc:"#C9A96E",acc2:"rgba(201,169,110,0.10)",acc3:"rgba(201,169,110,0.28)",
    border:"rgba(237,229,213,0.08)",borderH:"rgba(237,229,213,0.18)",
    navBg:"rgba(7,7,7,0.94)",
    heroOvl:"rgba(7,7,7,0.52)",
    shadow:"0 32px 80px rgba(0,0,0,0.6)",
  } : {
    bg:"#FDFAF5",bg2:"#F5F0E8",bg3:"#EDE8DE",
    fg:"#1C1508",fg2:"rgba(28,21,8,0.50)",fg3:"rgba(28,21,8,0.06)",
    acc:"#8B6914",acc2:"rgba(139,105,20,0.09)",acc3:"rgba(139,105,20,0.24)",
    border:"rgba(28,21,8,0.09)",borderH:"rgba(28,21,8,0.20)",
    navBg:"rgba(253,250,245,0.94)",
    heroOvl:"rgba(28,21,8,0.38)",
    shadow:"0 32px 80px rgba(139,105,20,0.12)",
  };

  useEffect(() => {
    const fn = () => setSY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRevIdx(i => (i+1) % t.rev.items.length), 5500);
    return () => clearInterval(id);
  }, [t.rev.items.length]);

  useEffect(() => {
    const fn = e => { if (e.key === "Escape") setLB(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const goto = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMnav(false); };
  const changeLang = l => { setLang(l); setTab(0); setTabVis(true); };
  const changeTab  = i => { setTabVis(false); setTimeout(() => { setTab(i); setTabVis(true); }, 230); };

  const R = (id, delay=0, dir="up") => ({
    "data-rid": id,
    style:{
      opacity: vis[id]?1:0,
      transform: vis[id]?"none": dir==="left"?"translateX(-48px)":dir==="right"?"translateX(48px)":"translateY(36px)",
      transition:`opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    },
  });

  const navScrolled = scrollY > 60;
  // const heroParallax = scrollY * 0.3;

  return (
    <div style={{ background:C.bg,color:C.fg,fontFamily:"'Cormorant Garamond',Georgia,serif",overflowX:"hidden",transition:"background .6s,color .6s",minHeight:"100vh" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{-webkit-font-smoothing:antialiased;cursor:none}
        button,a{cursor:none}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-thumb{background:#C9A96E;border-radius:1px}
        .jost{font-family:'Jost',sans-serif}

        @keyframes hw{from{opacity:0;transform:translateY(110%)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatOrb{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes scrollPulse{0%{transform:scaleY(0);transform-origin:top;opacity:1}49%{transform:scaleY(1);transform-origin:top}50%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom;opacity:0}}
        @keyframes spin60{from{transform:translateY(-50%) rotate(0)}to{transform:translateY(-50%) rotate(360deg)}}
        @keyframes galHov{from{transform:scale(1)}to{transform:scale(1.06)}}
        @keyframes revCard{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ping{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.8);opacity:0}}
        @keyframes bgKen{0%{transform:scale(1) translateY(0)}100%{transform:scale(1.08) translateY(-3%)}}

        .hline{display:block;overflow:hidden;padding-bottom:.06em}
        .hw{display:inline-block;animation:hw 1.15s cubic-bezier(0.16,1,0.3,1) both;will-change:transform}

        .nl{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:200;background:none;border:none;cursor:none;padding:4px 0;position:relative;transition:color .3s;text-decoration:none;white-space:nowrap}
        .nl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;transition:width .4s cubic-bezier(0.23,1,0.32,1)}
        .nl:hover::after{width:100%}

        .lb{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;font-weight:200;background:none;border:none;cursor:none;padding:4px 8px;transition:color .3s}

        .mtab{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:300;background:none;border:none;cursor:none;padding:12px 0;margin-right:32px;position:relative;white-space:nowrap;transition:color .35s}
        .mtab::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;transition:width .4s cubic-bezier(0.23,1,0.32,1)}
        .mtab.on::after{width:100%}

        .gal-item{position:relative;overflow:hidden;cursor:none}
        .gal-item img{transition:transform .7s cubic-bezier(0.23,1,0.32,1),filter .7s}
        .gal-item:hover img{transform:scale(1.08)}
        .gal-item .gal-cap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:20px;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%);opacity:0;transition:opacity .4s}
        .gal-item:hover .gal-cap{opacity:1}

        .fcard{padding:40px 32px;position:relative;overflow:hidden;transition:transform .5s cubic-bezier(0.23,1,0.32,1),box-shadow .5s,background .4s,border-color .4s;cursor:default}
        .fcard:hover{transform:translateY(-7px)}

        .dot{width:6px;height:6px;border-radius:50%;border:none;cursor:none;padding:0;position:relative;transition:all .35s}

        .ccard{position:relative;overflow:hidden;transition:all .4s}
        .ccard::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;transform:scaleX(0);transition:transform .7s cubic-bezier(0.16,1,0.3,1);transform-origin:left}
        .ccard:hover::after{transform:scaleX(1)}

        .mnav{position:fixed;inset:0;z-index:500;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:40px;transform:translateX(100%);transition:transform .65s cubic-bezier(0.16,1,0.3,1)}
        .mnav.op{transform:translateX(0)}

        @media(max-width:900px){
          .nd{display:none!important}
          .mbt{display:flex!important}
          .ab-grid{grid-template-columns:1fr!important}
          .st-grid{grid-template-columns:1fr 1fr!important}
          .fc-grid{grid-template-columns:1fr 1fr!important}
          .cn-grid{grid-template-columns:1fr!important}
          .gal-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:560px){
          .fc-grid{grid-template-columns:1fr!important}
          .gal-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      <Cursor acc={C.acc} />

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div onClick={() => setLB(null)} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
          <button onClick={() => setLB(null)} style={{ position:"absolute",top:24,right:32,background:"none",border:"none",color:"#fff",fontSize:32,cursor:"none" }}>✕</button>
          <button onClick={e => { e.stopPropagation(); setLB(i => (i-1+GALLERY.length)%GALLERY.length); }} style={{ position:"absolute",left:24,background:"none",border:`1px solid rgba(255,255,255,0.2)`,color:"#fff",fontSize:24,width:52,height:52,cursor:"none",display:"flex",alignItems:"center",justifyContent:"center" }}>←</button>
          <img src={GALLERY[lightbox].url.replace("w=800","w=1400")} alt={GALLERY[lightbox].cap} style={{ maxWidth:"85vw",maxHeight:"85vh",objectFit:"contain",animation:"fadeIn .3s ease" }} />
          <button onClick={e => { e.stopPropagation(); setLB(i => (i+1)%GALLERY.length); }} style={{ position:"absolute",right:24,background:"none",border:`1px solid rgba(255,255,255,0.2)`,color:"#fff",fontSize:24,width:52,height:52,cursor:"none",display:"flex",alignItems:"center",justifyContent:"center" }}>→</button>
          <span style={{ position:"absolute",bottom:24,fontFamily:"'Jost',sans-serif",fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,0.5)",fontWeight:200 }}>{GALLERY[lightbox].cap} · {lightbox+1} / {GALLERY.length}</span>
        </div>
      )}

      {/* ── MOBILE NAV ── */}
      <div className={`mnav ${mnav?"op":""}`} style={{ background:dark?"rgba(7,7,7,0.97)":"rgba(253,250,245,0.97)",backdropFilter:"blur(24px)" }}>
        <button onClick={() => setMnav(false)} style={{ position:"absolute",top:28,right:28,background:"none",border:"none",color:C.fg,fontSize:26,cursor:"none",lineHeight:1 }}>✕</button>
        {t.nav.map((n,i) => (
          <button key={i} className="nl" style={{ fontSize:18,letterSpacing:7,color:C.fg }} onClick={() => goto(t.ids[i])}>
            <em style={{ color:C.acc,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontSize:14,marginRight:12 }}>0{i+1}</em>{n}
          </button>
        ))}
        <div style={{ display:"flex",gap:0 }}>
          {["ru","en","uz"].map(l => <button key={l} className="lb jost" style={{ color:lang===l?C.acc:C.fg2 }} onClick={() => { changeLang(l); setMnav(false); }}>{l.toUpperCase()}</button>)}
        </div>
        <ThemeToggle dark={dark} toggle={() => setDark(d=>!d)} label={t.theme[dark?0:1]} />
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:200,height:70,padding:"0 5%",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background: navScrolled ? C.navBg : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? `1px solid ${C.border}` : "none",
        transition:"background .5s,border-color .5s",
      }}>
        <div onClick={() => goto("home")} data-hover="1" style={{ cursor:"none",display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:400,letterSpacing:8,textTransform:"uppercase",color:C.fg,transition:"color .5s" }}>RODENA</span>
          <span style={{ width:1,height:16,background:C.acc,opacity:.55,transition:"background .5s" }} />
          <span className="jost" style={{ fontSize:8,letterSpacing:3,color:C.acc,textTransform:"uppercase",fontWeight:200,transition:"color .5s" }}>Coffee</span>
        </div>

        <div className="nd" style={{ display:"flex",gap:28,alignItems:"center" }}>
          {t.nav.map((n,i) => (
            <button key={i} className="nl" data-hover="1" onClick={() => goto(t.ids[i])}
              style={{ color:C.fg2 }}
              // onMouseEnter={e => { e.currentTarget.style.color=C.acc; e.currentTarget.querySelector("style") && null; }}
              onMouseLeave={e => { e.currentTarget.style.color=C.fg2; }}
            >
              <em style={{ color:C.acc,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",fontSize:11,marginRight:6,fontWeight:300 }}>0{i+1}</em>{n}
              <style>{`.nl:hover::after{background:${C.acc}}`}</style>
            </button>
          ))}
        </div>

        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          <div className="nd" style={{ display:"flex",gap:0,borderLeft:`1px solid ${C.border}`,paddingLeft:14,marginRight:10 }}>
            {["ru","en","uz"].map(l => <button key={l} className="lb jost" data-hover="1" style={{ color:lang===l?C.acc:C.fg2 }} onClick={() => changeLang(l)}>{l.toUpperCase()}</button>)}
          </div>
          <ThemeToggle dark={dark} toggle={() => setDark(d=>!d)} label={t.theme[dark?0:1]} />
          <button className="mbt" onClick={() => setMnav(true)} data-hover="1" style={{ display:"none",flexDirection:"column",gap:6,background:"none",border:"none",cursor:"none",padding:4,marginLeft:10 }}>
            {[22,14,22].map((w,i) => <span key={i} style={{ display:"block",width:w,height:1,background:C.fg,transition:"background .4s" }} />)}
          </button>
        </div>
      </nav>
      <style>{`.mbt{display:flex!important}@media(min-width:901px){.mbt{display:none!important}}`}</style>

      {/* ════════════════════════════════════
          HERO — video background
      ════════════════════════════════════ */}
      <section id="home" style={{ minHeight:"100vh",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center" }}>

        {/* VIDEO BG */}
        <video
          autoPlay muted loop playsInline
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",transform:`scale(1.05) translateY(${scrollY*0.08}px)`,transition:"transform .05s linear" }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-coffee-being-poured-in-a-cup-seen-from-above-46489-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-barista-preparing-coffee-53295-large.mp4" type="video/mp4" />
        </video>

        {/* Overlay with gradient */}
        <div style={{ position:"absolute",inset:0,background:`linear-gradient(135deg,rgba(7,7,7,0.78) 0%,rgba(7,7,7,0.45) 50%,rgba(7,7,7,0.65) 100%)`,transition:"background .6s" }} />
        {/* Bottom fade */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"35%",background:`linear-gradient(to top,${C.bg},transparent)`,transition:"background .6s" }} />

        {/* Left vertical rule */}
        <div style={{ position:"absolute",left:"5%",top:"15%",width:1,height:"70%",background:"linear-gradient(to bottom,transparent,rgba(201,169,110,0.4),transparent)",animation:"fadeIn 2s ease .3s both" }} />
        <div style={{ position:"absolute",left:"4.6%",top:"18%",animation:"fadeIn 1.5s ease .9s both" }}>
          <span className="jost" style={{ writingMode:"vertical-rl",fontSize:9,letterSpacing:6,textTransform:"uppercase",color:"rgba(201,169,110,0.55)",fontWeight:200 }}>2020</span>
        </div>

        {/* Content */}
        <div style={{ position:"relative",zIndex:1,maxWidth:860,padding:"0 7% 0 6%",transform:`translateY(${scrollY*-0.1}px)` }}>
          <div style={{ animation:"fadeUp .9s ease .2s both",display:"flex",alignItems:"center",gap:14,marginBottom:30 }}>
            <span style={{ display:"inline-block",width:28,height:1,background:"#C9A96E",opacity:.8 }} />
            <span className="jost" style={{ fontSize:10,letterSpacing:5,textTransform:"uppercase",color:"rgba(201,169,110,.85)",fontWeight:200 }}>{t.hero.eye}</span>
          </div>

          <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(52px,8.5vw,118px)",fontWeight:200,lineHeight:.96,letterSpacing:-1.5,marginBottom:36,color:"#EDE5D5" }}>
            <span className="hline"><span className="hw" style={{ animationDelay:".22s" }}>{t.hero.l1}</span></span>
            <span className="hline"><em className="hw" style={{ fontStyle:"italic",color:"#C9A96E",animationDelay:".42s" }}>{t.hero.l2}</em></span>
          </h1>

          <div style={{ display:"flex",alignItems:"center",gap:12,margin:"30px 0 38px",animation:"fadeIn 1s ease .95s both" }}>
            <div style={{ width:44,height:1,background:"#C9A96E" }} />
            <div style={{ width:5,height:5,borderRadius:"50%",background:"#C9A96E",opacity:.6 }} />
            <div style={{ width:20,height:1,background:"rgba(201,169,110,.4)" }} />
          </div>

          <p className="jost" style={{ fontSize:13,fontWeight:200,letterSpacing:1.5,lineHeight:1.9,color:"rgba(237,229,213,0.6)",marginBottom:52,maxWidth:420,animation:"fadeUp 1s ease 1s both" }}>{t.hero.sub}</p>

          <div style={{ display:"flex",gap:14,flexWrap:"wrap",animation:"fadeUp 1s ease 1.1s both" }}>
            {/* Primary CTA */}
            <button data-hover="1" onClick={() => goto("contact")} style={{
              fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:4,textTransform:"uppercase",fontWeight:300,
              background:"#C9A96E",color:"#07070A",border:"none",padding:"18px 48px",cursor:"none",
              position:"relative",overflow:"hidden",display:"inline-block",
              transition:"letter-spacing .5s cubic-bezier(0.23,1,0.32,1),background .4s",
            }}
              onMouseEnter={e => { e.currentTarget.style.letterSpacing="6px"; e.currentTarget.style.background="#E0C07A"; }}
              onMouseLeave={e => { e.currentTarget.style.letterSpacing="4px"; e.currentTarget.style.background="#C9A96E"; }}
            >{t.hero.cta1}</button>
            {/* Secondary CTA */}
            <button data-hover="1" onClick={() => goto("menu")} style={{
              fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:4,textTransform:"uppercase",fontWeight:300,
              background:"transparent",color:"#EDE5D5",border:"1px solid rgba(237,229,213,0.3)",padding:"17px 48px",cursor:"none",
              transition:"letter-spacing .5s,border-color .4s,color .4s,background .4s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#C9A96E"; e.currentTarget.style.color="#C9A96E"; e.currentTarget.style.letterSpacing="6px"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(237,229,213,0.3)"; e.currentTarget.style.color="#EDE5D5"; e.currentTarget.style.letterSpacing="4px"; }}
            >{t.hero.cta2}</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:10,zIndex:1,animation:"fadeIn 1.5s ease 1.4s both" }}>
          <span className="jost" style={{ fontSize:8,letterSpacing:5,textTransform:"uppercase",color:"rgba(201,169,110,0.6)",fontWeight:200 }}>{t.hero.scroll}</span>
          <div style={{ width:1,height:52,position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",inset:0,background:"#C9A96E",animation:"scrollPulse 2.2s ease-in-out 1.4s infinite" }} />
          </div>
        </div>

        {/* Floating orbs */}
        {[{x:"14%",y:"25%",s:4,d:7,dl:0},{x:"84%",y:"40%",s:3,d:8.5,dl:.8},{x:"78%",y:"75%",s:5,d:6.8,dl:1.5},{x:"20%",y:"78%",s:3,d:9.2,dl:.4}].map((o,i) => (
          <div key={i} style={{ position:"absolute",left:o.x,top:o.y,width:o.s,height:o.s,borderRadius:"50%",background:"#C9A96E",opacity:.25,pointerEvents:"none",animation:`floatOrb ${o.d}s ease-in-out ${o.dl}s infinite`,zIndex:1 }} />
        ))}
      </section>

      {/* ════════ ABOUT ════════ */}
      <section id="about" style={{ padding:"130px 5%",background:C.bg2,transition:"background .5s" }}>
        <div className="ab-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px 90px",alignItems:"center" }}>

          {/* Left — image + text */}
          <div>
            <div {...R("a-img",.0,"left")} style={{ marginBottom:48,position:"relative" }}>
              <ParallaxImg
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&q=85"
                alt="Rodena interior"
                strength={0.1}
                style={{ height:460,borderRadius:2 }}
              />
              {/* floating badge on image */}
              <div style={{ position:"absolute",bottom:-20,right:-20,background:C.acc,padding:"20px 28px",boxShadow:"0 16px 40px rgba(0,0,0,0.25)" }}>
                <span className="jost" style={{ fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"#07070A",fontWeight:300,display:"block",marginBottom:4 }}>2GIS · 2025</span>
                <div style={{ display:"flex",gap:2,marginBottom:4 }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color:"#07070A",fontSize:10 }}>★</span>)}
                </div>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:400,color:"#07070A" }}>Лучшая кофейня</span>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div>
            <div {...R("a-e",.1,"right")}>
              <span className="jost" style={{ fontSize:10,letterSpacing:5,textTransform:"uppercase",color:C.acc,fontWeight:200,display:"flex",alignItems:"center",gap:12,marginBottom:20,transition:"color .5s" }}>
                <span style={{ display:"inline-block",width:22,height:1,background:C.acc }} />{t.about.lbl}
              </span>
            </div>
            <div {...R("a-t",.18,"right")}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,68px)",fontWeight:200,lineHeight:1.05,whiteSpace:"pre-line",marginBottom:36,color:C.fg,transition:"color .5s" }}>{t.about.title}</h2>
            </div>
            <div {...R("a-b",.26,"right")} style={{ borderLeft:`2px solid ${C.acc3}`,paddingLeft:28,transition:"border-color .5s" }}>
              <p className="jost" style={{ fontSize:14,fontWeight:200,lineHeight:1.9,color:C.fg2,marginBottom:14,transition:"color .5s" }}>{t.about.p1}</p>
              <p className="jost" style={{ fontSize:14,fontWeight:200,lineHeight:1.9,color:C.fg2,marginBottom:20,transition:"color .5s" }}>{t.about.p2}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic",color:C.acc,fontWeight:300,transition:"color .5s" }}>{t.about.p3}</p>
            </div>

            {/* Stats row */}
            <div {...R("a-s",.34,"right")} className="st-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,marginTop:40 }}>
              {t.about.stats.map((s,i) => (
                <div key={i} style={{ padding:"28px 20px",background:i%2===0?C.acc2:C.fg3,borderTop:`1px solid ${i%2===0?C.acc3:C.border}`,display:"flex",flexDirection:"column",gap:6,transition:"all .5s" }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(28px,3.5vw,40px)",fontWeight:200,color:i%2===0?C.acc:C.fg,lineHeight:1,transition:"color .5s" }}>
                    <Counter to={s.n} suffix={s.s} dur={1700} />
                  </span>
                  <span className="jost" style={{ fontSize:9,letterSpacing:2,textTransform:"uppercase",fontWeight:200,color:C.fg2,transition:"color .5s" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* thin divider */}
      <div style={{ padding:"0 5%" }}><div style={{ height:1,background:`linear-gradient(to right,transparent,${C.acc3},transparent)`,transition:"background .5s" }} /></div>

      {/* ════════ MENU ════════ */}
      <section id="menu" style={{ padding:"130px 5%",background:C.bg,position:"relative",transition:"background .5s" }}>
        <div style={{ position:"absolute",top:"6%",right:"-1%",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(70px,13vw,180px)",fontWeight:200,color:"transparent",WebkitTextStroke:`1px ${C.fg3}`,pointerEvents:"none",userSelect:"none",lineHeight:1,transition:"color .5s" }}>MENU</div>

        <div {...R("m-h",0)}>
          <span className="jost" style={{ fontSize:10,letterSpacing:5,textTransform:"uppercase",color:C.acc,fontWeight:200,display:"flex",alignItems:"center",gap:12,marginBottom:20,transition:"color .5s" }}>
            <span style={{ display:"inline-block",width:22,height:1,background:C.acc }} />{t.menu.lbl}
          </span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:200,lineHeight:1,marginBottom:40,color:C.fg,transition:"color .5s" }}>{t.menu.title}</h2>
          <div style={{ width:44,height:1,background:`linear-gradient(to right,${C.acc},transparent)`,marginBottom:48 }} />
        </div>

        {/* tabs */}
        <div style={{ display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:40,overflowX:"auto",transition:"border-color .5s" }}>
          {t.menu.tabs.map((tb,i) => (
            <button key={i} data-hover="1" className={`mtab ${tab===i?"on":""}`}
              style={{ color:tab===i?C.fg:C.fg2 }}
              onClick={() => changeTab(i)}
            >
              <style>{`.mtab.on::after{background:${C.acc}}`}</style>
              {tb}
            </button>
          ))}
        </div>

        <div style={{ opacity:tabVis?1:0,transform:tabVis?"none":"translateY(8px)",transition:"opacity .23s ease,transform .23s ease" }}>
          {MENU[t.menu.keys[tab]].map((item,i) => (
            <MenuCard key={`${tab}-${i}`} item={item} C={C} />
          ))}
        </div>

        <p className="jost" style={{ fontSize:11,letterSpacing:2,textTransform:"uppercase",fontWeight:200,marginTop:40,color:C.fg2,transition:"color .5s" }}>{t.menu.avg}</p>
      </section>

      {/* ════════ ATMOSPHERE ════════ */}
      <section id="atm" style={{ padding:"130px 5%",background:C.bg2,position:"relative",overflow:"hidden",transition:"background .5s" }}>
        <div style={{ position:"absolute",right:"-8%",top:"50%",width:"50vw",height:"50vw",borderRadius:"50%",border:`1px solid ${C.border}`,pointerEvents:"none",animation:"spin60 65s linear infinite",transition:"border-color .5s" }} />

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px 80px",alignItems:"start",marginBottom:80 }}>
          <div {...R("at-h",0,"left")}>
            <span className="jost" style={{ fontSize:10,letterSpacing:5,textTransform:"uppercase",color:C.acc,fontWeight:200,display:"flex",alignItems:"center",gap:12,marginBottom:20,transition:"color .5s" }}>
              <span style={{ display:"inline-block",width:22,height:1,background:C.acc }} />{t.atm.lbl}
            </span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(38px,5.5vw,72px)",fontWeight:200,lineHeight:1.05,marginBottom:32,color:C.fg,transition:"color .5s" }}>{t.atm.title}</h2>
            <div style={{ width:40,height:1,background:C.acc,marginBottom:28 }} />
            <blockquote style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(20px,3vw,30px)",fontWeight:200,fontStyle:"italic",color:C.acc,lineHeight:1.3,transition:"color .5s" }}>
              «{t.atm.quote}»
            </blockquote>
          </div>
          <div {...R("at-img",.1,"right")}>
            <ParallaxImg
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85"
              alt="Rodena atmosphere"
              strength={0.09}
              style={{ height:400,borderRadius:2 }}
            />
          </div>
        </div>

        <div {...R("at-g",.12)} className="fc-grid" style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1 }}>
          {t.atm.cards.map((c,i) => (
            <div key={i} className="fcard"
              style={{ border:`1px solid ${C.border}`,background:C.bg3,transition:"all .5s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=C.acc3; e.currentTarget.style.background=C.acc2; e.currentTarget.style.transform="translateY(-7px)"; e.currentTarget.style.boxShadow=dark?"0 20px 50px rgba(0,0,0,0.5)":`0 20px 50px ${C.acc2}`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.bg3; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
            >
              <span style={{ display:"block",fontSize:24,marginBottom:18 }}>{c.ico}</span>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:400,marginBottom:10,color:C.fg,transition:"color .5s" }}>{c.t}</h3>
              <p className="jost" style={{ fontSize:12,fontWeight:200,lineHeight:1.85,color:C.fg2,transition:"color .5s" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ GALLERY ════════ */}
      <section id="gallery" style={{ padding:"130px 5%",background:C.bg,transition:"background .5s" }}>
        <div {...R("gl-h",0)} style={{ marginBottom:56 }}>
          <span className="jost" style={{ fontSize:10,letterSpacing:5,textTransform:"uppercase",color:C.acc,fontWeight:200,display:"flex",alignItems:"center",gap:12,marginBottom:20,transition:"color .5s" }}>
            <span style={{ display:"inline-block",width:22,height:1,background:C.acc }} />{t.gal.lbl}
          </span>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16 }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:200,lineHeight:1,color:C.fg,transition:"color .5s" }}>{t.gal.title}</h2>
            <span className="jost" style={{ fontSize:11,letterSpacing:2,color:C.fg2,fontWeight:200,transition:"color .5s" }}>{t.gal.sub}</span>
          </div>
          <div style={{ width:44,height:1,background:`linear-gradient(to right,${C.acc},transparent)`,marginTop:28 }} />
        </div>

        <div {...R("gl-g",.08)} className="gal-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridTemplateRows:"auto auto",gap:2 }}>
          {GALLERY.map((img,i) => (
            <div key={i} className="gal-item" data-hover="1"
              style={{ gridColumn: i===0?"span 2":i===5?"span 2":"span 1", height: i===0||i===5?380:220, borderRadius:2 }}
              onClick={() => setLB(i)}
            >
              <img src={img.url} alt={img.cap} loading="lazy" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
              <div className="gal-cap">
                <span className="jost" style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,0.9)",fontWeight:200 }}>{img.cap}</span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(201,169,110,0.7)",marginTop:4 }}>Нажмите для просмотра</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ REVIEWS ════════ */}
      <section id="reviews" style={{ padding:"130px 5%",background:C.bg2,transition:"background .5s" }}>

        <div {...R("rv-h",0)}>
          <span className="jost" style={{ fontSize:10,letterSpacing:5,textTransform:"uppercase",color:C.acc,fontWeight:200,display:"flex",alignItems:"center",gap:12,marginBottom:20,transition:"color .5s" }}>
            <span style={{ display:"inline-block",width:22,height:1,background:C.acc }} />{t.rev.lbl}
          </span>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16,marginBottom:32 }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:200,lineHeight:1,color:C.fg,transition:"color .5s" }}>{t.rev.title}</h2>
            <div style={{ display:"flex",gap:8 }}>
              {[["←",()=>setRevIdx(i=>(i-1+t.rev.items.length)%t.rev.items.length)],["→",()=>setRevIdx(i=>(i+1)%t.rev.items.length)]].map(([a,fn],i) => (
                <button key={i} data-hover="1" onClick={fn} style={{ width:50,height:50,background:"none",border:`1px solid ${C.border}`,color:C.fg2,cursor:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,transition:"all .35s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.acc; e.currentTarget.style.color=C.acc; e.currentTarget.style.background=C.acc2; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.fg2; e.currentTarget.style.background="none"; }}
                >{a}</button>
              ))}
            </div>
          </div>
          <div style={{ width:44,height:1,background:`linear-gradient(to right,${C.acc},transparent)` }} />
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 2px",marginTop:48 }}>
          {/* Main big review */}
          <div key={revIdx} style={{ padding:"52px 48px",background:C.bg3,border:`1px solid ${C.border}`,borderTop:`2px solid ${C.acc}`,position:"relative",animation:"revCard .6s cubic-bezier(0.16,1,0.3,1) both",gridColumn:"span 1",transition:"background .5s,border-color .5s" }}>
            <div style={{ position:"absolute",top:-10,left:38,fontFamily:"'Cormorant Garamond',serif",fontSize:140,color:C.acc,opacity:.07,lineHeight:1,pointerEvents:"none" }}>"</div>
            <div style={{ display:"flex",gap:3,marginBottom:22 }}>
              {[1,2,3,4,5].map(i => <span key={i} style={{ color:C.acc,fontSize:13,transition:"color .5s" }}>★</span>)}
            </div>
            <blockquote style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(17px,2.5vw,24px)",fontWeight:300,lineHeight:1.75,color:C.fg,marginBottom:32,transition:"color .5s" }}>
              {t.rev.items[revIdx].text}
            </blockquote>
            <div style={{ display:"flex",alignItems:"center",gap:14 }}>
              <div style={{ width:44,height:44,borderRadius:"50%",background:C.acc2,border:`1px solid ${C.acc3}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:C.acc,flexShrink:0,transition:"all .5s" }}>
                {t.rev.items[revIdx].name[0]}
              </div>
              <div>
                <p className="jost" style={{ fontSize:12,fontWeight:300,letterSpacing:1,color:C.fg,transition:"color .5s" }}>{t.rev.items[revIdx].name}</p>
                <p className="jost" style={{ fontSize:10,letterSpacing:2,fontWeight:200,marginTop:3,color:C.fg2,transition:"color .5s" }}>{t.rev.items[revIdx].city}</p>
              </div>
            </div>
          </div>

          {/* Stack of mini reviews */}
          <div style={{ display:"flex",flexDirection:"column",gap:1 }}>
            {t.rev.items.filter((_,i)=>i!==revIdx).slice(0,3).map((r,i) => (
              <div key={i} data-hover="1" onClick={() => setRevIdx(t.rev.items.indexOf(r))} style={{ padding:"24px 28px",background:C.bg,border:`1px solid ${C.border}`,cursor:"none",transition:"all .35s",flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between" }}
                onMouseEnter={e => { e.currentTarget.style.background=C.acc2; e.currentTarget.style.borderColor=C.acc3; }}
                onMouseLeave={e => { e.currentTarget.style.background=C.bg; e.currentTarget.style.borderColor=C.border; }}
              >
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:300,lineHeight:1.6,color:C.fg2,transition:"color .5s" }}>"{r.text.slice(0,80)}…"</p>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginTop:14 }}>
                  <div style={{ width:32,height:32,borderRadius:"50%",background:C.acc2,border:`1px solid ${C.acc3}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:C.acc,flexShrink:0 }}>{r.name[0]}</div>
                  <div>
                    <p className="jost" style={{ fontSize:11,fontWeight:300,letterSpacing:1,color:C.fg,transition:"color .5s" }}>{r.name}</p>
                    <p className="jost" style={{ fontSize:9,letterSpacing:2,fontWeight:200,color:C.fg2,marginTop:1,transition:"color .5s" }}>{r.city}</p>
                  </div>
                  <div style={{ marginLeft:"auto",display:"flex",gap:2 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color:C.acc,fontSize:9,transition:"color .5s" }}>★</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* dots */}
        <div style={{ display:"flex",gap:10,justifyContent:"center",marginTop:32 }}>
          {t.rev.items.map((_,i) => (
            <button key={i} data-hover="1" className="dot" onClick={() => setRevIdx(i)}
              style={{ background:revIdx===i?C.acc:`${C.fg}20`,transform:revIdx===i?"scale(1.5)":"scale(1)" }}
            >
              {revIdx===i && <span style={{ position:"absolute",inset:0,borderRadius:"50%",border:`1px solid ${C.acc}`,animation:"ping 1.5s ease-out infinite" }} />}
            </button>
          ))}
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section id="contact" style={{ padding:"130px 5%",background:C.bg,position:"relative",transition:"background .5s" }}>
        <div style={{ position:"absolute",inset:0,background:`radial-gradient(ellipse at 60% 50%,${C.acc2} 0%,transparent 55%)`,pointerEvents:"none",transition:"background .5s" }} />

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px 80px",alignItems:"start" }}>
          {/* Left — heading + image */}
          <div>
            <div {...R("ct-h",0,"left")}>
              <span className="jost" style={{ fontSize:10,letterSpacing:5,textTransform:"uppercase",color:C.acc,fontWeight:200,display:"flex",alignItems:"center",gap:12,marginBottom:20,transition:"color .5s" }}>
                <span style={{ display:"inline-block",width:22,height:1,background:C.acc }} />{t.con.lbl}
              </span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:200,lineHeight:1,marginBottom:36,color:C.fg,transition:"color .5s" }}>{t.con.title}</h2>
              <div style={{ width:44,height:1,background:`linear-gradient(to right,${C.acc},transparent)`,marginBottom:40 }} />
            </div>
            <div {...R("ct-img",.1,"left")}>
              <ParallaxImg
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85"
                alt="Rodena coffee"
                strength={0.08}
                style={{ height:340,borderRadius:2 }}
              />
            </div>
          </div>

          {/* Right — branch cards + cta */}
          <div {...R("ct-r",.12,"right")}>
            <div className="cn-grid" style={{ display:"grid",gridTemplateColumns:"1fr",gap:1,marginBottom:28 }}>
              {[{name:t.con.b1n,addr:t.con.b1a},{name:t.con.b2n,addr:t.con.b2a}].map((b,i) => (
                <div key={i} className="ccard"
                  style={{ border:`1px solid ${C.border}`,padding:"36px 36px",background:C.bg2,transition:"all .5s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.acc3; e.currentTarget.style.background=C.acc2; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.bg2; }}
                >
                  <style>{`.ccard::after{background:linear-gradient(to right,transparent,${C.acc},transparent)}`}</style>
                  <span className="jost" style={{ fontSize:9,letterSpacing:4,textTransform:"uppercase",color:C.acc,fontWeight:200,display:"block",marginBottom:12,transition:"color .5s" }}>{b.name}</span>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,2.5vw,24px)",fontWeight:300,marginBottom:16,color:C.fg,transition:"color .5s" }}>{b.addr}</p>
                  <div style={{ width:24,height:1,background:C.acc3,margin:"14px 0",transition:"background .5s" }} />
                  <p className="jost" style={{ fontSize:11,letterSpacing:2,fontWeight:200,marginBottom:6,color:C.fg2,transition:"color .5s" }}>{t.con.hours}</p>
                  <p className="jost" style={{ fontSize:15,letterSpacing:1,fontWeight:200,color:C.acc,transition:"color .5s" }}>{t.con.phone}</p>
                </div>
              ))}
            </div>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              <a href={`tel:${t.con.phone.replace(/\s/g,"")}`} data-hover="1" style={{
                fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:4,textTransform:"uppercase",fontWeight:300,
                background:C.acc,color:dark?"#070707":"#FDFAF5",border:"none",padding:"17px 44px",cursor:"none",display:"inline-block",textDecoration:"none",
                transition:"letter-spacing .5s,background .4s",
              }}
                onMouseEnter={e => { e.currentTarget.style.letterSpacing="6px"; }}
                onMouseLeave={e => { e.currentTarget.style.letterSpacing="4px"; }}
              >{t.con.cta1}</a>
              <a href="https://broniboy.ru/tashkent/restaurants/p_Rodena/" target="_blank" rel="noopener noreferrer" data-hover="1" style={{
                fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:4,textTransform:"uppercase",fontWeight:300,
                background:"transparent",color:C.fg,border:`1px solid ${C.border}`,padding:"16px 44px",cursor:"none",display:"inline-block",textDecoration:"none",
                transition:"letter-spacing .5s,border-color .4s,color .4s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.acc; e.currentTarget.style.color=C.acc; e.currentTarget.style.letterSpacing="6px"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.fg; e.currentTarget.style.letterSpacing="4px"; }}
              >{t.con.cta2}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ padding:"44px 5%",borderTop:`1px solid ${C.border}`,background:C.bg2,transition:"background .5s,border-color .5s" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20,marginBottom:28 }}>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300,letterSpacing:8,textTransform:"uppercase",color:C.fg,transition:"color .5s" }}>RODENA</span>
              <span style={{ width:1,height:12,background:C.acc,opacity:.5 }} />
              <span className="jost" style={{ fontSize:7,letterSpacing:3,color:C.acc,textTransform:"uppercase",fontWeight:200 }}>Coffee & Bakery</span>
            </div>
            <span className="jost" style={{ fontSize:9,letterSpacing:3,textTransform:"uppercase",fontWeight:200,color:C.fg2,transition:"color .5s" }}>{t.foot.tag}</span>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            {t.nav.map((n,i) => (
              <button key={i} data-hover="1" className="nl" style={{ fontSize:9,letterSpacing:2,color:C.fg2 }} onClick={() => goto(t.ids[i])}>
                <style>{`.nl:hover{color:${C.acc}}.nl::after{background:${C.acc}}`}</style>
                {n}
              </button>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:10 }}>
            <ThemeToggle dark={dark} toggle={() => setDark(d=>!d)} label={t.theme[dark?0:1]} />
            <span className="jost" style={{ fontSize:10,letterSpacing:1,fontWeight:200,color:C.fg2,transition:"color .5s" }}>{t.foot.copy}</span>
          </div>
        </div>
        {/* bottom rule */}
        <div style={{ height:1,background:`linear-gradient(to right,transparent,${C.acc3},transparent)` }} />
      </footer>

    </div>
  );
}