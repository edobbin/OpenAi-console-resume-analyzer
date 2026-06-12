# MyATS Architecture Documentation

This folder documents the planned architecture for MyATS Resume Analyzer.

MyATS is a full-stack AI-powered resume analysis application. The system allows users to upload a resume, paste a job description, and receive a structured ATS-style report.

## High-Level Architecture

```text
React Frontend
    ↓
FastAPI Backend
    ↓
Resume Parser
    ↓
AI Analysis Service
    ↓
Database + File Storage
```

## Planned Cloud Architecture

```text
Frontend: AWS Amplify
API Layer: Amazon API Gateway
Backend Compute: AWS Lambda
File Storage: Amazon S3
Database: Amazon DynamoDB
Secrets: AWS Secrets Manager or Lambda Environment Variables
AI Provider: Gemini API
```

## Main Design Goals

- Keep the frontend and backend separated
- Build a real backend service layer
- Use structured JSON responses from AI
- Store uploaded resumes securely
- Save analysis results for retrieval
- Deploy using AWS serverless services
