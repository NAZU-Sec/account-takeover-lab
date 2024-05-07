FROM alpine:latest

# Update and install Node.js and npm
RUN apk update && apk add nodejs npm vim nano findutils coreutils openssh-client wget tree sed tcpdump nmap

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Shell & Start the application
CMD ["/bin/sh", "-c", "npm start && /bin/sh"]

######################### Install #######################

### You can build the Docker image with the following command: 
# docker build -t account-takeover-lab .

### After the image is built, you can run it with the following command: 
# docker run -p 3000:3000 -d account-takeover-lab