
from openai import OpenAI

api_key = "YOUR_API_KEY"
client = OpenAI(api_key=api_key)


def analyse_performance(answers, questions):
    num_correct = 0
    weak_areas = []
    total_answered = 0  # Initialize total_answered here

    # Compare student's answers with correct answers
    for i in range(len(answers)):
        if answers[i] is not None and "answerselect" in answers[i]:
            student_answer = answers[i]["answerselect"]
            correct_answer = questions[i]["Correct_Answer"]

            # If student's answer is not provided, skip this question
            if student_answer is None:
                weak_areas.append(questions[i]["Question"])  # Append the actual question
                continue

            # Map student's answer to A=1, B=2, C=3, D=4
            if student_answer == 1:
                student_answer = 'A'
            elif student_answer == 2:
                student_answer = 'B'
            elif student_answer == 3:
                student_answer = 'C'
            elif student_answer == 4:
                student_answer = 'D'

            if student_answer == correct_answer:
                num_correct += 1
            else:
                weak_areas.append(questions[i]["Question"])  # Append the actual question

            total_answered += 1  # Increment total_answered for each answered question

    # Calculate percentage score considering only answered questions
    percentage_score = (num_correct / total_answered) * 100 if total_answered > 0 else 0
    return weak_areas, percentage_score

def prompt_for_pre_assesment_quiz(answer, question, interests, knowledge_level, preferred_language, branch, cgpa, graduation_year):
    weak_areas, percentage_score = analyse_performance(answer, question)
    prompt=''
    prompt += "return learning path in this format: ['topic1', 'topic2', ...]\n"
    prompt += f"Score: {percentage_score}%\n"
    prompt += "Incorrectly answered:\n"
    prompt += "\n".join(weak_areas) + "\n\n"
    prompt += f"Interests: {interests}\n"
    prompt += f"Knowledge: {knowledge_level}\n"
    prompt += f"Language: {preferred_language}\n"
    prompt += f"Graduation Year: {graduation_year}\n"
    prompt += f"Branch: {branch}\n"
    prompt += f"CGPA: {cgpa}\n"

    return prompt


def generate_prompt(answers, questions, fields):
    graduation_year = next((item['selectedOption'] for item in fields if item['field'] == 'Graduation Year'), None)
    branch = next((item['selectedOption'] for item in fields if item['field'] == 'Branch'), None)
    cgpa = next((item['selectedOption'] for item in fields if item['field'] == 'CGPA'), None)
    interests = next((item['selectedOption'] for item in fields if item['field'] == 'Interested Fields'), None)
    knowledge_level = next((item['selectedOption'] for item in fields if item['field'] == 'Select your knowledge level'), None)
    preferred_language = next((item['selectedOption'] for item in fields if item['field'] == 'Programming Language'), None)

    prompt =prompt_for_pre_assesment_quiz(answers, questions, interests, knowledge_level, preferred_language, branch, cgpa,graduation_year)
    return prompt

def gpt(answers,questions,fields):
    prompt= generate_prompt(answers, questions, fields)
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

