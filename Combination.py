import json
import itertools

CGPA_values = ["9.5", "9.0", "8.5", "8.0", "7.5", "7.0"]
Branch_values = ["CSE", "ECE", "ME", "IT", "EE", "AI", "DS","CE"]
skill_levels_values = ["beginner", "intermediate", "advanced"]
programmingLanguages_values = ["python", "java", "C","Html/Css"]
Fields_values = ["datascience", "cybersecurity", "webdevelopment", "appdevelopment"]

with open("combinations.json", "w") as json_file:
    for  branch, cgpa, fields, language, level in itertools.product(
         Branch_values, CGPA_values, Fields_values, programmingLanguages_values, skill_levels_values
    ):
        combination = {
            "Question": "",
            "Answers": "",
            "Branch": branch,
            "CGPA": cgpa,
            "Interested Fields": [fields],
            "Programming Language": [language],
            "Knowledge Level": level
        }
        json.dump(combination, json_file)
        json_file.write(",\n")  # Add comma and newline after each combination

print("Combinations saved to combinations.json")
