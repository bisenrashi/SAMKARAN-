import requests
from bs4 import BeautifulSoup
import json

def scrape_webpage(url):
    if "courses" in url:
        return
    response = requests.get(url)
    
    # Parse the HTML content of the webpage
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the article tag
    article_tag = soup.find('article')

    if article_tag:
        # Find the div with class 'main_wrapper' inside the article tag
        main_wrapper_div = article_tag.find('div', class_='main_wrapper')
        main_wrapper_div1 = article_tag.find('div', class_='entry-content')


        if main_wrapper_div:
            # Find the div with class 'article-title' inside the main wrapper
            article_title_div = main_wrapper_div.find('div', class_='article-title')

            # Extract the title
            if article_title_div:
                title = article_title_div.text.strip()

            else:
                title = "No title found."

            # Find the div with class 'text' inside the main wrapper
            text_div = article_tag.find('div', class_='text')

            if text_div:
                # Find the first paragraph
                first_paragraph = text_div.find('p')

                # Extract the text of the first paragraph
                if first_paragraph:
                    first_paragraph_text = first_paragraph.text.strip()
                else:
                    first_paragraph_text = "No paragraph found."

                # Find any images present
                images = text_div.find_all('img')
                if images:
                    image_src_list = [img['src'] for img in images]
                else:
                    image_src_list = []

            else:
                first_paragraph_text = "No 'text' div found."
                image_src_list = []

        elif main_wrapper_div1:
            article_title_div = main_wrapper_div1.find('header', class_='entry-header')

            # Extract the title
            if article_title_div:
                title = article_title_div.text.strip()

            else:
                title = "No title found."

            # Find the div with class 'text' inside the main wrapper
            text_div = main_wrapper_div1.find('div', class_='page_content')

            if text_div:
                # Find the first paragraph
                first_paragraph = text_div.find('p')

                # Extract the text of the first paragraph
                if first_paragraph:
                    first_paragraph_text = first_paragraph.text.strip()
                else:
                    first_paragraph_text = "No paragraph found."

                # Find any images present
                images = text_div.find_all('img')
                if images:
                    image_src_list = [img['src'] for img in images]
                else:
                    image_src_list = []

            else:
                first_paragraph_text = "No 'text' div found."
                image_src_list = []


    else:
        title = "No article tag found."
        first_paragraph_text = ""
        image_src_list = []

    return title, first_paragraph_text, image_src_list,url

def extract_slider_links(url):
    # Send a GET request to the URL
    response = requests.get(url)

    # Parse the HTML content of the webpage
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the div with class 'header-main__slider'
    slider_div = soup.find('div', class_='header-main__slider')

    if slider_div:
        # Find all 'a' tags within 'li' elements under the slider div
        links = slider_div.find_all('a')
        
        # Extract the href attributes
        href_list = [link['href'] for link in links]

        return href_list
    else:
        print("No 'header-main__slider' div found.")
        return []

def main():
    # URL of the webpage
    url = 'https://www.geeksforgeeks.org/devops-tutorial/?ref=ghm'  # Replace with your URL
    
    # Extract links from the slider
    slider_links = extract_slider_links(url)
    scraped_data = []
    for link in slider_links:
        link_loop=extract_slider_links(link)
        for link1 in link_loop:
            data = scrape_webpage(link1)
            scraped_data.append(data)
    
    # Save the scraped data to a JSON file
    with open('ml.json', 'w') as json_file:
        json.dump(scraped_data, json_file, indent=4)
main()
