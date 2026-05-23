from fastapi import APIRouter

router = APIRouter()



# Endpoint for getting JD from front end to send to openAI for analysis
@router.post("/job-description")
def post_job_description(job_description: str):
    # Placeholder for actual analysis logic
    return {
        "message": "Job description received successfully",
        "job_description": job_description,
    }

# @router.get("/job-description")
# def get_job_description():
#     # Placeholder for actual retrieval logic
#     return {
#         "job_description": "This is a sample job description."
#     }