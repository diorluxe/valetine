const intro = document.getElementById("intro");
const mainPage = document.getElementById("mainPage");
const yesPage = document.getElementById("yesPage");
const noPage = document.getElementById("noPage");
const backBtn = document.getElementById("backBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const music = document.getElementById("bgMusic");
const flowerTrigger = document.getElementById("flowerTrigger");
const loveLetter = document.getElementById("loveLetter");
const heartsContainer = document.getElementById("hearts");
const confettiCanvas = document.getElementById("confettiCanvas");

/* Intro fade */
setTimeout(()=>{
  intro.classList.add("hidden");
  mainPage.classList.remove("hidden");
  music.volume = 0.3;
  music.play().catch(()=>{});
},3000);

/* Button interactions */
yesBtn.onclick = ()=>{
  mainPage.classList.add("hidden");
  yesPage.classList.remove("hidden");
  triggerConfetti();
};

noBtn.onclick = ()=>{
  mainPage.classList.add("hidden");
  noPage.classList.remove("hidden");
};

backBtn.onclick = ()=>{
  noPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
};

flowerTrigger.onclick = ()=>{
  loveLetter.classList.remove("hidden");
};

/* Floating Hearts */
setInterval(()=>{
  const heart=document.createElement("span");
  heart.innerHTML="💖";
  heart.style.left=Math.random()*100+"vw";
  heart.style.fontSize=(Math.random()*20+15)+"px";
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
},500);

/* Confetti */
function triggerConfetti(){
  const ctx=confettiCanvas.getContext('2d');
  confettiCanvas.width=window.innerWidth;
  confettiCanvas.height=window.innerHeight;
  const particles=[];
  for(let i=0;i<100;i++){
    particles.push({
      x:Math.random()*confettiCanvas.width,
      y:Math.random()*confettiCanvas.height,
      vx:(Math.random()-0.5)*10,
      vy:Math.random()*5+5,
      color:`hsl(${Math.random()*360},100%,70%)`,
      size:Math.random()*5+2
    });
  }
  function animate(){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    particles.forEach((p,i)=>{
      p.x+=p.vx;
      p.y+=p.vy;
      p.vy+=0.1;
      if(p.y>confettiCanvas.height) particles.splice(i,1);
      else { ctx.fillStyle=p.color; ctx.fillRect(p.x,p.y,p.size,p.size);}
    });
    if(particles.length>0) requestAnimationFrame(animate);
  }
  animate();
}
/* Play Background Music Smoothly */
function playMusic() {
    const music = document.getElementById("bgMusic");
    music.volume = 0; // start silent
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Gradually increase volume for soft fade-in
            let vol = 0;
            const fadeIn = setInterval(() => {
                if (vol < 0.3) {
                    vol += 0.01;
                    music.volume = vol;
                } else {
                    clearInterval(fadeIn);
                }
            }, 100); // fade in over ~3 seconds
        }).catch(() => {
            // Autoplay blocked, play on first interaction
            document.body.addEventListener('click', () => music.play(), {once: true});
        });
    }
}

/* Intro fade to main page */
setTimeout(() => {
  intro.classList.add("hidden");
  mainPage.classList.remove("hidden");
  playMusic(); // call music play on intro end
}, 3000);
