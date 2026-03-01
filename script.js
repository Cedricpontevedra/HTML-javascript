const colorPicker = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");
const moodText = document.getElementById("moodText");
const previewCard = document.getElementById("previewCard");

let gradientMode = false;

// Detect Mood Based on Color
function detectMood(hex) {
    const r = parseInt(hex.substr(1,2), 16);
    const g = parseInt(hex.substr(3,2), 16);
    const b = parseInt(hex.substr(5,2), 16);

    if (r > 200 && g < 100 && b < 100) return "🔥 Energetic";
    if (r < 100 && g > 150 && b < 100) return "🌿 Fresh";
    if (r < 100 && g < 100 && b > 150) return "🌊 Calm";
    if (r > 200 && g > 150 && b < 100) return "🌞 Happy";
    if (r > 150 && b > 150) return "💜 Creative";
    return "✨ Balanced";
}

// Auto adjust text color for readability
function setTextContrast(hex) {
    const r = parseInt(hex.substr(1,2), 16);
    const g = parseInt(hex.substr(3,2), 16);
    const b = parseInt(hex.substr(5,2), 16);

    const brightness = (r*299 + g*587 + b*114) / 1000;
    document.body.style.color = brightness > 125 ? "#000" : "#fff";
}

// Apply color
colorPicker.addEventListener("input", function() {
    applyColor(this.value);
});

function applyColor(color) {
    if (gradientMode) {
        const secondColor = randomColor();
        document.body.style.background = 
            `linear-gradient(135deg, ${color}, ${secondColor})`;
    } else {
        document.body.style.background = color;
    }

    colorCode.textContent = color.toUpperCase();
    moodText.textContent = "Mood: " + detectMood(color);
    previewCard.style.background = color;
    setTextContrast(color);
}

// Random Color Generator
function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
}

function setRandomVibe() {
    const color = randomColor();
    colorPicker.value = color;
    applyColor(color);
}

// Toggle Gradient Mode
function toggleGradient() {
    gradientMode = !gradientMode;
    applyColor(colorPicker.value);
}

// Copy Color to Clipboard
function copyColor() {
    navigator.clipboard.writeText(colorCode.textContent);
    alert("Color copied: " + colorCode.textContent);
}

// Initialize
applyColor("#6a5acd");