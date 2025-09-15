// Quiz Data
const OWM_API_KEY = "61402c232e755c0a6e1e414e1c0280b5"; 

const quizData = [
  {
    question: "What is the first thing you should do during an earthquake?",
    options: ["Run outside immediately", "Drop, Cover, and Hold On", "Stand in a doorway", "Call for help"],
    correct: 1,
  },
  {
    question: "How much water should you store per person per day for emergencies?",
    options: ["1/2 gallon", "1 gallon", "2 gallons", "3 gallons"],
    correct: 1,
  },
  {
    question: "What is the emergency number for fire services in India?",
    options: ["100", "101", "102", "108"],
    correct: 1,
  },
  {
    question: "During a flood, you should:",
    options: [
      "Drive through flooded roads",
      "Move to higher ground",
      "Stay in the basement",
      "Wait for rescue in low areas",
    ],
    correct: 1,
  },
  {
    question: "Which item is most important in an emergency kit?",
    options: ["Games and toys", "Water and food", "Expensive jewelry", "Books"],
    correct: 1,
  },
  {
    question: "If your clothes catch fire, you should:",
    options: ["Run to get help", "Stop, Drop, and Roll", "Jump in water", "Remove clothes quickly"],
    correct: 1,
  },
  {
    question: "How long can a person survive without water?",
    options: ["1 day", "3 days", "1 week", "2 weeks"],
    correct: 1,
  },
  {
    question: "What should you do if you smell gas in your home?",
    options: [
      "Turn on lights to see better",
      "Use a phone inside the house",
      "Leave immediately and call from outside",
      "Open all windows",
    ],
    correct: 2,
  },
  {
    question: "The safest place during a tornado is:",
    options: ["Near windows", "In a car", "Basement or interior room", "On the roof"],
    correct: 2,
  },
  {
    question: "How often should you check your emergency kit supplies?",
    options: ["Once a year", "Every 6 months", "Every month", "Never"],
    correct: 1,
  },
  {
    question: "What does the 'Triangle of Life' refer to in earthquake safety?",
    options: ["A rescue formation", "Safe spaces next to furniture", "Emergency contact system", "First aid technique"],
    correct: 1,
  },
  {
    question: "Which of these is NOT a sign of an approaching tsunami?",
    options: ["Ocean receding rapidly", "Loud roaring sound", "Ground shaking", "Heavy rainfall"],
    correct: 3,
  },
  {
    question: "In case of a chemical spill, you should:",
    options: [
      "Clean it up immediately",
      "Evacuate and call authorities",
      "Cover it with water",
      "Ignore if it's small",
    ],
    correct: 1,
  },
  {
    question: "The best way to stay informed during emergencies is:",
    options: ["Social media only", "Battery-powered radio", "Asking neighbors", "Guessing"],
    correct: 1,
  },
  {
    question: "How many days of food should an emergency kit contain?",
    options: ["1 day", "3 days", "1 week", "1 month"],
    correct: 1,
  },
  {
    question: "What should you do if trapped under debris?",
    options: ["Shout continuously", "Tap on pipes or walls", "Try to dig out", "Sleep and wait"],
    correct: 1,
  },
  {
    question: "The most important thing during any emergency is to:",
    options: ["Save your belongings", "Stay calm", "Run fast", "Call everyone you know"],
    correct: 1,
  },
  {
    question: "Which natural disaster is most common in coastal areas?",
    options: ["Earthquake", "Tornado", "Cyclone/Hurricane", "Avalanche"],
    correct: 2,
  },
  {
    question: "What should you include in your family emergency plan?",
    options: ["Meeting places and contact info", "Favorite restaurants", "Shopping lists", "Entertainment options"],
    correct: 0,
  },
  {
    question: "The best time to prepare for disasters is:",
    options: ["During the disaster", "After the disaster", "Before the disaster", "Never"],
    correct: 2,
  },
]

// Quiz State
let currentQuestion = 0
let score = 0
let selectedAnswer = null
let quizStarted = false

function startQuiz() {
  const modal = document.getElementById("quiz-modal")
  modal.style.display = "block"
  currentQuestion = 0
  score = 0
  selectedAnswer = null
  quizStarted = true

  document.getElementById("result-container").style.display = "none"
  document.getElementById("question-container").style.display = "block"

  showQuestion()
  updateProgress()
  updateScore()
}

function showQuestion() {
  const question = quizData[currentQuestion]
  document.getElementById("question-text").textContent = question.question
  document.getElementById("question-counter").textContent = `Question ${currentQuestion + 1} of ${quizData.length}`

  const optionsContainer = document.getElementById("options-container")
  optionsContainer.innerHTML = ""

  question.options.forEach((option, index) => {
    const button = document.createElement("button")
    button.className = "option-button"
    button.textContent = option
    button.onclick = () => selectAnswer(index)
    optionsContainer.appendChild(button)
  })

  selectedAnswer = null
  updateNavigationButtons()
}

function selectAnswer(answerIndex) {
  selectedAnswer = answerIndex

  // Remove previous selections
  document.querySelectorAll(".option-button").forEach((btn) => {
    btn.classList.remove("selected")
  })

  // Mark selected answer
  document.querySelectorAll(".option-button")[answerIndex].classList.add("selected")

  updateNavigationButtons()
}

function nextQuestion() {
  if (selectedAnswer === null) return

  // Check if answer is correct
  if (selectedAnswer === quizData[currentQuestion].correct) {
    score++
  }

  // Show correct/incorrect feedback
  const buttons = document.querySelectorAll(".option-button")
  buttons[quizData[currentQuestion].correct].classList.add("correct")
  if (selectedAnswer !== quizData[currentQuestion].correct) {
    buttons[selectedAnswer].classList.add("incorrect")
  }

  // Wait a moment to show feedback, then proceed
  setTimeout(() => {
    currentQuestion++

    if (currentQuestion >= quizData.length) {
      showResults()
    } else {
      showQuestion()
      updateProgress()
    }

    updateScore()
  }, 1500)
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--
    showQuestion()
    updateProgress()
  }
}

function updateProgress() {
  const progress = (currentQuestion / quizData.length) * 100
  document.getElementById("progress-fill").style.width = progress + "%"
}

function updateScore() {
  document.getElementById("current-score").textContent = score
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")

  prevBtn.disabled = currentQuestion === 0
  nextBtn.disabled = selectedAnswer === null

  if (currentQuestion === quizData.length - 1) {
    nextBtn.textContent = "Finish Quiz"
  } else {
    nextBtn.textContent = "Next →"
  }
}

function showResults() {
  document.getElementById("question-container").style.display = "none"
  document.getElementById("result-container").style.display = "block"

  const percentage = Math.round((score / quizData.length) * 100)
  document.getElementById("final-score").textContent = score

  let title, message, icon

  if (percentage >= 90) {
    title = "🏆 Safety Hero!"
    message = "Outstanding! You're a true disaster preparedness champion!"
    icon = "🏆"
  } else if (percentage >= 75) {
    title = "🌟 Safety Star!"
    message = "Great job! You have excellent safety knowledge!"
    icon = "⭐"
  } else if (percentage >= 60) {
    title = "🎯 Safety Learner!"
    message = "Good work! Keep learning to become a safety expert!"
    icon = "📚"
  } else {
    title = "🌱 Safety Beginner!"
    message = "Keep practicing! Every expert was once a beginner!"
    icon = "🌱"
  }

  document.getElementById("result-title").textContent = title
  document.getElementById("result-message").textContent = message
  document.querySelector(".result-icon").textContent = icon

  // Hide navigation buttons
  document.querySelector(".quiz-footer").style.display = "none"
}

function restartQuiz() {
  currentQuestion = 0
  score = 0
  selectedAnswer = null

  document.getElementById("result-container").style.display = "none"
  document.getElementById("question-container").style.display = "block"
  document.querySelector(".quiz-footer").style.display = "flex"

  showQuestion()
  updateProgress()
  updateScore()
}

function closeQuiz() {
  document.getElementById("quiz-modal").style.display = "none"
  quizStarted = false
}

// Video play functionality
function playVideo(videoType) {
  const videoTitles = {
    earthquake: "🏔️ Earthquake Safety for Kids",
    fire: "🔥 Fire Safety Heroes",
    flood: "🌊 Flood Preparedness Guide",
    cyclone: "🌪️ Cyclone Safety Tips",
    kit: "🎒 Building Emergency Kit",
    numbers: "📞 Emergency Numbers Song",
  }

  const title = videoTitles[videoType] || "Safety Video"
  alert(
    `🎬 Now Playing: ${title}\n\n📺 This would open the educational video player!\n\nLearn important safety tips through fun and engaging videos! 🌟`,
  )

  // Here you would typically open a video player or redirect to video content
  console.log(`Playing video: ${videoType}`)
}

// Emergency contact quick dial (simulation)
function callEmergency(number) {
  alert(
    `📞 Emergency Call Simulation\n\nCalling: ${number}\n\n⚠️ This is a demo. In real emergencies, dial the actual number!\n\n🚨 Remember: Stay calm and provide clear information about your location and the emergency.`,
  )
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.9)"
    }
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all sections for animation
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })

  // Emergency kit checklist functionality
  const checkboxes = document.querySelectorAll('#emergency-kit input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const label = this.nextElementSibling
      if (this.checked) {
        label.style.color = "#10b981"
        label.style.fontWeight = "700"
        this.parentElement.parentElement.style.background =
          "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.2))"
      } else {
        label.style.color = ""
        label.style.fontWeight = ""
        this.parentElement.parentElement.style.background = ""
      }
    })
  })

  // Add hover effects to cards
  const cards = document.querySelectorAll(".kit-item, .learning-card, .video-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Progress bar animation
  const progressBars = document.querySelectorAll(".progress-fill")
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.style.width
          progressBar.style.width = "0%"
          setTimeout(() => {
            progressBar.style.width = width
          }, 200)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })

  // Close modal when clicking outside
  window.onclick = (event) => {
    const modal = document.getElementById("quiz-modal")
    if (event.target === modal) {
      closeQuiz()
    }
  }

  // Keyboard navigation for quiz
  document.addEventListener("keydown", (event) => {
    if (!quizStarted) return

    if (event.key === "Escape") {
      closeQuiz()
    } else if (event.key === "Enter" && selectedAnswer !== null) {
      nextQuestion()
    } else if (event.key >= "1" && event.key <= "4") {
      const optionIndex = Number.parseInt(event.key) - 1
      if (optionIndex < document.querySelectorAll(".option-button").length) {
        selectAnswer(optionIndex)
      }
    }
  })

  // Add some interactive effects
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.5)"
      ripple.style.transform = "scale(0)"
      ripple.style.animation = "ripple 0.6s linear"
      ripple.style.pointerEvents = "none"

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add CSS for ripple animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  // Add click handlers for emergency numbers
  const emergencyCards = document.querySelectorAll(".emergency-card")
  emergencyCards.forEach((card) => {
    card.style.cursor = "pointer"
    card.addEventListener("click", function () {
      const numberElement = this.querySelector(".emergency-number")
      if (numberElement) {
        callEmergency(numberElement.textContent)
      }
    })
  })
})
const GEMINI_API_KEY = "AIzaSyDmLCzXrgUPTCNel5KQgcwXRXo1mgdrcpA";  
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;



function toggleChat() {
  const chat = document.getElementById("chatbot");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  addMessage("bot", "⌛ Thinking...");

  fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }]
    })
  })
    .then(res => res.json())
    .then(data => {
     console.log("📦 Gemini FULL response:", JSON.stringify(data, null, 2));
  // ✅ You'll see this in Replit console
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Gemini returned no answer.";
      updateLastBotMessage(reply);
    })
    .catch(err => {
      console.error("Gemini API Error:", err);
      updateLastBotMessage("❌ Failed to reach Gemini API.");
    });
}

function addMessage(sender, text) {
  const chat = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = `chat-message ${sender}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function updateLastBotMessage(text) {
  const messages = document.querySelectorAll(".chat-message.bot");
  const last = messages[messages.length - 1];
  if (last) last.innerText = text;
}
async function fetchDisasterNews() {
  const container = document.getElementById("highlight-items");
  container.innerHTML = "<span>⏳ Fetching latest disasters...</span>";

  try {
    // broader query for disasters in India
    const response = await fetch(
      "https://gnews.io/api/v4/search?q=(flood OR earthquake OR cyclone OR fire)%20india&lang=en&max=5&apikey=YOUR_API_KEY"
    );
    const data = await response.json();

    container.innerHTML = "";

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        const span = document.createElement("span");
        span.innerHTML = `🗓️ ${new Date(article.publishedAt).toLocaleDateString()} - 
          <a href="${article.url}" target="_blank">${article.title}</a>`;
        container.appendChild(span);
      });
    } else {
      loadFallbackNews(container);
    }
  } catch (error) {
    console.error("Error fetching disaster news:", error);
    loadFallbackNews(container);
  }
}


// 🔄 Auto-refresh every 5 minutes
window.addEventListener("DOMContentLoaded", () => {
  fetchDisasterNews();
  setInterval(fetchDisasterNews, 5 * 60 * 1000); // refresh every 5 minutes
});
let lastArticles = [];

async function fetchDisasterNews() {
  const container = document.getElementById("highlight-items");

  try {
    const response = await fetch(
      "https://gnews.io/api/v4/search?q=(flood OR earthquake OR cyclone OR fire)%20india&lang=en&max=5&apikey=YOUR_API_KEY"
    );
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      const newArticles = data.articles.filter(
        article => !lastArticles.includes(article.title)
      );

      newArticles.forEach(article => {
        const span = document.createElement("span");
        span.classList.add("highlight-item");
        span.textContent = `🗓️ ${new Date(article.publishedAt).toLocaleDateString()} - ${article.title}`;
        
        // store article info in dataset
        span.dataset.title = article.title;
        span.dataset.date = new Date(article.publishedAt).toDateString();
        span.dataset.desc = article.description || "No description available.";
        span.dataset.url = article.url;

        // click event
        span.addEventListener("click", () => openModal(span));

        container.appendChild(span);
      });

      lastArticles = [...lastArticles, ...newArticles.map(a => a.title)];
      if (lastArticles.length > 20) lastArticles = lastArticles.slice(-20);
    }
  } catch (error) {
    console.error("Error fetching disaster news:", error);
  }
}

function openModal(item) {
  document.getElementById("modal-title").textContent = item.dataset.title;
  document.getElementById("modal-date").textContent = item.dataset.date;
  document.getElementById("modal-desc").textContent = item.dataset.desc;
  document.getElementById("modal-link").href = item.dataset.url;
  
  document.getElementById("disaster-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("disaster-modal").style.display = "none";
}


// Open modal with clicked disaster info
function openModal(item) {
  document.getElementById("modal-title").textContent = item.dataset.title;
  document.getElementById("modal-date").textContent = item.dataset.date;
  document.getElementById("modal-desc").textContent = item.dataset.desc;
  document.getElementById("modal-link").href = item.dataset.url;
  
  document.getElementById("disaster-modal").style.display = "flex";
}

// Close modal
function closeModal() {
  document.getElementById("disaster-modal").style.display = "none";
}

// Attach click events after DOM loads
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".highlight-item").forEach(item => {
    item.addEventListener("click", () => openModal(item));
  });
});
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Close modal when clicking outside box
window.onclick = function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
}


// Learning Hub - Click Functionality
document.querySelectorAll(".learning-card").forEach(card => {
  card.style.cursor = "pointer"; // show hand cursor
  card.addEventListener("click", function (e) {
    // Prevent double trigger if clicking the button inside
    if (e.target.tagName === "BUTTON") return;

    const type = this.getAttribute("data-type");

    // Add bounce animation
    this.classList.add("card-bounce");
    setTimeout(() => this.classList.remove("card-bounce"), 600);

    // Show info
    switch (type) {
      case "scenario":
        alert("🎭 Scenario Training\n\nPractice emergencies like Home, School, and Public spaces in a safe environment!");
        break;
      case "skills":
        alert("🛡️ Safety Skills\n\nLearn step-by-step First Aid, Fire Safety, and CPR training.");
        break;
      case "drills":
        alert("🚨 Virtual Drills\n\nTry evacuation drills, emergency calls, and kit assembly with timers.");
        break;
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Learning Hub - Click Functionality
  document.querySelectorAll(".learning-card").forEach(card => {
    card.style.cursor = "pointer"; // make it look clickable

    card.addEventListener("click", function () {
      const type = this.getAttribute("data-type");

      // Add bounce animation
      this.classList.add("card-bounce");
      setTimeout(() => this.classList.remove("card-bounce"), 600);

      // Show info
      switch (type) {
        case "scenario":
          alert("🎭 Scenario Training\n\nPractice emergencies like Home, School, and Public spaces in a safe environment!");
          break;
        case "skills":
          alert("🛡️ Safety Skills\n\nLearn step-by-step First Aid, Fire Safety, and CPR training.");
          break;
        case "drills":
          alert("🚨 Virtual Drills\n\nTry evacuation drills, emergency calls, and kit assembly with timers.");
          break;
      }
    });
  });
});
function showLearnModal(title, description, iconUrl, listItems = []) {
  const modal = document.getElementById("learn-modal");
  modal.style.display = "flex";

  // Fill title & description
  document.getElementById("learn-title").textContent = title;
  document.getElementById("learn-description").textContent = description;

  // Set icon
  const iconEl = document.getElementById("learn-icon");
  if (iconUrl) {
    iconEl.src = iconUrl;
    iconEl.style.display = "block";
  } else {
    iconEl.style.display = "none";
  }

  // Add list
  const extra = document.getElementById("learn-extra");
  extra.innerHTML = "";
  if (listItems.length > 0) {
    extra.innerHTML = `
      <ul class="popup-list">
        ${listItems.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }
}


// Example click handler (for your cards)
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("[data-type='scenario']").addEventListener("click", () => {
    showLearnModal(
      "🎭 Scenario Training",
      "Practice real-life emergency situations like Home, School, and Public Spaces.",
      "https://lottie.host/9f0b1583-728c-4af0-87d1-18d8a4f9e9f0/8TXmV4o7mS.json"
    );
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Scenario Training card
  document.querySelector("[data-type='scenario']").addEventListener("click", () => {
    showLearnModal(
      "🎭 Scenario Training",
      "Practice real-life emergency situations like Home, School, and Public Spaces.",
      "https://lottie.host/9f0b1583-728c-4af0-87d1-18d8a4f9e9f0/8TXmV4o7mS.json"
    );
  });

  // Safety Skills card
  document.querySelector("[data-type='skills']").addEventListener("click", () => {
    showLearnModal(
      "🛡️ Safety Skills",
      "Learn essential life-saving techniques like First Aid, Fire Safety, and CPR.",
      "https://lottie.host/0fcf3df4-2d73-4e16-a7f6-6d0f7d7fd8e2/ytlH17H7zB.json"
    );
  });

// Virtual Drills
document.querySelector("[data-type='drills']").addEventListener("click", () => {
  showLearnModal(
    "🚨 Virtual Drills",
    "Run through timed challenges like Evacuation, Emergency Calls, and Kit Assembly.",
    "https://lottie.host/4c43cc5f-9cb1-4d35-89f1-048c37d5d301/2Vf8j9Yt7n.json"
  );
});
const drillsCard = document.querySelector("[data-type='drills']");
  if (drillsCard) {
    drillsCard.addEventListener("click", () => {
      showLearnModal(
        "🚨 Virtual Drills",
        "Practice emergency procedures with timed challenges such as Evacuation, Emergency Calls, and Kit Assembly.",
        "https://lottie.host/4c43cc5f-9cb1-4d35-89f1-048c37d5d301/2Vf8j9Yt7n.json"
      );
    });
  }
});


function toggleContent(card) {
  const text = card.querySelector("p");
  const icon = card.querySelector("span");
  text.classList.toggle("hidden");
  icon.textContent = text.classList.contains("hidden") ? "➕" : "➖";
}
function startScenario() {
  // 1. Show the hidden Public Space section
  document.getElementById("public-space").classList.remove("hidden");

  // 2. Unlock the "🌆 Public Space" item in the progress list
  const publicSpaceItem = document.querySelector(".progress-item.locked");
  if (publicSpaceItem) {
    publicSpaceItem.classList.remove("locked");
    publicSpaceItem.classList.add("active");
    const statusSpan = publicSpaceItem.querySelector(".status");
    if (statusSpan) {
      statusSpan.textContent = "🟢 Active";
      statusSpan.classList.remove("locked");
      statusSpan.classList.add("active");
    }
  }
}
// Expand/collapse details inside cards
function toggleContent(card) {
  const text = card.querySelector("p");
  const icon = card.querySelector("span");
  text.classList.toggle("hidden");
  icon.textContent = text.classList.contains("hidden") ? "➕" : "➖";
}
function closeScenario() {
  document.getElementById("public-space").classList.add("hidden");
  document.getElementById("learn").scrollIntoView({ behavior: "smooth" });
}
function openSafetySkills() {
  const videos = document.getElementById("safety-skills-videos");
  const learningGrid = document.querySelector(".learning-grid");

  if (videos) {
    videos.style.display = "block";      // show video section
  }
  if (learningGrid) {
    learningGrid.style.display = "none"; // hide cards
  }
}

function closeSafetySkills() {
  const videos = document.getElementById("safety-skills-videos");
  const learningGrid = document.querySelector(".learning-grid");

  if (videos) {
    videos.style.display = "none";       // hide video section
  }
  if (learningGrid) {
    learningGrid.style.display = "grid"; // show cards again
  }
}


/* ========== 10-question Virtual Drill (20 s timer) ========== */
const drillQuestions = [
  {
    title: "🔥 Fire Drill",
    question: "Smoke is filling the corridor. What do you do?",
    choices: [
      { text: "🚪 Take the Elevator", correct: false, feedback: "❌ Wrong! Elevators are unsafe during fires." },
      { text: "🪜 Use the Stairs", correct: true, feedback: "✅ Correct! Using the stairs is the safest choice." },
      { text: "⏳ Wait for Rescue", correct: false, feedback: "⚠️ Risky! Waiting may work, but smoke can overwhelm you." }
    ]
  },
  {
    title: "🚗 Road Safety",
    question: "You see someone injured on the road. What should you do first?",
    choices: [
      { text: "📞 Call Emergency Services", correct: true, feedback: "✅ Correct! Call for help immediately." },
      { text: "🚑 Move the injured person immediately", correct: false, feedback: "❌ Wrong! Moving them may worsen injuries." },
      { text: "⏳ Wait for others to help", correct: false, feedback: "⚠️ Delaying can be dangerous." }
    ]
  },
  {
    title: "🌍 Earthquake Drill",
    question: "During an earthquake, the safest action indoors is:",
    choices: [
      { text: "🏃 Run outside quickly", correct: false, feedback: "❌ Wrong! Falling debris outside is dangerous." },
      { text: "🪑 Drop, Cover, and Hold On", correct: true, feedback: "✅ Correct! Stay under sturdy furniture." },
      { text: "🚪 Stand in the doorway", correct: false, feedback: "⚠️ Not always safe in modern buildings." }
    ]
  },
  {
    title: "🌊 Flood Drill",
    question: "Flood water is rising around you. What’s the safest action?",
    choices: [
      { text: "🚗 Drive through flood water", correct: false, feedback: "❌ Wrong! Vehicles can be swept away." },
      { text: "⬆️ Move to higher ground", correct: true, feedback: "✅ Correct! Seek higher ground immediately." },
      { text: "🏠 Stay in the basement", correct: false, feedback: "⚠️ Basements can flood quickly." }
    ]
  },
  {
    title: "🩹 First Aid",
    question: "A person is bleeding heavily. What should you do first?",
    choices: [
      { text: "📞 Call for help only", correct: false, feedback: "❌ Wrong! Immediate action is required." },
      { text: "✋ Apply firm pressure on the wound", correct: true, feedback: "✅ Correct! Control bleeding by applying pressure." },
      { text: "💧 Wash the wound with lots of water", correct: false, feedback: "⚠️ Not in heavy bleeding, it wastes time." }
    ]
  },
  {
    title: "☠️ Chemical Spill",
    question: "You see a chemical spill in your office. What’s your first step?",
    choices: [
      { text: "👃 Smell it to identify", correct: false, feedback: "❌ Wrong! Dangerous fumes can harm you." },
      { text: "🚪 Evacuate the area immediately", correct: true, feedback: "✅ Correct! Leave the area and alert others." },
      { text: "🧹 Try to clean it yourself", correct: false, feedback: "⚠️ Risky! You may not have protective gear." }
    ]
  },
  {
    title: "⚡ Electrical Fire",
    question: "An electrical fire starts. What should you do?",
    choices: [
      { text: "💧 Pour water on it", correct: false, feedback: "❌ Wrong! Water + electricity = deadly." },
      { text: "🔌 Turn off power and use a CO₂ extinguisher", correct: true, feedback: "✅ Correct! Best method for electrical fires." },
      { text: "🚪 Ignore it and run away", correct: false, feedback: "⚠️ Fire may spread quickly." }
    ]
  },
  {
    title: "🚨 Fire Alarm",
    question: "The fire alarm rings at work. What should you do?",
    choices: [
      { text: "📦 Collect belongings first", correct: false, feedback: "❌ Wrong! Precious time is wasted." },
      { text: "🚪 Follow evacuation routes calmly", correct: true, feedback: "✅ Correct! Safety first, follow exit signs." },
      { text: "📞 Call family before leaving", correct: false, feedback: "⚠️ Escape first, call later." }
    ]
  },
  {
    title: "☢️ Gas Leak",
    question: "You smell gas in the kitchen. What’s the safest action?",
    choices: [
      { text: "🔥 Light a match to check", correct: false, feedback: "❌ Wrong! Explosion risk." },
      { text: "🔌 Turn off the main gas supply & ventilate", correct: true, feedback: "✅ Correct! Shut supply, open windows, avoid flames." },
      { text: "📞 Call a friend to check", correct: false, feedback: "⚠️ Not safe to wait." }
    ]
  },
  {
    title: "🏥 CPR Drill",
    question: "You see someone unconscious and not breathing. What’s your first step?",
    choices: [
      { text: "📞 Call emergency and start CPR", correct: true, feedback: "✅ Correct! Call for help and begin CPR immediately." },
      { text: "💧 Give them water", correct: false, feedback: "❌ Wrong! Not effective." },
      { text: "🙌 Wait for ambulance", correct: false, feedback: "⚠️ Delaying CPR reduces survival chance." }
    ]
  }
];

let drillQ   = 0;      // current question index
let drillPts = 0;      // score
let drillTmr = null;   // timer id

function startDrill() {
  document.querySelector(".learning-grid").style.display = "none";
  document.getElementById("virtual-drills").style.display = "block";
  drillQ = 0;
  drillPts = 0;
  loadDrillQuestion();
}

function closeDrills() {
  document.getElementById("virtual-drills").style.display = "none";
  document.querySelector(".learning-grid").style.display = "grid";
  clearInterval(drillTmr);
}

function loadDrillQuestion() {
  const dq = drillQuestions[drillQ];
  if (!dq) {
    document.getElementById("drill-card").innerHTML = `
      <h4 class="text-xl font-bold mb-3">✅ Drill Completed!</h4>
      <p class="mb-3">You scored <strong>${drillPts}/${drillQuestions.length}</strong>.</p>
      <button class="btn btn-secondary" onclick="closeDrills()">⬅ Back</button>`;
    return;
  }

  // reset UI
  document.getElementById("drill-title").textContent   = dq.title;
  document.getElementById("drill-question").textContent = dq.question;
  document.getElementById("drill-outcome").textContent = "";
  document.getElementById("timer").textContent = "20";

  // render choices
  const container = document.getElementById("drill-choices");
  container.innerHTML = "";
  dq.choices.forEach((c, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-primary w-full";
    btn.textContent = c.text;
    btn.onclick = () => pickDrillChoice(idx);
    container.appendChild(btn);
  });

  // 20-second timer
  let tl = 20;
  clearInterval(drillTmr);
  drillTmr = setInterval(() => {
    tl--;
    document.getElementById("timer").textContent = tl;
    if (tl <= 0) {
      clearInterval(drillTmr);
      document.getElementById("drill-outcome").innerHTML =
        "⏰ Time’s up! Moving to next question…";
      setTimeout(nextDrillQuestion, 1500);
    }
  }, 1000);
}

function pickDrillChoice(idx) {
  clearInterval(drillTmr);
  const choice = drillQuestions[drillQ].choices[idx];
  const out = document.getElementById("drill-outcome");
  out.innerHTML = choice.feedback;
  out.style.color = choice.correct ? "green" : "red";
  if (choice.correct) drillPts++;
  setTimeout(nextDrillQuestion, 2000);
}

function nextDrillQuestion() {
  drillQ++;
  loadDrillQuestion();
}
// CORRECT version with the security check
function openDashboard() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (isAdmin) {
    // If user is an admin, proceed to the dashboard
    window.location.href = "dashboard.html";
  } else {
    // If not an admin, show an alert and do nothing
    alert("❌ You are not authorized to access the Admin Dashboard.");
  }
}
// ✅ Show Admin button only for admin users



// ---------- Firebase auth guard & logout (add to script.js) ----------

// Ensure `auth` exists (we set it on window in the HTML firebase init)
if (!window.auth) {
  console.warn("Firebase auth not found. Make sure Firebase SDK + init script is included before script.js");
}

// Redirect to login if not authenticated
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.replace("login.html");
  } else {
    console.log("User is logged in:", user.email);

    // ✅ Check admin status from localStorage
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const adminBtn = document.getElementById("adminBtn");
    if (adminBtn) {
      if (isAdmin) {
        adminBtn.style.display = "inline-block"; // show for admin
      } else {
        adminBtn.style.display = "none"; // hide for normal users
      }
    }
  }
});


// Logout function (global)
function logout() {
  auth.signOut()
    .then(() => {
      // successful sign out -> redirect to login
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("Error logging out: " + error.message);
    });
}
// make sure it's available as a global (for inline onclick)
window.logout = logout;

      
        async function generateRiskReport() {
            const pincodeInput = document.getElementById('pincode-input');
            const placeholder = document.getElementById('risk-placeholder');
            const loader = document.getElementById('risk-loader');
            const reportCard = document.getElementById('risk-report-card');
            const pincode = pincodeInput.value.trim();

            if (!pincode) {
                alert("Please enter a pincode.");
                return;
            }
             if (OWM_API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
                 alert("API Key Missing: Please get your free API key from OpenWeatherMap and add it to the script.");
                 return;
            }

            placeholder.style.display = 'none';
            reportCard.style.display = 'none';
            loader.style.display = 'block';

            try {
                const geoUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${pincode},IN&appid=${OWM_API_KEY}`;
                const geoResponse = await fetch(geoUrl);
                if (!geoResponse.ok) throw new Error('Invalid pincode or network issue.');
                const geoData = await geoResponse.json();

                const { lat, lon, name } = geoData;
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric`;
                const weatherResponse = await fetch(weatherUrl);
                if (!weatherResponse.ok) throw new Error('Could not fetch current weather.');
                const weatherData = await weatherResponse.json();

                const analysis = analyzeCurrentWeather(weatherData);
                displayDetailedReport(name, analysis);

            } catch (error) {
                console.error("Risk Report Error:", error);
                reportCard.innerHTML = `<p class="text-center text-red-500 font-semibold">Could not generate report. Please check the pincode or API key.</p>`;
            } finally {
                loader.style.display = 'none';
                reportCard.style.display = 'block';
            }
        };

        function analyzeCurrentWeather(data) {
            const analysis = {
                rainfall: data.rain ? data.rain['1h'] || 0 : 0,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                wind_speed: data.wind.speed * 3.6, // m/s to km/h
                wind_deg: data.wind.deg,
                timestamp: data.dt
            };
            
            let riskScore = 0;
            if (analysis.rainfall > 10) riskScore += 3; // Heavy rain
            else if (analysis.rainfall > 2) riskScore += 1; // Moderate rain
            
            if (analysis.temp > 38) riskScore += 3; // Heatwave
            
            if (analysis.wind_speed > 60) riskScore += 4; // Cyclone-like winds
            else if (analysis.wind_speed > 40) riskScore += 2; // High winds

            if (data.weather[0].main === "Thunderstorm") riskScore += 4;
            
            if (riskScore >= 5) {
                analysis.severity = "Red Alert (High Risk)";
                analysis.advice = "Significant threat to life and property. Stay indoors, avoid all travel, and follow official emergency instructions immediately.";
            } else if (riskScore >= 3) {
                analysis.severity = "Orange Alert (Medium-High Risk)";
                analysis.advice = "Stay indoors if possible, avoid unnecessary travel, and keep essentials ready. Monitor weather updates closely.";
            } else if (riskScore >= 1) {
                analysis.severity = "Yellow Alert (Low Risk)";
                analysis.advice = "Be aware of changing conditions. Some localized disruption is possible. Plan travel accordingly.";
            } else {
                analysis.severity = "Green Alert (No Warning)";
                analysis.advice = "Conditions are currently safe. It's always a good idea to be prepared.";
            }

            return analysis;
        }

        function displayDetailedReport(locationName, analysis) {
            const reportCard = document.getElementById('risk-report-card');

            let reportHTML = `<h3 class="text-2xl font-bold mb-4 text-center">Real-Time Risk Analysis for ${locationName}</h3><div class="space-y-3">`;

            // Rainfall
            reportHTML += `<div class="report-item"><span class="report-item-icon">🌧️</span><span><strong>Rainfall:</strong> ${analysis.rainfall > 0 ? `Expected (${analysis.rainfall.toFixed(2)} mm/hr)` : 'No significant rain expected'}</span></div>`;
            
            // Temperature
            reportHTML += `<div class="report-item"><span class="report-item-icon">🌡️</span><span><strong>Temperature:</strong> ${analysis.temp.toFixed(1)}°C (Feels like ${analysis.feels_like.toFixed(1)}°C)</span></div>`;

            // Wind
            reportHTML += `<div class="report-item"><span class="report-item-icon">💨</span><span><strong>Wind:</strong> ${analysis.wind_speed.toFixed(1)} km/h gusts (${getWindDirection(analysis.wind_deg)})</span></div>`;
            
            // Severity
            reportHTML += `<div class="report-item"><span class="report-item-icon">⚠️</span><span><strong>Severity:</strong> <span class="font-bold ${analysis.severity.includes('Red') ? 'text-red-600' : analysis.severity.includes('Orange') ? 'text-orange-500' : 'text-yellow-500'}">${analysis.severity}</span></span></div>`;
            
            // Advice
            reportHTML += `<div class="report-item"><span class="report-item-icon">✅</span><span><strong>Advice:</strong> ${analysis.advice}</span></div>`;

            reportHTML += `</div>`;
            reportCard.innerHTML = reportHTML;
        }

        function getWindDirection(degrees) {
            const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
            const index = Math.round(degrees / 45) % 8;
            return directions[index];
        }


        // --- NEW TRANSLATION LOGIC ---

// Function to apply translations based on the selected language
const applyTranslations = (lang) => {
  const elements = document.querySelectorAll("[data-translate-key]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate-key");
    if (languageContent[lang] && languageContent[lang][key]) {
      element.innerHTML = languageContent[lang][key];
    }
  });
};

// Function to change language, save preference, and apply translations
const changeLanguage = () => {
  const selectedLang = document.getElementById("language-selector").value;
  localStorage.setItem("selectedLanguage", selectedLang); // Save preference
  applyTranslations(selectedLang);
};

// --- END OF NEW TRANSLATION LOGIC ---


// --- EXISTING AND MODIFIED LOGIC ---

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  
  // --- TRANSLATION INITIALIZATION ---
  const savedLang = localStorage.getItem("selectedLanguage") || "en"; // Get saved lang or default to English
  document.getElementById("language-selector").value = savedLang;
  applyTranslations(savedLang); // Apply translation on page load
  // --- END TRANSLATION INITIALIZATION ---

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.9)";
    }
  });
});

function toggleHelpline() {
  document.getElementById('helpline-popup').classList.toggle('hidden');
}

// Firebase auth guard & logout
if (window.auth) {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            // If no user, redirect to login page.
            // Make sure you have a login.html page.
            window.location.replace("login.html");
        } else {
            // User is logged in. You can optionally show/hide elements here.
            console.log("User is logged in:", user.email);
            const isAdmin = localStorage.getItem("isAdmin") === "true";
            const adminBtn = document.getElementById("adminBtn");
            if(adminBtn) {
                adminBtn.style.display = isAdmin ? 'inline-block' : 'none';
            }
        }
    });
}

function openDashboard() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (isAdmin) {
    window.location.href = "dashboard.html";
  } else {
    alert("❌ You are not authorized to access the Admin Dashboard.");
  }
}


