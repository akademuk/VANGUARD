/* 
    THEME SWITCHER TOOL (DEVELOPER ONLY)
    Allows client to toggle between 5 distinct themes and fonts.
*/

(function () {
  // --- CONFIGURATION ---
  const themes = [
    {
      id: "vanguard",
      name: "Vanguard (Default)",
      colors: {
        "--bg-color": "#050505",
        "--text-color": "#e0e0e0",
        "--accent-color": "#ff3333",
        "--nav-bg": "rgba(5, 5, 5, 0.8)",
        "--border-color": "rgba(255, 255, 255, 0.1)",
        "--bg-secondary": "#0a0a0a",
        "--text-muted": "rgba(255, 255, 255, 0.1)",
        "--bg-footer": "#020202",
      },
    },
    {
      id: "neon-cyber",
      name: "Neon Cyber",
      colors: {
        "--bg-color": "#0a0a12",
        "--text-color": "#00f3ff",
        "--accent-color": "#ff00ff",
        "--nav-bg": "rgba(10, 10, 18, 0.8)",
        "--border-color": "rgba(0, 243, 255, 0.2)",
        "--bg-secondary": "#0f0f1a",
        "--text-muted": "rgba(0, 243, 255, 0.1)",
        "--bg-footer": "#05050a",
      },
    },
    {
      id: "luxury-gold",
      name: "Luxury Gold",
      colors: {
        "--bg-color": "#1a1a1a",
        "--text-color": "#d4af37",
        "--accent-color": "#ffffff",
        "--nav-bg": "rgba(26, 26, 26, 0.8)",
        "--border-color": "rgba(212, 175, 55, 0.2)",
        "--bg-secondary": "#222222",
        "--text-muted": "rgba(212, 175, 55, 0.1)",
        "--bg-footer": "#111111",
      },
    },
    {
      id: "swiss-minimal",
      name: "Swiss Minimal",
      colors: {
        "--bg-color": "#ffffff",
        "--text-color": "#000000",
        "--accent-color": "#ff3333",
        "--nav-bg": "rgba(255, 255, 255, 0.8)",
        "--border-color": "rgba(0, 0, 0, 0.1)",
        "--bg-secondary": "#f4f4f4",
        "--text-muted": "#444444",
        "--bg-footer": "#f0f0f0",
      },
    },
    {
      id: "dark-nature",
      name: "Dark Nature",
      colors: {
        "--bg-color": "#1c1f1a",
        "--text-color": "#e8f5e9",
        "--accent-color": "#4caf50",
        "--nav-bg": "rgba(28, 31, 26, 0.8)",
        "--border-color": "rgba(232, 245, 233, 0.1)",
        "--bg-secondary": "#252922",
        "--text-muted": "rgba(232, 245, 233, 0.1)",
        "--bg-footer": "#151813",
      },
    },
  ];

  const fonts = [
    {
      id: "default",
      name: "Cinzel + Syncopate",
      vars: {
        "--font-serif": '"Cinzel", serif',
        "--font-sans": '"Syncopate", sans-serif',
      },
    },
    {
      id: "modern",
      name: "Playfair + Montserrat",
      vars: {
        "--font-serif": '"Playfair Display", serif',
        "--font-sans": '"Montserrat", sans-serif',
      },
    },
    {
      id: "tech",
      name: "Orbitron + Roboto Mono",
      vars: {
        "--font-serif": '"Orbitron", sans-serif',
        "--font-sans": '"Roboto Mono", monospace',
      },
    },
    {
      id: "classic",
      name: "Bodoni + Helvetica",
      vars: {
        "--font-serif": '"Bodoni Moda", serif',
        "--font-sans": '"Helvetica Neue", Helvetica, Arial, sans-serif',
      },
    },
    {
      id: "brutalist",
      name: "Anton + Inter",
      vars: {
        "--font-serif": '"Anton", sans-serif',
        "--font-sans": '"Inter", sans-serif',
      },
    },
  ];

  // --- UI CREATION ---
  const container = document.createElement("div");
  container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        z-index: 99999;
        color: #fff;
        font-family: sans-serif;
        width: 250px;
        transform: translateY(calc(100% + 20px));
        transition: transform 0.3s ease;
    `;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🎨 Themes";
  toggleBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 100000;
        padding: 10px 20px;
        background: #fff;
        color: #000;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    `;

  let isOpen = false;
  toggleBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    container.style.transform = isOpen
      ? "translateY(0)"
      : "translateY(calc(100% + 20px))";
  });

  // --- THEME SELECTION ---
  const themeTitle = document.createElement("h3");
  themeTitle.textContent = "Color Theme";
  themeTitle.style.marginBottom = "10px";
  themeTitle.style.fontSize = "14px";
  themeTitle.style.textTransform = "uppercase";
  themeTitle.style.letterSpacing = "1px";
  container.appendChild(themeTitle);

  themes.forEach((theme) => {
    const btn = document.createElement("button");
    btn.textContent = theme.name;
    btn.style.cssText = `
            display: block;
            width: 100%;
            padding: 8px;
            margin-bottom: 5px;
            background: rgba(255,255,255,0.1);
            border: 1px solid transparent;
            color: #fff;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s;
        `;

    btn.addEventListener("mouseenter", () => {
      btn.style.background = "rgba(255,255,255,0.2)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.background = "rgba(255,255,255,0.1)";
    });

    btn.addEventListener("click", () => {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    });

    container.appendChild(btn);
  });

  // --- FONT SELECTION ---
  const fontTitle = document.createElement("h3");
  fontTitle.textContent = "Typography";
  fontTitle.style.margin = "20px 0 10px 0";
  fontTitle.style.fontSize = "14px";
  fontTitle.style.textTransform = "uppercase";
  fontTitle.style.letterSpacing = "1px";
  container.appendChild(fontTitle);

  fonts.forEach((font) => {
    const btn = document.createElement("button");
    btn.textContent = font.name;
    btn.style.cssText = `
            display: block;
            width: 100%;
            padding: 8px;
            margin-bottom: 5px;
            background: rgba(255,255,255,0.1);
            border: 1px solid transparent;
            color: #fff;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s;
        `;

    btn.addEventListener("mouseenter", () => {
      btn.style.background = "rgba(255,255,255,0.2)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.background = "rgba(255,255,255,0.1)";
    });

    btn.addEventListener("click", () => {
      const root = document.documentElement;
      Object.entries(font.vars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Load fonts dynamically if needed (simplified for this demo)
      if (font.id === "modern") {
        loadFont("Playfair Display");
        loadFont("Montserrat");
      } else if (font.id === "tech") {
        loadFont("Orbitron");
        loadFont("Roboto Mono");
      } else if (font.id === "classic") {
        loadFont("Bodoni Moda");
      } else if (font.id === "brutalist") {
        loadFont("Anton");
        loadFont("Inter");
      }
    });

    container.appendChild(btn);
  });

  function loadFont(fontName) {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      / /g,
      "+"
    )}:wght@400;700&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  document.body.appendChild(toggleBtn);
  document.body.appendChild(container);
})();
