# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

EXPOSE 3000

# Install the application dependencies and build
RUN npm install
RUN npm install -g @nestjs/cli
RUN npm run build

# Define the entry point for the container
CMD ["npm", "start"]