# Use the official Python base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV MONGO_DB_VERSION=7.0.14
ENV MONGO_SHELL_VERSION=2.3.1
ENV MONGO_COMPASS_VERSION=1.44.3

# Install system dependencies and MongoDB
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg \
    lsb-release \
    software-properties-common && \
    # Add MongoDB GPG key and repository
    curl -fsSL https://pgp.mongodb.com/server-${MONGO_DB_VERSION}/mongodb-server-${MONGO_DB_VERSION}.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg] https://repo.mongodb.org/apt/debian $(lsb_release -cs) mongodb-org ${MONGO_DB_VERSION}" | tee /etc/apt/sources.list.d/mongodb-org.list && \
    # Install MongoDB
    apt-get update && \
    apt-get install -y \
    mongodb-org-server=${MONGO_DB_VERSION} \
    mongodb-mongosh=${MONGO_SHELL_VERSION} \
    mongodb-compass=${MONGO_COMPASS_VERSION} && \
    # Clean up
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the application code to the container
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Start MongoDB and run the FastAPI application using uvicorn
CMD ["sh", "-c", "mongod --bind_ip_all & python unicornserverFastapi.py"]
