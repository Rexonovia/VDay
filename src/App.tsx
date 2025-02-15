import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Stars } from 'lucide-react';

function App() {
  const [showContent, setShowContent] = useState(false); // Controls whether to show the main content
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Tracks if music is playing
  const audioRef = useRef<HTMLAudioElement>(null); // Reference to the audio element

  const loveMessages = [
    "You're the love of my life 💖",
    "My heart beats only for you 🫀",
    "Love you to Infinity and Beyond 🚀",
    "You make every day brighter 🌟",
    "I'm forever grateful for you 🙏",
    "Your smile is my favorite sight 😊",
    "I cherish every moment with you ⏳",
    "You're my perfect match 💞",
    "My soul found its home in you 🏡"
  ];

  const [showMessage, setShowMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; sway: number }[]>([]);

  // Photo Carousel State
  const photos = [
    "https://github.com/Rexonovia/VDay/blob/main/public/display/1.jpg?raw=true",
    "https://github.com/Rexonovia/VDay/blob/main/public/display/2.jpg?raw=true",
    "https://github.com/Rexonovia/VDay/blob/main/public/display/4.jpg?raw=true"
  ];
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Start the app (music and content)
  const startApp = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.loop = true; // Loop the music
      audioRef.current.play() // Play the music
        .then(() => {
          setIsMusicPlaying(true);
          setShowContent(true); // Show the main content
        })
        .catch((error) => console.error("Error playing audio:", error)); // Handle errors
    }
  };

  // Handle heart click to show messages
  const handleHeartClick = () => {
    setShowMessage(true);
    setCurrentMessageIndex((prev) => (prev + 1) % loveMessages.length);
  };

  // Floating hearts animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => {
        const newHearts = prevHearts.filter((heart) => heart.y > -100);
        if (newHearts.length < 10) {
          const x = Math.random() * window.innerWidth;
          const sway = Math.random() * 4 - 2; // Random sway between -2 and 2
          newHearts.push({ id: Date.now(), x, y: window.innerHeight, sway });
        }
        return newHearts.map((heart) => ({
          ...heart,
          y: heart.y - 2, // Move upward
          x: heart.x + heart.sway * 0.1, // Sway left or right
        }));
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Photo Carousel Animation
  useEffect(() => {
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000); // Change photo every 5 seconds

    return () => clearInterval(photoInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 flex flex-col items-center justify-center p-8 overflow-hidden relative">
      {/* Background Music */}
      <audio ref={audioRef} src="/music/m1.mp3" />

      {/* Preloader */}
      {!showContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <button
            className="bg-pink-600/80 backdrop-blur-sm px-8 py-4 rounded-full text-white text-2xl font-medium cursor-pointer hover:bg-pink-700/90 transition-colors shadow-lg"
            onClick={startApp}
          >
            Click Me
          </button>
        </div>
      )}

      {/* Photo Display in Top-Left Corner */}
      {showContent && (
        <div className="fixed top-4 left-4 w-40 h-40 rounded-full overflow-hidden border-4 border-white/50 shadow-lg z-50">
          <img
            src={photos[currentPhotoIndex]}
            alt="Carousel Photo"
            className="w-full h-full object-cover animate-fadeInOut"
          />
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
          {/* Floating Hearts Background */}
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute text-white text-opacity-50 pointer-events-none"
              style={{
                left: `${heart.x}px`,
                top: `${heart.y}px`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`, // Random scale
                animation: `sway ${Math.random() * 2 + 3}s infinite alternate ease-in-out`, // Sway animation
              }}
            >
              ❤️
            </div>
          ))}

          <div className="space-y-4">
            <Stars className="w-12 h-12 text-yellow-300 animate-spin-slow mx-auto" />
            <h1 className="text-6xl md:text-7xl font-bold text-white animate-pulse tracking-wide">
              Happy Valentine's Day,
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold text-pink-200 animate-pulse-slow">
              My Love! 💝
            </h2>
          </div>

          <div
            className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
            onClick={handleHeartClick}
          >
            {/* Floating Photos */}
            <div className="absolute -top-32 -left-32 w-52 h-52 animate-float">
              <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl transform rotate-12">
                <img
                  src="https://github.com/Rexonovia/VDay/blob/main/public/photos/IMG_1711.JPG?raw=true"
                  alt="Couple 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -top-32 -right-32 w-52 h-52 animate-float-delay-1">
              <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl transform -rotate-12">
                <img
                  src="https://github.com/Rexonovia/VDay/blob/main/public/photos/IMG-20210623-WA0015.jpg?raw=true"
                  alt="Couple 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-32 -left-32 w-52 h-52 animate-float-delay-2">
              <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl transform -rotate-12">
                <img
                  src="https://github.com/Rexonovia/VDay/blob/main/public/photos/e728a6f7-b31a-477b-af48-5c853549210e.jpg?raw=true"
                  alt="Couple 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-32 -right-32 w-52 h-52 animate-float-delay-3">
              <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl transform rotate-12">
                <img
                  src="https://github.com/Rexonovia/VDay/blob/main/public/photos/ff89a87c-4e45-4313-93f5-42ba67544075.jpg?raw=true"
                  alt="Couple 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="relative">
              <Heart
                className="w-48 h-48 text-red-500 animate-bounce mx-auto filter drop-shadow-lg group-hover:text-red-600 transition-colors duration-300"
                fill="currentColor"
              />
              <Sparkles
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white text-xl font-medium bg-pink-600/80 px-6 py-3 rounded-full backdrop-blur-sm shadow-xl transform -translate-y-32">
                Click me! ✨
              </div>
            </div>
          </div>

          {showMessage && (
            <div className="animate-fadeIn bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
              <p className="text-3xl text-white font-semibold">
                {loveMessages[currentMessageIndex]}
              </p>
            </div>
          )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-white mt-12">
          <div className="p-6 bg-gradient-to-br from-pink-600/30 to-purple-600/30 rounded-2xl
                         hover:scale-105 transition-transform duration-300 backdrop-blur-sm
                         border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6" fill="currentColor" />
              Why I Love You:
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-pink-200">❤️</span> Your kind heart
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-200">😊</span> The way you make even ordinary moments special
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-200">🌟</span> Your amazing personality
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-200">💫</span>
                The joy you bring into my life
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-rose-600/30 to-pink-600/30 rounded-2xl
                         hover:scale-105 transition-transform duration-300 backdrop-blur-sm
                         border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Stars className="w-6 h-6" />
              My Promises:
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-pink-200">🤲</span> Always cherish you
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-200">🌠</span> Support your dreams
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-200">🛡️</span> Be your safe place
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-200">∞</span> Love you endlessly
              </li>
            </ul>
          </div>
        </div>


          <footer className="text-white text-opacity-90 mt-12 space-y-4">
            <p className="text-2xl font-serif italic">
              Forever yours,<br />
              <span className="text-3xl font-semibold not-italic">Vikas</span>
            </p>
            <p className="text-lg animate-pulse">
              ❤️ Click the heart for more love messages! ❤️
            </p>
          </footer>
        </div>
      )}

      {/* CSS for animations */}
      <style>
        {`
          @keyframes sway {
            0% { transform: translateX(-5px); }
            100% { transform: translateX(5px); }
          }
          @keyframes fadeInOut {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }
          .animate-fadeInOut {
            animation: fadeInOut 5s infinite;
          }
        `}
      </style>
    </div>
  );
}

export default App;