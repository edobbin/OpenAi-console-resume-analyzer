from fastapi import APIRouter, Form, HTTPException, UploadFile, File

from app.services.gemini_service import analyze_resume_with_gemini
from app.services.process_resume import process_resume_upload
#from app.services import parse_resume

router = APIRouter()

# Endpoint for analyzing job description and resume
@router.post("/analysis/upload")
async def analyze_information(job_description: str = Form(...), resume: UploadFile = File(...)):

    # Placeholder for actual analysis logic
    # You can call your parse_resume function here to analyze the resume
    # For example:
    # resume_content = await resume.read()
    # analysis_result = parse_resume(resume_content, job_description)
    try:
        resume_result = await process_resume_upload(resume)
        parsed_resume_text = resume_result["parsed_text"]
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

    gemini_analysis = analyze_resume_with_gemini(parsed_resume_text, job_description)

    if not gemini_analysis.get("success"):
        raise HTTPException(
            status_code=gemini_analysis["status_code"],
            detail=gemini_analysis["error"],
        )
        return {
            "success": True,
            "analysis": gemini_analysis["analysis"],
        }

    return {
        "message": "Analysis completed successfully",
        "job_description": job_description,
        "resume_filename": resume.filename,
        "resume_result": parsed_resume_text,
        "gemini_analysis_message": gemini_analysis['success'],
        "gemini_analysis_result": gemini_analysis["analysis"],
        # "analysis_result": analysis_result,  # Uncomment when you have actual analysis logic
    }