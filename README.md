# AI Fitness Planner

**CS4680 Project 1** - A personalized fitness plan generator powered by OpenAI's GPT-4o API.

## 🎯 Project Overview

This web application uses AI to create customized workout plans based on user preferences including fitness goals, experience level, available equipment, and time constraints. The app features a modern, professional UI and generates comprehensive fitness plans with weekly schedules, exercise details, nutrition guidelines, and progress tracking.

## ✨ Features

- **Personalized Workout Plans**: AI-generated plans tailored to individual needs
- **Multiple Fitness Goals**: Weight loss, muscle building, general fitness, endurance, and strength
- **Flexible Parameters**: 
  - Experience levels (Beginner, Intermediate, Advanced)
  - 3-5 days per week training schedules
  - 30-60 minute session durations
  - 4-8 week program lengths
  - Various equipment options (no equipment, dumbbells, gym access, etc.)
- **Special Requests**: Custom specifications for exercises and preferences
- **Comprehensive Output**:
  - Weekly workout schedule
  - Detailed exercise instructions
  - Nutrition guidelines based on fitness goals
  - Habit recommendations
  - Progress tracking system
  - Safety notes

## 🛠️ Technology Stack

- **Backend**: Python Flask
- **Frontend**: HTML, CSS, JavaScript
- **AI Model**: OpenAI GPT-4o
- **Prompt Engineering Techniques**:
  - Persona Pattern: Certified personal trainer persona
  - Few-Shot Learning: Example workout plans
  - Chain of Thought: Structured plan creation process
  - Template-based prompting with variable substitution

## 📋 Prerequisites

- Python 3.10 or higher
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- pip (Python package manager)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jonahlin803/CS4680Project1.git
cd CS4680Project1
```

### 2. Create Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure API Key

**For the main web app**, open `fitness_api.py` and replace the placeholder on **line 9** with your actual OpenAI API key:

```python
client = OpenAI(api_key="YOUR_OPENAI_API_KEY_HERE")
```

**For the standalone test script**, if you want to use `planner.py`, also replace the API key on **line 6** of `planner.py`.

### 5. Run the Application

```bash
python fitness_api.py
```

The app will be available at: **http://localhost:5000**

## 📖 Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Fill out the fitness plan form:
   - Select your fitness goal
   - Choose your experience level
   - Set training frequency (days per week)
   - Select available equipment
   - Choose session duration
   - Set program length
   - Add any special requests or preferences
   - Note any physical limitations
3. Click **"Generate My Fitness Plan"**
4. Wait for the AI to generate your personalized plan (10-20 seconds)
5. Review your comprehensive fitness plan with weekly schedules, exercises, and nutrition

## 🧪 Testing the API Directly

You can test the API generation logic separately using `planner.py`:

1. **Add your API key** to `planner.py` on **line 6** (same as step 4 above)
2. Modify the parameters in the script as needed (lines 8-14)
3. Run:
   ```bash
   python planner.py
   ```
4. View the output in `sample_output.json`

## 📁 Project Structure

```
CS4680Project1/
├── fitness_api.py           # Flask backend API
├── planner.py               # Standalone API test script
├── template.txt             # AI prompt template
├── sample_output.json       # Example JSON output
├── requirements.txt         # Python dependencies
├── README.md                # Project documentation
├── .gitignore              # Git ignore rules
├── templates/
│   └── index.html          # Frontend HTML
└── static/
    ├── css/
    │   └── styles.css      # Custom styling
    └── js/
        └── app.js          # Frontend JavaScript
```

## 🔐 Security Notes

- **Never commit your API key** to version control
- The `.gitignore` file is configured to exclude sensitive files
- Keep your API key secure and private
- Monitor your OpenAI API usage to avoid unexpected charges

## 🎓 Prompt Engineering Techniques Used

### 1. Persona Pattern
Establishes the AI as a certified personal trainer with 10+ years of experience, ensuring professional and knowledgeable responses.

### 2. Few-Shot Learning
Provides example workout plans to guide the AI's output format and style.

### 3. Chain of Thought
Breaks down the plan creation process into logical steps:
- Analyze fitness goals and current level
- Consider available time and equipment
- Design progressive workouts
- Include rest and recovery
- Provide form tips and safety notes

### 4. Template-Based Prompting
Uses `template.txt` with variable substitution for consistent, structured outputs.

### 5. Critical Realism Rules
Ensures AI-generated plans are safe, achievable, and realistic based on user's fitness level and available resources.

## ⚠️ Known Issues

- Plans with maximum parameters (8 weeks, 5 days/week, 60 min sessions) may occasionally exceed token limits
- Windows console may not display all Unicode characters (emojis) in terminal output

## 🤝 Contributing

This is a course project for CS4680. For questions or issues, please contact the repository owner.

## 📄 License

This project is created for educational purposes as part of CS4680 coursework.

## 👤 Author

Jonah Lin - CS4680 Student

## 🙏 Acknowledgments

- OpenAI for the GPT-4o API
- CS4680 Course Staff
- Flask and Python community

