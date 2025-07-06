# Use an official Node.js runtime as a parent image
FROM node:18

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the backend folder
COPY backend/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Your app binds to port 3000, so expose it
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "backend/server.js" ]

