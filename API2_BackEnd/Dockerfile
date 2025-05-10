FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ejecuta app/main.py --> app.main:app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
