from mongodb import get_connection, get_submissions_collection

if __name__ == "__main__":
    db = get_connection()
    submissions = get_submissions_collection()

    result = submissions.insert_one({
        "filename": "test_resume.pdf",
        "parsed_text": "This is a test resume.",
        "job_title": "Software Engineer",
        "company_name": "Test Company"
    })

    print("Inserted test document ID:", result.inserted_id)

