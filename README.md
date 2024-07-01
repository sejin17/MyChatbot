## **RAG (Retrieval Augmented Generation) LLM Chatbot**

## How to run the program

**Install Python dependencies**

```sh
pip install -r requirements.txt
```
**Install React dependencies**
```sh
cd client
npm install
```

**Create .env file**
```sh
OPENAI_API_KEY=<YOUR_API_KEY>
PINECONE_API_KEY=<YOUR_API_KEY>
```

**Start the Flask server**
```sh
# In root directory
python run.py
```

**Start the React app**
```sh
cd client
npm start
```
