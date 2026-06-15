from fastapi import APIRouter, HTTPException, UploadFile, File
from app.services.resume_parser import parse_resume

router = APIRouter()

# Endpoint for submitting resume from front end to send to openAI for analysis
@router.post("/resume/upload")
async def upload_resume(resume: UploadFile = File(...)):

    ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"]
    MAX_FILE_SIZE_MB = 5
    MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

    #1. Get the filename and convert to lowercase
    filename = resume.filename.lower()
    #2. Check file extension
    if not any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Please upload a PDF, DOCX, or TXT file."
        )
    #3. Check file size
    if len(await resume.read()) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds the maximum limit of {MAX_FILE_SIZE_MB} MB."
        )
    # 4. Check if the file is empty
    if len(await resume.read()) == 0:
        raise HTTPException(
            status_code=400,
            detail="File is empty."
        )
    
    # 5. Read the file content
    content = await resume.read()
    # 6. Parse the resume content
    parsed_text = parse_resume(content, resume.filename)
    # 7. Return the parsed text and metadata
    return {
        "message": "Resume received successfully",
        "size": len(content),
        "filename": resume.filename,
        "content_type": resume.content_type,
        "parsed_text": parsed_text
    }