/* ✏️ แก้ข้อความตรงนี้ได้เลย */
const MESSAGES = [
  "เค้าขอโทษนะ จิ๋ว\nสำหรับเรื่องที่ทำให้เธอเสียใจ 🥺",
  "ช่วงที่ผ่านมา เค้าได้คิดทบทวนเยอะเลย\nว่าตรงไหนที่เค้าทำพลาดไป ☁️",
  "เค้าไม่ได้อยากแก้ตัวนะ\nแค่อยากเรียนรู้ และเปลี่ยนให้ดีขึ้น 🌱",
  "เค้ายังคิดถึงแมวจิ๋วอยู่เสมอ\nและยังรู้สึกดีๆ กับเธอเหมือนเดิม 💗",
  "เลยอยากถามว่า...\nเราสองคนลองเริ่มต้นใหม่ด้วยกัน\nอีกสักครั้งได้ไหม? 🤍"
];

const $ = id => document.getElementById(id);
const mascot = $("mascot");
const show = n => { document.querySelectorAll(".stage").forEach(s => s.classList.remove("on")); $("s"+n).classList.add("on"); };
const mood = m => { mascot.classList.remove("happy","calm"); if (m) mascot.classList.add(m); };

for (let i = 0; i < 6; i++) {
  const c = document.createElement("div"); c.className = "cloud";
  const w = 90 + Math.random()*90;
  c.style.cssText = `width:${w}px;height:${w*.3}px;top:${5+Math.random()*80}%;animation-duration:${40+Math.random()*40}s;animation-delay:-${Math.random()*60}s`;
  document.body.appendChild(c);
}
function fx(emoji, size, fall) {
  const h = document.createElement("div"); h.className = "fx" + (fall ? " fall" : "");
  h.textContent = emoji; h.style.left = Math.random()*100 + "vw"; h.style.fontSize = size + "px";
  h.style.animationDuration = (fall ? 3 + Math.random()*3 : 5 + Math.random()*5) + "s";
  document.body.appendChild(h); setTimeout(() => h.remove(), 10500);
}
let ambient = setInterval(() => fx(["🤍","☁️","✨","💗"][Math.random()*4|0], 14 + Math.random()*16), 1500);

let i = 0, timer;
const dots = $("dots");
MESSAGES.forEach(() => dots.appendChild(document.createElement("i")));
function type(text) {
  clearInterval(timer); const el = $("msg"); el.textContent = ""; let k = 0; const ch = [...text];
  timer = setInterval(() => { el.textContent += ch[k++] || ""; if (k >= ch.length) clearInterval(timer); }, 55);
}
function step() {
  [...dots.children].forEach((d, n) => d.classList.toggle("on", n === i));
  type(MESSAGES[i]);
  $("next").textContent = i === MESSAGES.length - 1 ? "ถามหน่อยนะ 💌" : "ต่อไป →";
}
$("open").onclick = () => { show(1); step(); };
$("next").onclick = () => { if (i < MESSAGES.length - 1) { i++; step(); } else { clearInterval(timer); show(2); } };

$("yes").onclick = () => {
  show(3); mood("happy");
  for (let n = 0; n < 40; n++) setTimeout(() => fx(["💖","💕","🎀","✨","🤍","☁️"][Math.random()*6|0], 20 + Math.random()*26), n*90);
};
$("no").onclick = () => {
  clearInterval(ambient); show(4); mood("calm");
  for (let n = 0; n < 10; n++) setTimeout(() => fx(["🤍","☁️","🌷"][n % 3], 18 + Math.random()*10), n*300);
};
$("back").onclick = () => { mood(null); show(2); ambient = setInterval(() => fx("🤍", 18), 1500); };
