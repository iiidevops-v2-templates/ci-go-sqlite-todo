# Start from the official Golang image as a builder stage
FROM golang:1.23rc1-alpine AS builder

# Set necessary environment variables for Go
ENV GO111MODULE=on \
    CGO_ENABLED=1 \
    GOOS=linux \
    GOARCH=amd64

# Install build dependencies, including GCC
RUN apk update && \
    apk add --no-cache gcc musl-dev

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code into the container
COPY app .

# Build the Go app
RUN go build -o todoapp .

# Use a minimal Alpine image as the base image for the final stage
FROM alpine:latest

# Add a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory inside the container
WORKDIR /app

# Copy the binary built in the previous stage to the final image
COPY --from=builder /app/todoapp .

# Copy the templates/static directories to the final image
COPY app/templates /app/templates
COPY app/static /app/static

# Set permissions to the app directory
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

EXPOSE 8080

# Command to run the executable
CMD ["./todoapp"]