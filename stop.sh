#!/bin/bash
#
# Digital Pathology Tutorial System Stop Script
#
# This script stops and removes the Docker containers.

# Exit on any error
set -e

# --- Configuration ---
COMPOSE_FILE="docker-compose.yml"

# --- Helper Functions ---
function print_header() {
    echo "========================================================================"
    echo " $1"
    echo "========================================================================"
}

function stop_containers() {
    print_header "Stopping Docker Containers"
    if [ -f "$COMPOSE_FILE" ]; then
        docker compose -f "$COMPOSE_FILE" down
        if [ $? -ne 0 ]; then
            echo "❌ Failed to stop containers."
            exit 1
        fi
        echo "✅ Services stopped and removed successfully."
    else
        echo "⚠️ docker-compose.yml not found. No action taken."
    fi
}

# --- Main Script ---
stop_containers
