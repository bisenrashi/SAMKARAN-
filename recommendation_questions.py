import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Load question data from JSON
with open('Backend/resourses/pre-assesment-questions.json', 'r') as f:
    questionSet = json.load(f)

# Initialize TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Extract questions and descriptions
questions = [question['Question'] for question in questionSet]

# Fit-transform questions to TF-IDF matrix
tfidf_matrix = tfidf_vectorizer.fit_transform(questions)

# Calculate cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

def calculate_similarity(user_input, question):
    # Calculate similarity based on all parameters present in the question
    similarity = 0
    for item in user_input:
        key = item['field']
        if key in question and item['selectedOption'] == question[key]:
            similarity += 1
    return similarity

def recommend_questions(user_input, num_questions=10):
    # Calculate similarity scores between user input and questions
    similarity_scores = [calculate_similarity(user_input, question) for question in questionSet]
    
    # Sort questions based on similarity scores
    related_question_indices = sorted(range(len(similarity_scores)), key=lambda i: similarity_scores[i], reverse=True)
    
    # Recommend top-N questions
    recommended_questions = [questionSet[i] for i in related_question_indices[:num_questions]]

    return recommended_questions
