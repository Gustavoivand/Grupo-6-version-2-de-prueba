"""
Mini servidor Flask OPCIONAL para desarrollo local del track BASIC.
NO es parte del producto final. Solo facilita servir archivos estáticos.

Uso:
    python server.py

Acceder a:
    http://localhost:8000

Nota:
    Este servidor es SOLO para desarrollo local.
    NO incluye backend real, BD ni autenticación.
    En producción, usar GitHub Pages o cualquier servidor estático.
"""

from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    """Servir index.html como página principal"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Servir archivos estáticos"""
    try:
        return send_from_directory('.', path)
    except:
        return "Archivo no encontrado", 404

if __name__ == '__main__':
    print("=" * 70)
    print("  BOOKMATE - Servidor de Desarrollo BÁSICO")
    print("=" * 70)
    print()
    print("  Servidor iniciado exitosamente!")
    print()
    print("  Accede a: http://localhost:8000")
    print("  Presiona CTRL+C para detener el servidor")
    print()
    print("  NOTA IMPORTANTE:")
    print("  - Este servidor es SOLO para desarrollo local")
    print("  - NO incluye backend real, BD ni autenticación")
    print("  - Solo sirve archivos estáticos (HTML, CSS, JS, JSON)")
    print()
    print("=" * 70)
    
    app.run(host='0.0.0.0', port=8000, debug=True)

