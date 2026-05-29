from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "running", 
        "message": "backend is running smoothly"
        }