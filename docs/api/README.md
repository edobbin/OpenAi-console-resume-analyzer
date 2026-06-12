# MyATS API Documentation

This folder documents the backend API for MyATS Resume Analyzer.

MyATS is designed to compare a user's resume against a job description and return a structured AI-powered analysis report, including ATS score, skill gaps, keyword recommendations, and resume improvement suggestions.

## API Goals

- Accept resume uploads
- Accept job descriptions
- Parse resume content
- Analyze resume/job match using an AI model
- Return structured JSON results
- Save analysis results for later retrieval

## Planned Backend Stack

- FastAPI
- Python
- PyMuPDF for PDF parsing
- Gemini API for AI analysis
- AWS S3 for resume file storage
- AWS DynamoDB for submissions and analysis results
- AWS Lambda + API Gateway for serverless deployment

## Main Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check API status |
| POST | `/resumes/upload` | Upload and parse a resume |
| POST | `/analysis/job-match` | Analyze resume against a job description |
| GET | `/analysis/{submission_id}` | Retrieve a saved analysis result |

## Status

This API is currently in MVP development.
