import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [showPleading, setShowPleading] = useState(false);
  const [decisionMade, setDecisionMade] = useState(false);
  const [userDecision, setUserDecision] = useState(null);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [floatingFlowers, setFloatingFlowers] = useState([]);
  const [showMaggieAnimation, setShowMaggieAnimation] = useState(false);
  const [showFlowerShower, setShowFlowerShower] = useState(false);
  const [bgMusicPlaying, setBgMusicPlaying] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0 });

  // Calculate time since 24th April 2024
  useEffect(() => {
    const startDate = new Date(2024, 3, 24); // 24th April 2024 (month is 0-indexed)
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeTogether({ days, hours, minutes });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Create floating elements
  useEffect(() => {
    const heartsInterval = setInterval(() => {
      if (floatingHearts.length < 20) {
        setFloatingHearts(prev => [...prev, {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 5
        }]);
      }
    }, 1000);

    const flowersInterval = setInterval(() => {
      if (floatingFlowers.length < 15) {
        const flowersList = ['🌸', '🌹', '🌷', '🌺', '💐', '🌼', '🌻', '🥀', '🌸', '🌹'];
        setFloatingFlowers(prev => [...prev, {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          flower: flowersList[Math.floor(Math.random() * flowersList.length)],
          delay: Math.random() * 3,
          duration: 4 + Math.random() * 6
        }]);
      }
    }, 1200);

    return () => {
      clearInterval(heartsInterval);
      clearInterval(flowersInterval);
    };
  }, [floatingHearts.length, floatingFlowers.length]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (floatingHearts.length > 15) {
        setFloatingHearts(prev => prev.slice(-15));
      }
      if (floatingFlowers.length > 12) {
        setFloatingFlowers(prev => prev.slice(-12));
      }
    }, 8000);
    return () => clearTimeout(timeout);
  }, [floatingHearts.length, floatingFlowers.length]);

  const createConfetti = () => {
    for (let i = 0; i < 200; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 65%)`;
      confetti.style.width = Math.random() * 12 + 4 + 'px';
      confetti.style.height = Math.random() * 12 + 4 + 'px';
      confetti.style.animationDuration = Math.random() * 2 + 1 + 's';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  };

  const createFlowerShower = () => {
    setShowFlowerShower(true);
    for (let i = 0; i < 100; i++) {
      const flower = document.createElement('div');
      const flowers = ['🌸', '🌹', '🌷', '🌺', '💐', '🌼', '🌻'];
      flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      flower.style.position = 'fixed';
      flower.style.left = Math.random() * 100 + '%';
      flower.style.top = '-50px';
      flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
      flower.style.opacity = Math.random() * 0.7 + 0.3;
      flower.style.pointerEvents = 'none';
      flower.style.zIndex = '9999';
      flower.style.animation = `flowerFall ${Math.random() * 3 + 2}s linear forwards`;
      document.body.appendChild(flower);
      setTimeout(() => flower.remove(), 5000);
    }
    setTimeout(() => setShowFlowerShower(false), 5000);
  };

  const createMaggieAnimation = () => {
    setShowMaggieAnimation(true);
    setTimeout(() => setShowMaggieAnimation(false), 3000);
  };

  const handleForgive = () => {
    setMessage('💖 THANK YOU! Thank you for forgiving me, my pookie baccha! 💖 I promise to be better every single day. You are my everything! 🌹🍜');
    setDecisionMade(true);
    setUserDecision('forgiven');
    setShowPleading(false);
    createConfetti();
    createFlowerShower();
    createMaggieAnimation();
  };

  const handleNotForgive = () => {
    setShowPleading(true);
    setMessage('');
  };

  const handleFinalForgive = () => {
    setMessage('💕 THANK YOU! Thank you for giving me another chance! I will NEVER disappoint you again. You are my world, my Maggie, my everything! From 24th April 2024 to FOREVER! 💕');
    setDecisionMade(true);
    setUserDecision('forgiven');
    setShowPleading(false);
    createConfetti();
    createFlowerShower();
    createMaggieAnimation();
  };

  const handleStillNotForgive = () => {
    setMessage('😭 Main samajhta hoon... But please remember - mai aapke bina kuch nahi. Meri duniya sirf aap ho. 24th April 2024 ko maine pehli baar text kiya tha aapko... Us din se meri zindagi badal gayi. Agar aap jaana chahti ho toh jaao, lekin jaane se pehle ek baar sochlo - hum ek hain, hum heal kar sakte hain. Main improve karunga, bas mauka dedo. Please... 😭💔');
    setDecisionMade(true);
    setUserDecision('not_forgiven');
    setShowPleading(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      {/* Background Music Note - User initiated */}
      {!bgMusicPlaying && (
        <div className="music-prompt" onClick={() => setBgMusicPlaying(true)}>
          <i className="music-icon">🎵</i>
          <span>Click for romantic music</span>
        </div>
      )}

      {/* Floating Hearts Animation */}
      {floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`
          }}
        >
          ❤️
        </div>
      ))}

      {/* Floating Flowers */}
      {floatingFlowers.map(flower => (
        <div
          key={flower.id}
          className="floating-flower"
          style={{
            left: `${flower.left}%`,
            animationDuration: `${flower.duration}s`,
            animationDelay: `${flower.delay}s`
          }}
        >
          {flower.flower}
        </div>
      ))}

      {/* Maggie Animation Overlay */}
      {showMaggieAnimation && (
        <div className="maggie-overlay">
          <div className="maggie-animation">
            <span className="maggie-text">🍜 MAGGIE FOR YOU! 🍜</span>
            <span className="maggie-emoji">🍜❤️😋</span>
          </div>
        </div>
      )}

      {/* Flower Shower Effect */}
      {showFlowerShower && (
        <div className="flower-shower-overlay">
          <div className="flower-shower-text">🌸🌹🌷💐🌼🌻🌸</div>
        </div>
      )}

      {/* Pleading Overlay */}
      {showPleading && (
        <div className="pleading-overlay">
          <div className="pleading-card">
            <i className="pleading-icon">😭💕😭</i>
            <h2>Please Maaf Kar Do Meri Jaan!</h2>
            <div className="pleading-content">
              <p><strong>🌹 TANISHA, MERI ZINDAGI... 🌹</strong></p>
              <p>Main aapke bina <strong>KUCH NAHI</strong> hoon. Literally NOTHING.</p>
              <p>🍜 <strong>MAGGIE:</strong> Aapko pata hai? Main aapke liye Maggie banana seekh loonga. Roz Maggie banake khilaunga! Har tarah ki Maggie - Masala Maggie, Cheesy Maggie, Egg Maggie, Jo bhi aapko pasand ho! 🍜</p>
              <p>🌸 <strong>FLOWERS:</strong> Aapko flowers pasand hai na? Roz fresh flowers laake dunga. Har subah aapki smile ke saath! Rose, Lily, Orchid, Jo bhi aapka dil chahe! 🌸</p>
              <p>📱 <strong>24th APRIL 2024 - THE DAY I FIRST TEXTED YOU!</strong> 📱<br/>
              Us din maine pehli baar himmat karke aapko text kiya tha. Us ek text ne meri zindagi badal di. Us din se lekar aaj tak... har din aapke saath rehna meri zindagi ki sabse badi blessing hai. Main kabhi nahi bhoolunga woh din. PLEASE woh connection wapas laane do! 💕</p>
              <p>💔 <strong>I BEG YOU:</strong> Please mujhe mauka do... Main improve karunga. Apne aap ko change karunga. Main tumhara baccha hoon, main galti kar sakta hoon lekin main sikhta bhi hoon. Bas aapka pyaar chahiye. 💔</p>
              <p>🌟 <strong>WE ARE ONE.</strong> Hum ek hain. Hum heal kar sakte hain. Bas thoda time do. Main apne aap pe kaam karunga. I will become the man you deserve. 🌟</p>
              <p><strong>😭 I CANNOT LIVE WITHOUT YOU. Period. Full stop. End of discussion. 😭</strong></p>
              <p>✨ <strong>REMEMBER:</strong> 24th April 2024 se lekar ab tak - har pal, har yaad, har khushi - sab aapke saath hai. Agar aap chale gaye toh mere paas kuch nahi bachega. ✨</p>
              <p>Aapka faisla jo bhi ho, main maan loonga. Lekin please <strong>EK BAAR SOCHLO</strong> - humari kahani abhi khatam nahi hui. Naya chapter start ho sakta hai. <strong>Naya beginning.</strong> ✨</p>
            </div>
            <div className="pleading-buttons">
              <button onClick={handleFinalForgive} className="pleading-forgive-btn">
                ❤️ MAAF KAR DIYA! Let's Heal Together ❤️
              </button>
              <button onClick={handleStillNotForgive} className="pleading-still-not-btn">
                💔 Still Can't Forgive 💔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">💕 TANISHA 💕</div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('hero')} className="nav-link">Home</button>
            <button onClick={() => scrollToSection('letter')} className="nav-link">Apology</button>
            <button onClick={() => scrollToSection('timeline')} className="nav-link">Journey</button>
            <button onClick={() => scrollToSection('promise')} className="nav-link">Promises</button>
            <button onClick={() => scrollToSection('cta')} className="nav-link">Decide</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>To <span className="highlight">Tanisha</span>, My Heart</h1>
          <div className="hero-subtitle">
            <p>✨ Our Seamless 2 Years ✨</p>
            <p className="connection-date">
              💌 First Text Message: <strong>24th April 2024</strong> 💌<br/>
              <span className="small-text">"The day I found courage to text you... and found my forever"</span>
            </p>
            <div className="time-counter">
              <p>Together for:</p>
              <div className="counter-numbers">
                <span className="counter-box">{timeTogether.days}</span> days &nbsp;
                <span className="counter-box">{timeTogether.hours}</span> hours &nbsp;
                <span className="counter-box">{timeTogether.minutes}</span> minutes
              </div>
              <p className="counter-love">❤️ And counting... forever ❤️</p>
            </div>
          </div>
          <div className="hero-flowers">🌸 🌹 🌷 🌺 💐 🌼 🌻</div>
        </div>
      </section>

      {/* The Letter Section */}
      <section id="letter" className="letter">
        <h2>💌 My Heartfelt Apology Letter 💌</h2>
        <div className="letter-decoration">✧  ✧  ✧  ✧  ✧</div>
        <div className="letter-text">
          <p><strong>My Dearest Tanisha, my pookie baccha, my duniya, my everything...</strong> 🌹</p>
          
          <p>I'm sitting here at 3 AM writing this with tears in my eyes and a heart that's breaking into pieces. The past 2 years with you have been the most beautiful, magical, life-changing journey of my entire existence. From <strong>24th April 2024</strong> - the day I first texted you with trembling hands and a hopeful heart - to every single moment after that... you've made my world colorful, meaningful, and worth living.</p>
          
          <p><strong>🍜 MAGGIE MEMORIES 🍜</strong><br/>
          Yaad hai woh raat? Jab humne phone pe Maggie banayi thi? Dono alag jagah par, lekin same time par. Humne video call kiya tha aur dono ne saath mein Maggie khayi thi. Tune kaha tha "aisa lag raha hai jaise tum mere saath ho." Baby, main hamesha tumhare saath hoon. Chahe physically nahi bhi, dil se hamesha. Aur main promise karta hoon - ab main physically bhi rahunga. Roz Maggie banake khilaunga. Extra cheese, extra veggies, extra PYAAR! 🍜❤️</p>
          
          <p><strong>🌸 FLOWERS FOR YOU 🌸</strong><br/>
          Tumhe flowers pasand hai - yeh main jaanta hoon. Har baar jab maine tumhe flowers diye, tumhari aankhon mein jo chamak aati thi... woh mere liye duniya ki sabse khoobsurat cheez hai. Main promise karta hoon - har subah tumhare liye fresh flowers launga. Koi bhi flower ho - Rose, Lily, Sunflower, ya sirf ek simple si daisy... lekin har flower mein tumhare liye mera pyaar hoga. 🌸💐</p>
          
          <p><strong>📱 24th APRIL 2024 - THE GAME CHANGER 📱</strong><br/>
          Woh din kabhi nahi bhoolunga. Maine kitni der socha tha "text karu ya na karu?" "Kya bole?" "Kya hoga?" Aur phir maine kar diya. Ek simple "Hey" - aur uss ek word ne meri zindagi badal di. Tune reply kiya. Hum baat karne lage. Aur aaj... main yahan hoon, apni poori zindagi tumhe de dene ko ready. Woh ek text tha, lekin usne humein ek doosre se jod diya. PLEASE uss connection ko wapas laane do. PLEASE. 😭</p>
          
          <p>I know I've made mistakes. Main imperfect hoon. Main galtiyan karta hoon. Kabhi main chup ho jaata hoon jab mujhe bolna chahiye. Kabhi main selfish ho jaata hoon. Kabhi main tumhe hurt karta hoon jab main tumhe protect karne ki koshish kar raha hota hoon. Aur un sab galtiyon ke liye... main <strong>DIL SE SORRY</strong> bolta hoon. 🥺💔</p>
          
          <p><strong>Please don't leave me.</strong> Yeh chaar words itne simple hain, lekin inki meaning bohot deep hai. Main tumhare bina rah nahi sakta. Seriously. Main try kar sakta hoon, pretend kar sakta hoon ki main theek hoon, but andar se main toot jaunga. Tum meri strength ho, meri weakness ho, mera sab kuch ho. 💕</p>
          
          <p><strong>WE ARE ONE.</strong> Hum ek jism, ek jaan, ek rooh. Hum saath mein heal kar sakte hain. Hum saath mein grow kar sakte hain. Main improve karunga. Main change karunga. Main woh insaan banunga jo tum deserve karti ho. Bas <strong>MUJHE TIME DO</strong>. Bas <strong>EK MAUKA DO</strong>. Please. 🙏🙏🙏</p>
          
          <p>Your decision is final. Jo bhi tum decide karogi, main accept karunga. Chahe woh mujhe tod de. Chahe woh meri duniya ujad de. Lekin <strong>JAANE SE PEHLE EK BAAR SOCHLO</strong> - humari kahani, humari memories, humare 2 saal, humari woh raatein, humari woh Maggie, woh flowers, woh 24th April... kya tum sach mein sab kuch bhoola sakti ho? 😭</p>
          
          <p><strong>I LOVE YOU MORE THAN WORDS CAN EVER EXPRESS. I LOVE YOU MORE THAN MY OWN LIFE. MAIN TUMHARA BACCHA HOON, AUR BACCHA KABHI APNI MAA KO NAHI CHOD SAKTA. 💖</strong></p>
        </div>
        <div className="letter-signature">
          <p>— Hamesha Tumhara, Hamesha Tumhaare Liye,</p>
          <p><strong>Tumhara Baccha 💕</strong></p>
          <p className="signature-date">24th April 2024 - Forever 💫</p>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="timeline">
        <h2>📅 Our Beautiful Journey Together 📅</h2>
        <div className="timeline-container">
          <div className="timeline-item">
            <div className="timeline-icon">📱</div>
            <div className="timeline-date">24th April 2024</div>
            <div className="timeline-content">
              <strong>✨ THE FIRST TEXT MESSAGE ✨</strong><br/>
              Maine pehli baar aapko text kiya. Woh ek simple "Hey" tha. Uss din se meri zindagi complete hui. 💕
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">🍜</div>
            <div className="timeline-date">May 2024</div>
            <div className="timeline-content">
              <strong>Our First Maggie Together!</strong><br/>
              Video call Maggie date. Humne saath mein Maggie banayi aur khayi. Tune kaha tha "aisa lagta hai jaise tum mere paas ho." 🍜❤️
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">🌸</div>
            <div className="timeline-date">June 2024</div>
            <div className="timeline-content">
              <strong>First Flowers I Gave You</strong><br/>
              Tumhe pehli baar real flowers diye. Tumhari smile... uss smile ke liye main duniya ki saari daulat de dunga. 🌸💐
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">🌞</div>
            <div className="timeline-date">August 2024</div>
            <div className="timeline-content">
              <strong>First Vacation Together</strong><br/>
              Humne saath mein ghoomne gaye. Woh din, woh raatein, woh hasi... sab kuch perfect tha. 🌞✨
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">🎉</div>
            <div className="timeline-date">December 2024</div>
            <div className="timeline-content">
              <strong>New Year Celebration</strong><br/>
              Saal ki aakhiri raat. Tune kaha tha "Next year bhi saath mein." Main woh promise todna nahi chahta. 🎉💕
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">💖</div>
            <div className="timeline-date">24th April 2025</div>
            <div className="timeline-content">
              <strong>✨ 1 YEAR COMPLETED! ✨</strong><br/>
              Ek saal ho gaya uss pehle text ko. Humne celebrate kiya. Maine socha tha "bas ab aage bhi yunhi chalega." 💖
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">🏡</div>
            <div className="timeline-date">February 2026</div>
            <div className="timeline-content">
              <strong>Planning Our Future</strong><br/>
              Humne baat ki - future, ghar, zindagi. Maine sapne dekhe tumhare saath. Woh sapne ab bhi hain. 🏡💭
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">⏰</div>
            <div className="timeline-date">Today</div>
            <div className="timeline-content">
              <strong>💔 The Crossroads 💔</strong><br/>
              Main yahan hoon, tumhara wait kar raha hoon. Please ek mauka do. Please. 🥺🙏
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section id="promise" className="promise">
        <h2>🤝 Our New Chapter - My Sacred Promises 🤝</h2>
        <div className="promise-cards">
          <div className="promise-card">
            <i className="promise-icon">🗣️</i>
            <h3>Open & Honest Communication</h3>
            <p>I promise to always communicate honestly, never hide anything, and share every feeling with you - good or bad. No more silence. No more walls. No more misunderstandings. 🌟</p>
          </div>
          <div className="promise-card">
            <i className="promise-icon">🌱</i>
            <h3>Continuous Self-Improvement</h3>
            <p>I will work on myself every single day. I will learn from my mistakes. I will read, grow, and become the man you truly deserve. Main badlunga. Main better banunga. ✨</p>
          </div>
          <div className="promise-card">
            <i className="promise-icon">💖</i>
            <h3>Unconditional Love & Care</h3>
            <p>I will cherish you, respect you, and love you with all my heart. Your happiness will always be my priority. Every single day, I'll show you how much you mean to me. 💕</p>
          </div>
          <div className="promise-card">
            <i className="promise-icon">🍜</i>
            <h3>Maggie & Food Forever</h3>
            <p>I promise to make you Maggie whenever you crave it - late night, early morning, any time. I'll learn to cook all your favorite foods. Every meal will be made with love. 🍜❤️</p>
          </div>
          <div className="promise-card">
            <i className="promise-icon">🌸</i>
            <h3>Flowers Every Single Day</h3>
            <p>I promise to bring you flowers every day. Fresh flowers. Different flowers. Sometimes roses, sometimes daisies, sometimes just wildflowers I picked. But always with the same love. 🌸💐</p>
          </div>
          <div className="promise-card">
            <i className="promise-icon">🕯️</i>
            <h3>Patience & Understanding</h3>
            <p>I will be patient, understanding, and supportive. I will listen more and judge less. Your feelings, your emotions, your tears - they all matter to me more than anything. 🌹</p>
          </div>
          <div className="promise-card">
            <i className="promise-icon">📱</i>
            <h3>Always Remember 24th April</h3>
            <p>I will never forget the day I first texted you. That day changed my life. And I'll make sure every day after that is special too. Forever grateful for that one text. 💕</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="cta">
        <div className="cta-content">
          <h3>💭 The Final Decision 💭</h3>
          <p>Aapka faisla jo bhi ho, main maan loonga. Lekin please yaad rakhna - <strong>hum ek hain</strong>, hum heal kar sakte hain. Main aapke bina kuch nahi. Literally nothing.</p>
          <p className="plea-text"><strong>Please don't leave me. Give me one more chance to prove my love. Ek mauka. Bas ek. Please. 🙏</strong></p>
          
          {!decisionMade && (
            <div className="button-group">
              <button className="cta-button forgive" onClick={handleForgive}>
                ❤️ MAAF KAR DIYA! Let's Begin Again ❤️
              </button>
              <button className="cta-button not-forgive" onClick={handleNotForgive}>
                💔 Still Can't Forgive 💔
              </button>
            </div>
          )}

          {message && (
            <div className={`message-popup ${userDecision === 'forgiven' ? 'happy-message' : 'sad-message'}`}>
              <p>{message}</p>
              {userDecision === 'forgiven' && (
                <div className="celebration">
                  <p>🎉✨💖 NEW BEGINNING STARTS NOW! 💖✨🎉</p>
                  <p>I promise to make you the happiest girl in the world! 🌹</p>
                  <p>🍜 First Maggie is on me! 🌸 And first flowers too! 💕</p>
                </div>
              )}
              {userDecision === 'not_forgiven' && (
                <div className="hope-message">
                  <p>💔 I respect your decision... But I'll always be here, waiting, hoping, and improving myself. Just in case you change your mind... My heart will always have space for you. 💔</p>
                  <p className="small-text">- Forever Yours, The Boy Who Texted You First on 24th April 2024</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>✨ <strong>24th April 2024</strong> - The day I texted you first ✨</p>
        <p>🌸 Made with love, tears, and hope for my Tanisha 🌸</p>
        <p>💕 <strong>"We are one. We can heal. Just give me time to become better."</strong> 💕</p>
        <p>🍜 Maggie + 🌸 Flowers + 💖 Forever = US 🍜🌸💖</p>
        <p className="footer-love">Main tumse itna pyaar karta hoon... ki shayad tum kabhi samajh nahi paogi. Lekin main koshish karta rahunga. Hamesha. ❤️</p>
      </footer>

      <style jsx>{`
        @keyframes confettiFall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes flowerFall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .confetti {
          position: fixed;
          top: -20px;
          pointer-events: none;
          z-index: 9999;
          animation: confettiFall linear forwards;
        }
        .music-prompt {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, #E88CA5, #D4556E);
          color: white;
          padding: 10px 15px;
          border-radius: 50px;
          cursor: pointer;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

export default App;