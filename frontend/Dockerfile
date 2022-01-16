# Use an official Python runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /Portal/UI

COPY package*.json ./
RUN npm install

COPY . .

# Make port 80 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=docker-dev PORT=3000

# Run app.py when the container launches
CMD ["npm", "start"]