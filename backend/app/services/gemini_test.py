import os
from google import genai
from dotenv import load_dotenv

# Load variables from the .env file if you chose Method B
load_dotenv()

# Initialize the client. 
# It automatically reads the GEMINI_API_KEY environment variable.
client = genai.Client()

# Alternative initialization if passing manually:
# client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def generate_text():
    # Make a text generation request using the recommended model
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Give me a 3-bullet-point summary explaining the benefits of Python virtual environments."
    )
    
    # Print the model's textual output
    print(response.text)

if __name__ == "__main__":
    generate_text()