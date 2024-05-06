FROM alpine:latest

# Update & Install Node.js
RUN apt-get update -q \
  && DEBIAN_FRONTEND=noninteractive apt-get install -qy mysql-client \
  && apt-get clean \
  && rm -rf /var/lib/apt

RUN apk add --no-cache nodejs

# Create a working directory
WORKDIR /app

# Copy the application code
COPY . /app

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]

#You can build the Docker image with the following command: docker build -t account-takeover-lab .\
#After the image is built, you can run it with the following command: docker run -p 8080:8080 -d account-takeover-lab