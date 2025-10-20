from flask import Flask, request, jsonify, render_template
from openai import OpenAI

app = Flask(__name__)

# Initialize OpenAI client
# TODO: Replace with your actual OpenAI API key
# Get your API key from: https://platform.openai.com/api-keys
client = OpenAI(api_key="YOUR_OPENAI_API_KEY_HERE")

@app.route('/')
def home():
    """Serve the main UI"""
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    """
    Generate fitness plan from template
    
    POST /generate
    Body: {
        "goal": "Weight Loss",
        "level": "Beginner", 
        "days": 3,
        "equipment": "No equipment",
        "duration": 45,
        "limitations": "None",
        "program_duration": 8
    }
    
    Returns: JSON fitness plan
    """
    try:
        # Get parameters from request
        data = request.get_json()
        
        goal = data.get('goal', 'General fitness')
        level = data.get('level', 'Beginner')
        days = data.get('days', 3)
        equipment = data.get('equipment', 'No equipment')
        duration = data.get('duration', 45)
        limitations = data.get('limitations', 'None')
        program_duration = data.get('program_duration', 8)
        
        # Read template
        with open('template.txt', 'r', encoding='utf-8') as f:
            template = f.read()
        
        # Replace variables
        prompt = template
        prompt = prompt.replace('{goal}', goal)
        prompt = prompt.replace('{level}', level)
        prompt = prompt.replace('{days}', str(days))
        prompt = prompt.replace('{equipment}', equipment)
        prompt = prompt.replace('{duration}', str(duration))
        prompt = prompt.replace('{limitations}', limitations)
        prompt = prompt.replace('{program_duration}', str(program_duration))
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=16000
        )
        
        # Get and parse result
        result = response.choices[0].message.content
        
        print(f"API Response received: {len(result)} characters")
        print(f"First 100 chars: {result[:100]}")
        
        # Strip markdown code blocks if present
        if "```json" in result:
            print("Stripping ```json markdown")
            result = result.split("```json")[1].split("```")[0].strip()
        elif "```" in result:
            print("Stripping ``` markdown")
            result = result.split("```")[1].split("```")[0].strip()
        
        print(f"After stripping, first 100 chars: {result[:100]}")
        
        # Parse and validate JSON before returning
        import json
        parsed_result = json.loads(result)
        print("JSON parsed successfully!")
        return jsonify(parsed_result), 200
        
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        print(f"Response that failed: {result[:500] if 'result' in locals() else 'N/A'}")
        return jsonify({"error": "Invalid JSON from AI", "details": str(e)}), 500
    except Exception as e:
        print(f"Error in generate endpoint: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Flask Fitness API running on http://localhost:5000")
    print("POST to /generate with parameters to get fitness plan")
    app.run(debug=True, port=5000)
