from flask import Flask, request, jsonify
from flask_cors import CORS
import json,random
from recommendation_courses import recommend_courses
from recommendation_questions import recommend_questions
from path_generation import generate_questions_quiz
from WebSrcaping.yt import print_youtube_video_links
from Performance_Analysis import gpt
import re
app = Flask(__name__)
CORS(app)

@app.route('/build-moudle', methods=['POST'])
def get_courses():
    # Retrieve interests from request JSON
    res = request.json
    code= res['code']
    module= module(code)


    # Return JSON response with recommended courses
    return jsonify(module)


@app.route("/genearte-questions", methods=['POST'])
def genearte_questions():
    data = request.json
    recommeded_question= recommend_questions(data)
    return jsonify({"questions": recommeded_question}), 200


@app.route("/genearte-questions-quiz", methods=['POST'])
def genearte_questions_quiz_route():
    data = request.json
    url=data['url']
    text= generate_questions_quiz(url)
    load = json.loads(text)

    # Convert questions to desired structure
    output = []
    for item in load['questions']:
        question_obj = {
            "Question": item["question"],
            "Answers": {
                "A": item["answers"][0],
                "B": item["answers"][1],
                "C": item["answers"][2],
                "D": item["answers"][3]
            },
            "Correct_Answer": item["correct_answer"],
            "Branch": "CSE",  # Add your desired values for Branch, CGPA, etc.
            "CGPA": "9.5",
            "Interested Fields": ["datascience"],
            "Programming Language": ["python"],
            "Knowledge Level": "beginner"
        }
        output.append(question_obj)
    
    return jsonify({"questions":output}), 200

@app.route("/generate-path", methods=['POST'])
def path_generate():
    data= request.json
    answers = data['answers']
    questions= data['questions']
    fields= data['fields']
    print(answers,questions,fields)
    path = gpt(answers,questions,fields)
    load = json.loads(path)
    return jsonify({"path": load}), 200

@app.route("/yt-videos", methods=['POST'])
def yt():
    data= request.json
    query = data['query']
    videos = print_youtube_video_links(query)
    return jsonify({"links": videos}), 200



if __name__ == '__main__':
    app.run(debug=True)
