from groq import Groq
from django.conf import settings

client = Groq(api_key=settings.GROQ_API_KEY)

SYSTEM_PROMPT = """
You are a helpful AI assistant.
Be concise, clear, and friendly.
"""

def get_ai_response(messages) :
    completion = client.chat.completions.create(
        model = 'llama-3.1-8b-instant',
        messages = messages,
        temperature= 0.7
    )

    return completion.choices[0].message.content