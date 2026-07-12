import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Download,
  Tag,
  Sparkles,
  PartyPopper,
  CalendarDays,
  Zap,
  Image as ImageIcon,
  Plus,
  Minus,
  Store,
  ShoppingCart,
  Check,
  Trash2,
  Share2,
  Megaphone,
  Heart,
  ClipboardList,
  Star,
  Lock,
  Unlock,
  Pencil,
  Grid3x3,
  Palette,
} from "lucide-react";
import { getShared, setShared, watchShared, getLocal, setLocal } from "./firebase.js";

const ORANGE = "#FF6A00";
const INK = "#181818";
const GREY = "#F2F2F2";

const THEMES = {
  alibaba: { name: "Orange marché", bg: "#FF6A00", ink: "#181818", stripe: "#CC5500" },
  moutarde: { name: "Moutarde", bg: "#E8A33D", ink: "#1B2A4A", stripe: "#C97F1F" },
  brique: { name: "Brique", bg: "#B4402F", ink: "#F7F3E8", stripe: "#8C2E20" },
  sauge: { name: "Sauge", bg: "#5C7A5C", ink: "#F7F3E8", stripe: "#425B42" },
  navy: { name: "Encre", bg: "#1B2A4A", ink: "#F7F3E8", stripe: "#0F1B30" },
};

const TEMPLATES = [
  { id: "promo", name: "Promo flash", icon: Zap, theme: "alibaba", title: "PROMO FLASH", subtitle: "Ce week-end seulement", tag: "-30%" },
  { id: "nouveaute", name: "Nouveauté", icon: Sparkles, theme: "sauge", title: "NOUVEAU", subtitle: "Découvrez notre dernière arrivée", tag: "New" },
  { id: "ouverture", name: "Ouverture", icon: PartyPopper, theme: "moutarde", title: "OUVERTURE", subtitle: "On vous attend !", tag: "J-1" },
  { id: "soldes", name: "Soldes", icon: Tag, theme: "brique", title: "SOLDES", subtitle: "Jusqu'à épuisement des stocks", tag: "-50%" },
  { id: "evenement", name: "Événement", icon: CalendarDays, theme: "navy", title: "ÉVÉNEMENT", subtitle: "Samedi 14h — Venez nombreux", tag: "Save the date" },
];

const COUPONS = { KING10: 0.1, BIENVENUE: 0.05 };
const FREE_SHIPPING_THRESHOLD = 50;
const SHOP_NAME = "KING MIKE";

function parsePrice(str) {
  if (!str) return 0;
  const cleaned = String(str).replace(/[^\d,.-]/g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}
function formatEUR(n) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("vitrine-fonts")) return;
    const link = document.createElement("link");
    link.id = "vitrine-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Work+Sans:wght@400;500;600;700&family=Space+Mono:wght@700&display=swap";
    document.head.appendChild(link);
  }, []);
}

function PriceTag({ text, bg }) {
  return (
    <div style={{ position: "absolute", top: 18, right: -10, transform: "rotate(6deg)", background: "#F7F3E8", color: bg, fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 15, padding: "6px 14px 6px 12px", borderRadius: "3px 10px 10px 3px", boxShadow: "0 3px 8px rgba(0,0,0,0.25)", letterSpacing: 0.5 }}>
      <span style={{ position: "absolute", left: -5, top: "50%", transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#1B2A4A" }} />
      {text}
    </div>
  );
}

function AdPreview({ data }) {
  const t = THEMES[data.theme];
  return (
    <div style={{ width: "100%", aspectRatio: "4 / 5", borderRadius: 18, overflow: "hidden", position: "relative", background: t.bg, boxShadow: "0 12px 30px rgba(0,0,0,0.22)" }}>
      <div style={{ height: "16%", width: "100%", backgroundImage: `repeating-linear-gradient(90deg, ${t.stripe} 0 22px, ${t.bg} 22px 44px)` }} />
      <div style={{ position: "relative", padding: "28px 26px", height: "84%" }}>
        <PriceTag text={data.tag} bg={t.bg} />
        <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 40, lineHeight: 1.05, color: t.ink, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 30 }}>
          {data.title || "TITRE"}
        </div>
        <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500, fontSize: 16, color: t.ink, opacity: 0.9, marginTop: 14, maxWidth: "90%" }}>
          {data.subtitle || "Sous-titre de votre annonce"}
        </div>
        {data.image && (
          <div style={{ width: "56%", aspectRatio: "1 / 1", marginTop: 18, borderRadius: 14, background: "#F7F3E8", padding: 8, boxShadow: "0 10px 20px rgba(0,0,0,0.25)", transform: "rotate(-3deg)" }}>
            <img src={data.image} alt="Produit" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8, display: "block" }} />
          </div>
        )}
        <div style={{ position: "absolute", bottom: 24, left: 26, fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: t.ink, opacity: 0.6, textTransform: "uppercase" }}>
          {data.shopName || SHOP_NAME}
        </div>
      </div>
    </div>
  );
}

function loadFontsThenDraw(draw) {
  const fonts = ["700 40px Oswald", "500 16px 'Work Sans'", "700 15px 'Space Mono'", "700 11px 'Space Mono'"];
  Promise.all(fonts.map((f) => document.fonts.load(f))).then(() => document.fonts.ready.then(draw));
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "", cy = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line, x, cy);
      line = words[n] + " ";
      cy += lineHeight;
    } else line = testLine;
  }
  ctx.fillText(line, x, cy);
}
function drawProductImage(ctx, img, x, y, size) {
  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  ctx.rotate((-3 * Math.PI) / 180);
  ctx.translate(-(x + size / 2), -(y + size / 2));
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  roundRect(ctx, x + 6, y + 8, size, size, 14);
  ctx.fill();
  ctx.fillStyle = "#F7F3E8";
  roundRect(ctx, x - 10, y - 10, size + 20, size + 20, 16);
  ctx.fill();
  const scale = Math.max(size / img.width, size / img.height);
  const sw = size / scale, sh = size / scale;
  const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
  ctx.save();
  roundRect(ctx, x, y, size, size, 10);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, x, y, size, size);
  ctx.restore();
  ctx.restore();
}
function drawAd(canvas, data, productImg) {
  const t = THEMES[data.theme];
  const W = 1080, H = 1350;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, H);
  const bandH = H * 0.16, stripeW = 66;
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, bandH);
  ctx.fillStyle = t.stripe;
  for (let x = -stripeW; x < W + stripeW; x += stripeW * 2) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + stripeW, 0);
    ctx.lineTo(x + stripeW, bandH);
    ctx.lineTo(x, bandH);
    ctx.closePath();
    ctx.fill();
  }
  const padX = 64;
  ctx.fillStyle = t.ink;
  ctx.font = "700 84px Oswald, sans-serif";
  ctx.textBaseline = "top";
  wrapText(ctx, (data.title || "TITRE").toUpperCase(), padX, bandH + 70, W - padX * 2, 88);
  ctx.font = "500 34px 'Work Sans', sans-serif";
  ctx.globalAlpha = 0.9;
  wrapText(ctx, data.subtitle || "Sous-titre de votre annonce", padX, bandH + 210, W - padX * 2 - 40, 44);
  ctx.globalAlpha = 1;
  if (productImg) drawProductImage(ctx, productImg, padX, bandH + 350, 420);
  ctx.font = "700 22px 'Space Mono', monospace";
  ctx.globalAlpha = 0.6;
  ctx.fillText((data.shopName || SHOP_NAME).toUpperCase(), padX, H - 90);
  ctx.globalAlpha = 1;
  const tagText = data.tag || "";
  ctx.save();
  ctx.font = "700 30px 'Space Mono', monospace";
  const tw = ctx.measureText(tagText).width + 50;
  const tx = W - tw - 20, ty = 40;
  ctx.translate(tx + tw / 2, ty + 30);
  ctx.rotate((6 * Math.PI) / 180);
  ctx.translate(-(tx + tw / 2), -(ty + 30));
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  roundRect(ctx, tx + 4, ty + 6, tw, 56, 10);
  ctx.fill();
  ctx.fillStyle = "#F7F3E8";
  roundRect(ctx, tx, ty, tw, 56, 10);
  ctx.fill();
  ctx.fillStyle = t.bg;
  ctx.fillText(tagText, tx + 25, ty + 13);
  ctx.beginPath();
  ctx.arc(tx - 2, ty + 28, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#1B2A4A";
  ctx.fill();
  ctx.restore();
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontSize: 12.5, opacity: 0.6, marginBottom: 6 }}>{label}</div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)", fontSize: 15, fontFamily: "'Work Sans', sans-serif", boxSizing: "border-box", background: "#fff", color: INK }}
      />
    </label>
  );
}
function Stars({ value, size = 15, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} onClick={() => onChange && onChange(n)} style={{ cursor: onChange ? "pointer" : "default", lineHeight: 0 }}>
          <Star size={size} color={ORANGE} fill={n <= value ? ORANGE : "none"} />
        </span>
      ))}
    </div>
  );
}
function EmptyState({ icon: Icon, text }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 30px", opacity: 0.55 }}>
      <Icon size={34} style={{ marginBottom: 10 }} />
      <div style={{ fontSize: 14 }}>{text}</div>
    </div>
  );
}
function TopBar({ title, onBack, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 16px", background: INK }}>
      <button onClick={onBack} style={{ border: "none", background: "rgba(255,255,255,0.1)", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <ArrowLeft size={18} color="#fff" />
      </button>
      <div style={{ color: "#fff", fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</div>
      <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>{right || null}</div>
    </div>
  );
}
function HeaderIconButton({ onClick, children, count }) {
  return (
    <button onClick={onClick} style={{ position: "relative", border: "none", background: "rgba(255,255,255,0.1)", borderRadius: 10, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      {children}
      {count > 0 && (
        <span style={{ position: "absolute", top: -4, right: -4, background: ORANGE, color: "#fff", fontSize: 10.5, fontWeight: 700, borderRadius: 999, minWidth: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
          {count}
        </span>
      )}
    </button>
  );
}
function ProductCard({ product, avg, count, liked, likeCount, onOpen, onToggleLike, adminBadge, onEdit, onDelete }) {
  const badge = product.badge === "nouveau" ? { label: "NOUVEAU", bg: ORANGE } : product.badge === "populaire" ? { label: "POPULAIRE", bg: INK } : null;
  return (
    <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 10px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
      <div onClick={onOpen} style={{ position: "relative", aspectRatio: "1 / 1", background: GREY, cursor: "pointer" }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3 }}>
            <ImageIcon size={26} />
          </div>
        )}
        {badge && (
          <div style={{ position: "absolute", top: 8, left: 8, background: badge.bg, color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 6, letterSpacing: 0.5 }}>
            {badge.label}
          </div>
        )}
        {adminBadge && (
          <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6 }}>
            <button onClick={(e) => { e.stopPropagation(); onEdit(); }} style={{ border: "none", background: "rgba(255,255,255,0.92)", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Pencil size={14} color={INK} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ border: "none", background: "rgba(255,255,255,0.92)", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Trash2 size={14} color="#C0392B" />
            </button>
          </div>
        )}
        {!adminBadge && (
          <button onClick={(e) => { e.stopPropagation(); onToggleLike(); }} style={{ position: "absolute", top: 8, right: 8, border: "none", background: "rgba(255,255,255,0.92)", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Heart size={14} color={ORANGE} fill={liked ? ORANGE : "none"} />
          </button>
        )}
      </div>
      <div onClick={onOpen} style={{ padding: 10, cursor: "pointer", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.25 }}>{product.name}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: ORANGE }}>{product.price}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
          {avg ? (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={12} color={ORANGE} fill={ORANGE} />
              <span style={{ fontSize: 11.5, opacity: 0.65 }}>{avg.toFixed(1)} ({count})</span>
            </div>
          ) : (
            <span style={{ fontSize: 11.5, opacity: 0.4 }}>Pas d'avis</span>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 3, opacity: 0.6 }}>
            <Heart size={11} color={ORANGE} fill={likeCount > 0 ? ORANGE : "none"} />
            <span style={{ fontSize: 11 }}>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useGoogleFonts();

  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("client");
  const [adminTab, setAdminTab] = useState("catalogue");

  const [data, setData] = useState(null);

  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ id: null, name: "", price: "", image: null, badge: "none" });

  const [cart, setCart] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({ name: "", phone: "", address: "" });
  const [couponCode, setCouponCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [reviews, setReviews] = useState({});
  const [reviewForm, setReviewForm] = useState({ name: "", stars: 5, comment: "" });
  const [activeProduct, setActiveProduct] = useState(null);
  const [shareMsg, setShareMsg] = useState(null);

  const [isAdminDevice, setIsAdminDevice] = useState(false);
  const [adminPin, setAdminPin] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [pinInput2, setPinInput2] = useState("");
  const [pinError, setPinError] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    setCart(getLocal("king-mike-cart", []));
    setFavorites(getLocal("king-mike-favorites", []));
    setOrders(getLocal("king-mike-orders", []));
    setIsAdminDevice(getLocal("king-mike-admin-device", false));
  }, []);

  useEffect(() => {
    const unsub1 = watchShared("catalog", setProducts, []);
    const unsub2 = watchShared("reviews", setReviews, {});
    const unsub3 = watchShared("likes", setLikeCounts, {});
    const unsub4 = watchShared("adminPin", setAdminPin, null);
    const unsub5 = watchShared("ordersAll", setAllOrders, []);
    return () => { unsub1(); unsub2(); unsub3(); unsub4(); unsub5(); };
  }, []);

  useEffect(() => { setLocal("king-mike-cart", cart); }, [cart]);
  useEffect(() => { setLocal("king-mike-favorites", favorites); }, [favorites]);
  useEffect(() => { setLocal("king-mike-orders", orders); }, [orders]);
  useEffect(() => { setLocal("king-mike-admin-device", isAdminDevice); }, [isAdminDevice]);

  const goHome = () => setScreen("home");

  const tapLock = () => {
    if (mode === "admin") { setMode("client"); setAdminTab("catalogue"); setScreen("home"); return; }
    if (isAdminDevice) { setMode("admin"); setScreen("home"); return; }
    setPinInput(""); setPinInput2(""); setPinError(null);
    setScreen(adminPin ? "pinEnter" : "pinSetup");
  };

  const confirmPinSetup = async () => {
    if (pinInput.trim().length < 4) { setPinError("Choisis un code d'au moins 4 chiffres."); return; }
    if (pinInput !== pinInput2) { setPinError("Les deux codes ne correspondent pas."); return; }
    await setShared("adminPin", pinInput.trim());
    setIsAdminDevice(true);
    setMode("admin");
    setScreen("home");
  };

  const confirmPinEnter = () => {
    if (pinInput.trim() === String(adminPin)) {
      setIsAdminDevice(true);
      setMode("admin");
      setScreen("home");
    } else {
      setPinError("Code incorrect.");
    }
  };

  const openTemplate = (tpl) => {
    setData({ title: tpl.title, subtitle: tpl.subtitle, tag: tpl.tag, theme: tpl.theme, shopName: SHOP_NAME, image: null });
    setScreen("editor");
  };
  const handleDataImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((d) => ({ ...d, image: reader.result }));
    reader.readAsDataURL(file);
  };
  const downloadAd = () => {
    const canvas = canvasRef.current;
    const finish = (productImg) => {
      loadFontsThenDraw(() => {
        drawAd(canvas, data, productImg);
        const link = document.createElement("a");
        link.download = `visuel-${(data.title || "visuel").toLowerCase().replace(/\s+/g, "-")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    };
    if (data.image) { const img = new Image(); img.onload = () => finish(img); img.src = data.image; } else finish(null);
  };
  const shareAd = () => {
    const canvas = canvasRef.current;
    const finish = (productImg) => {
      loadFontsThenDraw(async () => {
        drawAd(canvas, data, productImg);
        canvas.toBlob(async (blob) => {
          const file = new File([blob], "visuel.png", { type: "image/png" });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try { await navigator.share({ files: [file], title: data.title, text: data.subtitle }); } catch (e) {}
          } else {
            const link = document.createElement("a");
            link.download = "visuel.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          }
        }, "image/png");
      });
    };
    if (data.image) { const img = new Image(); 
