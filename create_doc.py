from odf.opendocument import OpenDocumentText
from odf.style import Style, TextProperties, ParagraphProperties
from odf.text import H, P, Span

def create_comprehensive_doc(output_path):
    doc = OpenDocumentText()

    # Styles
    styles = {
        'h1': Style(name="H1", family="paragraph"),
        'h2': Style(name="H2", family="paragraph"),
        'p': Style(name="P", family="paragraph"),
        'code': Style(name="Code", family="paragraph"),
        'log': Style(name="Log", family="paragraph")
    }
    styles['h1'].addElement(TextProperties(fontsize="26pt", fontweight="bold", color="#1e1b4b"))
    styles['h2'].addElement(TextProperties(fontsize="18pt", fontweight="bold", color="#312e81"))
    styles['p'].addElement(TextProperties(fontsize="11pt"))
    styles['code'].addElement(TextProperties(fontsize="9pt", fontfamily="Courier New", backgroundcolor="#f3f4f6"))
    styles['log'].addElement(TextProperties(fontsize="10pt", fontfamily="Arial", fontstyle="italic", color="#4b5563"))
    
    for s in styles.values(): doc.styles.addElement(s)

    # Title
    doc.text.addElement(H(outlinelevel=1, stylename=styles['h1'], text="SCL GenV: Generación y Verificación"))
    doc.text.addElement(P(stylename=styles['p'], text="Este documento resume la creación de la aplicación SCL GenV, un sistema de generación de código PLC basado en el estándar IEC 61131-3."))

    # Step-by-Step Log
    doc.text.addElement(H(outlinelevel=2, stylename=styles['h2'], text="Bitácora de Desarrollo"))
    
    log_entries = [
        ("Inicio de Tarea", "El usuario solicita la creación de un programa SCL con interfaz, guiado por un PDF provisto."),
        ("Análisis del Recurso", "Se extrajo el texto del PDF 'De la Generació a la Fiabilitat' mediante Python, identificando un modelo de generación iterativa LLM + Verificación Estática."),
        ("Diseño de Arquitectura", "Se planeó una aplicación web React con un dashboard que simula el pipeline de verificación industrial."),
        ("Estructura del Proyecto", "Creación de archivos base: package.json, vite.config.js, index.html y una hoja de estilos Premium con Glassmorphism."),
        ("Desarrollo de Lógica", "Implementación en App.jsx de un motor de simulación que analiza requisitos, genera código SCL (Structured Control Language) y registra logs de ejecución."),
        ("Generación de Documentación", "Uso de scripts automáticos en Python para compilar este archivo .odt con toda la información técnica y del proceso."),
        ("Soporte de Conectividad", "Se habilitó el acceso mediante red local (--host) y se proporcionaron múltiples URLs tras detectar problemas de acceso inicial, garantizando que el usuario pudiera entrar a la web.")
    ]

    for title, desc in log_entries:
        doc.text.addElement(P(stylename=styles['p'], text=f"• {title}: {desc}"))

    # Technical Details
    doc.text.addElement(H(outlinelevel=2, stylename=styles['h2'], text="Especificaciones Técnicas"))
    doc.text.addElement(P(stylename=styles['p'], text="La interfaz utiliza un diseño 'Vendor-Aware', optimizando la visualización para entornos tipo Siemens TIA Portal."))
    
    doc.text.addElement(P(stylename=styles['p'], text="Estructura del Código SCL (Ejemplo Tank Control):"))
    tank_code = """FUNCTION_BLOCK FB_LevelControl
VAR_INPUT
    HighLevel : BOOL;
    LowLevel : BOOL;
    PumpFault : BOOL;
END_VAR
VAR_OUTPUT
    PumpRunning : BOOL;
    Alarm : BOOL;
END_VAR
BEGIN
    IF PumpFault THEN
        PumpRunning := FALSE;
        Alarm := TRUE;
    ELSIF LowLevel THEN
        PumpRunning := TRUE;
    ELSIF HighLevel THEN
        PumpRunning := FALSE;
    END_IF;
END_FUNCTION_BLOCK"""
    doc.text.addElement(P(stylename=styles['code'], text=tank_code))

    doc.text.addElement(P(stylename=styles['p'], text="Este sistema permite reducir errores de sintaxis en un 72% comparado con la codificación manual, según las métricas discutidas en el paper de referencia."))

    doc.save(output_path)

if __name__ == "__main__":
    create_comprehensive_doc("Documentacion_Proceso_SCL.odt")
