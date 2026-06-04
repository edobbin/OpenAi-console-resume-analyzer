from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

if not MONGO_URI:
    raise ValueError("MONGO_URI is not set in the .env file")

if not MONGO_DB_NAME:
    raise ValueError("MONGO_DB_NAME is not set in the .env file")

client = MongoClient(MONGO_URI)

#verify connection
try:
    client.admin.command('ping')
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")

def get_connection():
    return client[MONGO_DB_NAME]

def get_submissions_collection():
    db = get_connection()
    return db["submissions"]

def create_submission_collection(client):
    db = client[os.getenv("MONGO_DB_NAME")]
    collection = db["submissions"]
    print("Submission collection created successfully!")
    return collection

create_submission_collection(client)