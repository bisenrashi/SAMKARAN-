from flask import Flask, request, jsonify
from flask_cors import CORS
from moviepy.editor import AudioFileClip
import speech_recognition as sr
from openai import OpenAI
import os
import base64
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

api_key = "YOUR_API"
client = OpenAI(api_key=api_key)
def generate_questions_quiz(input_text):
    prompt = ('''Generate 10 mcq question in this format {"Question": "","Answers": {
      "A": "",
      "B": "",
      "C": "",
      "D": ""
    },
    "Correct_Answer": "",
  }, for ''' + input_text
       )
    completion1 = client.completions.create(
           model="gpt-3.5-turbo-instruct",
           prompt=prompt,
           max_tokens=1000,
           temperature=0
       )
    completion2 = client.completions.create(
           model="gpt-3.5-turbo-instruct",
           prompt="convert this into json"+completion1.choices[0].text,
           max_tokens=1000,
           temperature=0
       )
    return completion2.choices[0].text
           

