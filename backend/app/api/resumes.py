from fastapi import APIRouter, HTTPException, UploadFile, File
from app.services.resume_parser import parse_resume

router = APIRouter()

# Endpoint for submitting resume from front end to send to openAI for analysis
@router.post("/resume/upload")
async def upload_resume(resume: UploadFile = File(...)):

    allowed_extensions = [".pdf", ".docx", ".txt"]
    filename = resume.filename.lower()
    if not any(filename.endswith(ext) for ext in allowed_extensions):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Please upload a PDF, DOCX, or TXT file."
        )
    content = await resume.read()
    parsed_text = parse_resume(content, resume.filename)
    return {
        "message": "Resume received successfully",
        "size": len(content),
        "filename": resume.filename,
        "content_type": resume.content_type,
        "parsed_text": parsed_text
    }