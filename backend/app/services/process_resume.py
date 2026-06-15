from app.services.resume_parser import parse_resume
from fastapi import HTTPException, UploadFile, File

async def process_resume_upload(resume: UploadFile = File(...)) -> dict:
    #1 Check if the filename is provided
    if not resume.filename:
        raise HTTPException(status_code=400, detail="Missing file name.")
    #2 retrieve the content of the file
    content = await resume.read()

    #print(f"Content: {parse_resume(content, resume.filename)}")

    ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"]
    MAX_FILE_SIZE_MB = 5
    MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

    #3. Get the filename and convert to lowercase
    filename = resume.filename.lower()
    #4. Check file extension
    if not any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Please upload a PDF, DOCX, or TXT file."
        )
    #5. Check file size
    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds the maximum limit of {MAX_FILE_SIZE_MB} MB."
        )
    #6. Check if the file is empty
    if len(content) == 0:
        raise HTTPException(
            status_code=400,
            detail="File is empty."
        )
    
    # 7. Read the file content
    # 8. Parse the resume content
    parsed_text = parse_resume(content, resume.filename)
    # 9. Return the parsed text and metadata
    return {
        "message": "Resume received successfully",
        "size": len(content),
        "filename": resume.filename,
        "content_type": resume.content_type,
        "parsed_text": parsed_text
    }