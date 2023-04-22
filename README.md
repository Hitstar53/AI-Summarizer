# AI-Summarizer
This is a project that uses the AI to summarize the text. It uses the OpenAI GPT-4 model to extract the important sentences from the text and then summarize it. It is a web app that is built using the ReactJS and Redux Toolkit.

## How to run the project
1. Clone the project
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` to start the project

## Live Demo
![image](https://user-images.githubusercontent.com/84141920/233795627-22052a0f-6146-4316-90ba-9f1231a45f5d.png)

## How it works
1. The url is sent as a request to rapidapi.com via redux store
2. The response is received from rapidapi.com and the summary is displayed in the text area
3. Local storage is used to store the text and the summary of recent 5 url
