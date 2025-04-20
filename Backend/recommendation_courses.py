import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Load course data from JSON
with open('Backend/resourses/web-technology.json', 'r') as f:
    data = json.load(f)

course_names = []
descriptions = []

# Iterate over each course
for course in data:
    if course is None or len(course) < 2:
        continue  # Skip None values and incomplete courses
    
    course_names.append(course[0])
    descriptions.append(course[1])

# Initialize TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Fit-transform descriptions to TF-IDF matrix
tfidf_matrix = tfidf_vectorizer.fit_transform(descriptions)

# Calculate cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
def recommend_courses(user_interests):
    # Convert user interests into TF-IDF representation
    user_interests_tfidf = tfidf_vectorizer.transform([user_interests])
    
    # Calculate similarity between user interests and courses
    similarity_scores = linear_kernel(user_interests_tfidf, tfidf_matrix).flatten()
    
    # Sort courses based on similarity scores
    related_courses_indices = similarity_scores.argsort()[::-1]
    
    # Recommend top-N courses
    recommended_courses = [course_names[i] for i in related_courses_indices]
    
    # Use a set to store unique recommended courses
    unique_recommendations = set()
    
    # Iterate over recommended courses
    for recommended_course in recommended_courses[:60]:
        # Check if the recommended course has not been added already
        if recommended_course not in unique_recommendations:
            unique_recommendations.add(recommended_course)
    recommended_courses_ =list(unique_recommendations)
    recommended_courses_info = []
    
    # Create a mapping of course names to their data indices
    course_name_to_index = {}
    for idx, course in enumerate(data):
        if course is not None and len(course) >= 2:
            course_name_to_index[course[0]] = idx

    # Iterate over recommended courses
    for recommended_course in recommended_courses_:
        # Check if the recommended course exists in the data
        if recommended_course in course_name_to_index:
            idx = course_name_to_index[recommended_course]
            course = data[idx]
            # Check if the course has an image
            if len(course[2]) > 0:
                # Construct course info dictionary
                course_info = {
                    'title': course[0],
                    'description': course[1],
                    'img': course[2][0],
                    'url': course[3]
                }
                # Append course info to the list
                recommended_courses_info.append(course_info)
    return recommended_courses_info[:8]







