# Use an official Node runtime based on Alpine Linux
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files to leverage Docker cache for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app listens on (adjust if necessary)
EXPOSE 3000

# Start the backend server in development mode
CMD ["npm", "run", "dev"]
