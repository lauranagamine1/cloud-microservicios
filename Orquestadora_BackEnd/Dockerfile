# Etapa 1: Usa una imagen oficial de Python
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY requirements.txt .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido (código fuente)
COPY . .

# Exponer el puerto (ajusta si lo cambiarás)
EXPOSE 4043

# Comando para levantar la API (ajusta si cambias el puerto interno)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "4043"]
