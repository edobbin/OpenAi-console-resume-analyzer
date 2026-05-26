from mongodb import get_connection, get_submissions_collection

#submission for first review and analysis
def create_submission(filename: str, parsed_text: str, job_title: str, company_name: str):
    
    submissions = get_submissions_collection()
    submission = {
        "filename": filename,
        "parsed_text": parsed_text,
        "job_title": job_title,
        "company_name": company_name
    }
    result = submissions.insert_one(submission)
    return result.inserted_id

db = get_connection()