from youtubesearchpython import VideosSearch

def print_youtube_video_links(query):
    try:
        videos = VideosSearch(query, limit=3).result()["result"]
        links = [video["link"] for video in videos]
        print(links)
        return links
    except Exception as e:
        print(f"Error fetching YouTube video links: {e}")
        return []
