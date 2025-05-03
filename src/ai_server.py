from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing to handle React frontend

# Load the model
print("Loading AI model...")
generator = pipeline('text-generation', model='EleutherAI/gpt-neo-125M')
print("AI model loaded successfully!")

@app.route('/api/response', methods=['POST'])
def get_response():
    try:
        # Log incoming request for debugging
        print(f"Request received: {request.json}")
        
        # Extract user input from the JSON payload
        user_input = request.json.get('prompt', '').strip()
        if not user_input:
            print("Empty or invalid input!")
            return jsonify({'response': "No input provided!"}), 400  # Handle missing input

        print(f"User input: {user_input}")  # Log user input

        # Add improved context for AI responses
        context = (
            "You are an empathetic mental health assistant. Respond thoughtfully and clearly to support the user's emotional well-being. "
            "Avoid repetitive statements and focus on offering helpful advice or supportive commentary."
        )
        full_prompt = f"{context}\nUser: {user_input}\nAssistant:"
        
        # Generate response using tuned parameters
        response = generator(full_prompt, max_length=100, temperature=0.7, num_return_sequences=1)

        # Extract AI response and ensure user and assistant roles are distinct
        ai_response = response[0]['generated_text'].strip()

        # Enhance formatting for differentiation between User and Assistant
        formatted_response = f"User said: {user_input}\nAssistant response: {ai_response}"
        print(f"Generated response: {formatted_response}")  # Log formatted response

        return jsonify({'response': formatted_response})
    except Exception as e:
        # Log errors for debugging
        print(f"Error: {str(e)}")
        return jsonify({'response': "I'm sorry, I can't respond right now."}), 500

if __name__ == '__main__':
    # Start the Flask server
    print("Starting Flask server...")
    app.run(port=5000)