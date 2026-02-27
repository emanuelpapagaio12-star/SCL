import pypdf
import sys

def extract_text(pdf_path, output_path):
    try:
        reader = pypdf.PdfReader(pdf_path)
        with open(output_path, 'w', encoding='utf-8') as f:
            for page in reader.pages:
                f.write(page.extract_text())
                f.write("\n" + "="*80 + "\n")
        print(f"Successfully extracted text to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    pdf_file = "De la Generació a la Fiabilitat_ Un Model Integrat per a la Creació i Verificació de Codis IEC 61131-3.pdf"
    output_file = "pdf_content.txt"
    extract_text(pdf_file, output_file)
