#!/bin/bash
#
# Digital Pathology Tutorial System Start Script
#
# This script builds and starts the Docker containers for the
# frontend and JupyterLab services.

# Exit on any error
set -e

# --- Configuration ---
COMPOSE_FILE="docker-compose.yml"
FRONTEND_SERVICE="frontend"
JUPYTER_SERVICE="jupyter"

# --- Helper Functions ---
function print_header() {
    echo "========================================================================"
    echo " $1"
    echo "========================================================================"
}

function check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker could not be found. Please install Docker."
        exit 1
    fi
    # Check for 'docker compose' command
    if ! docker compose version &> /dev/null; then
        echo "❌ 'docker compose' could not be found. Please ensure it's installed and part of your Docker setup."
        exit 1
    fi
}

function build_containers() {
    print_header "Building Docker Images"
    echo "Building frontend and jupyter containers..."
    docker compose -f "$COMPOSE_FILE" build --parallel
    if [ $? -ne 0 ]; then
        echo "❌ Docker build failed."
        exit 1
    fi
    echo "✅ Docker images built successfully."
}

function start_containers() {
    print_header "Starting Docker Containers"
    echo "Starting services in detached mode..."
    docker compose -f "$COMPOSE_FILE" up -d
    if [ $? -ne 0 ]; then
        echo "❌ Failed to start containers."
        exit 1
    fi
    echo "✅ Services started successfully."
}

function show_status() {
    print_header "Application Status"
    docker compose -f "$COMPOSE_FILE" ps
    echo ""
    echo "------------------------------------------------------------------------"
    echo "✅ Digital Pathology Tutorial System is now running!"
    echo "   - Frontend UI: http://localhost:80"
    echo "   - JupyterLab:  http://localhost:8888"
    echo "------------------------------------------------------------------------"
    echo "To stop the services, run: ./stop.sh"
    echo "To view logs, run: docker compose logs -f"
}

# --- Main Script ---
check_docker
build_containers
start_containers
show_status
