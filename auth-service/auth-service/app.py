from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

PORT = os.getenv('PORT')
HOST = os.getenv('HOST') 

app = FastAPI()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT)