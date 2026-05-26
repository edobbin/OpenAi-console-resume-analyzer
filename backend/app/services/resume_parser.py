import fitz  # PyMuPDF

def parse_resume(content: bytes, filename: str) -> str:
    filename = filename.lower()

    if filename.endswith(".txt"):
        return parse_txt(content)
    elif filename.endswith(".docx"):
        return parese_docx(content)
    elif filename.endswith(".pdf"):
        return parse_pdf(content)

    return "Parsing for this file type is not supported yet."


def parse_txt(content: bytes) -> str:
    return content.decode("utf-8")

def parese_docx(content: bytes) -> str:
    # Placeholder for DOCX parsing logic
    return "DOCX parsing is not implemented yet."

def parse_pdf(content: bytes) -> str:
    pdf = fitz.open(stream=content, filetype="pdf")
    text = ""
    for page in pdf:
        text += page.get_text()
    pdf.close()
    return text