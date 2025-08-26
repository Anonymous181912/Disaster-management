// Quiz Data
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
