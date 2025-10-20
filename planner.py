from openai import OpenAI

# Initialize client with API key
# TODO: Replace with your actual OpenAI API key
# Get your API key from: https://platform.openai.com/api-keys
client = OpenAI(api_key="YOUR_OPENAI_API_KEY_HERE")

# Define local variables for the template
goal = "Weight Loss"
level = "Beginner"
days = 3
equipment = "No equipment"
duration = 45
limitations = "None"
program_duration = 8

# Read template file
with open('template.txt', 'r', encoding='utf-8') as f:
    template_content = f.read()

# Replace variables in template using string replacement
prompt = template_content
prompt = prompt.replace('{goal}', goal)
prompt = prompt.replace('{level}', level)
prompt = prompt.replace('{days}', str(days))
prompt = prompt.replace('{equipment}', equipment)
prompt = prompt.replace('{duration}', str(duration))
prompt = prompt.replace('{limitations}', limitations)
prompt = prompt.replace('{program_duration}', str(program_duration))

# Call API with template using chat completions
import sys

# Only print to stderr for debugging, stdout for JSON only
print("Calling API...", file=sys.stderr)

try:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=4000
    )
    
    result = response.choices[0].message.content
    
    if result:
        # Print only the JSON to stdout
        print(result)
    else:
        print("ERROR: Empty response", file=sys.stderr)
        
except Exception as e:
    print(f"ERROR: {e}", file=sys.stderr)