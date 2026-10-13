(() => {
"use strict";
const messages=[
"¿Cómo que no vas a almorzar? ¿Quieres empezar a parecer un mapache? 🦝","Niña, vaya a comer, que esa belleza necesita mantenimiento. 💅","Siga sin almorzar y mañana amanece con cara de mapache desvelado. 🦝","La belleza cuesta, mija… y mínimo necesita un almuerzo. 😂","¿Tú crees que esa carita se mantiene funcionando con aire? 🍽️","Señorita, se le está acabando la batería y todavía no ha comido. 🔋","No almuerza y después anda viendo estrellitas. ✨","¡ALERTA! Esta muchacha está poniendo en riesgo su belleza por no comer. 🚨","Un almuerzo al día mantiene al mapache alejado. 🦝","Mira que el filtro de belleza no funciona con el estómago vacío. 😭","¿Quieres que te salgan ojeras hasta en el documento? Vaya a comer. 😂","Última oportunidad antes de que te salgan orejitas de mapache. 🦝","Ese cuerpo no funciona con Wi-Fi, necesita comida. 📶","El almuerzo está esperando y tú aquí desperdiciando tu belleza. 😂","Come algo, mujer, que hasta los mapaches tienen horario de comida. 🦝","Mija, hasta el celular pide carga y usted ni una cucharada se ha dado. 🔋","No sea así con esa pobre barriga, que no tiene la culpa de sus decisiones. 😭","El arroz no se va a comer solo. Bueno, yo tampoco, así que vaya. 🍚","Está en modo ahorro de energía y todavía se niega a almorzar. 📉","Último llamado para la señorita antes de activar el protocolo mapache. 🚨"
];
const noBtn=document.getElementById("noBtn"),yesBtn=document.getElementById("yesBtn"),roast=document.getElementById("roast"),modal=document.getElementById("successModal"),doneBtn=document.getElementById("doneBtn"),closeX=document.getElementById("closeX"),musicBtn=document.getElementById("musicBtn");
let previous=-1,playerReady=false,playerState=-1,yt=null,pendingPlay=false;
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
function nextMessage(){let n;do{n=Math.floor(Math.random()*messages.length)}while(messages.length>1&&n===previous);previous=n;return messages[n]}
function moveNo(){
 roast.textContent=nextMessage();
 const r=noBtn.getBoundingClientRect(),pad=12;
 const maxX=Math.max(pad,innerWidth-r.width-pad),maxY=Math.max(pad,innerHeight-r.height-pad);
 noBtn.style.position="fixed";noBtn.style.left=Math.round(pad+Math.random()*(maxX-pad))+"px";noBtn.style.top=Math.round(pad+Math.random()*(maxY-pad))+"px";noBtn.style.zIndex="8";
 noBtn.style.transition=reduced?"none":"left .28s ease,top .28s ease,transform .2s ease";
}
noBtn.addEventListener("click",moveNo);
yesBtn.addEventListener("click",()=>{modal.hidden=false;document.body.style.overflow="hidden";doneBtn.focus()});
function closeModal(){modal.hidden=true;document.body.style.overflow="";yesBtn.focus()}
doneBtn.addEventListener("click",closeModal);closeX.addEventListener("click",closeModal);modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)closeModal()});
addEventListener("resize",()=>{if(noBtn.style.position!=="fixed")return;const r=noBtn.getBoundingClientRect(),p=12;noBtn.style.left=Math.max(p,Math.min(r.left,innerWidth-r.width-p))+"px";noBtn.style.top=Math.max(p,Math.min(r.top,innerHeight-r.height-p))+"px"});
// No inicia automáticamente: espera al clic de la persona para intentar reproducir con audio.
window.onYouTubeIframeAPIReady=()=>{yt=new YT.Player("youtubePlayer",{width:200,height:200,playerVars:{autoplay:0,playsinline:1,controls:0,rel:0},events:{onReady:()=>{playerReady=true;musicBtn.textContent="▶ Reproducir";if(pendingPlay){pendingPlay=false;yt.playVideo()}},onStateChange:e=>{playerState=e.data;const playing=e.data===YT.PlayerState.PLAYING;musicBtn.textContent=playing?"Ⅱ Pausar":(e.data===YT.PlayerState.BUFFERING?"Cargando canción…":"▶ Reproducir");musicBtn.setAttribute("aria-pressed",String(playing))},onError:()=>{musicBtn.textContent="Abrir en YouTube";musicBtn.onclick=()=>window.open("https://www.youtube.com/watch?v=P4GnrzUACmU","_blank","noopener,noreferrer")}}})};
const api=document.createElement("script");api.src="https://www.youtube.com/iframe_api";api.async=true;document.head.appendChild(api);
musicBtn.addEventListener("click",()=>{if(!playerReady||!yt){pendingPlay=true;musicBtn.textContent="Cargando canción…";return}if(playerState===YT.PlayerState.PLAYING){pendingPlay=false;yt.pauseVideo()}else{pendingPlay=true;yt.playVideo()}});
})();