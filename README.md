# Digital Pathology Tutorial System

This repository contains a comprehensive, interactive tutorial system for digital pathology, combining a modern web-based frontend with a powerful JupyterLab environment for hands-on coding exercises. The entire system is containerized with Docker for easy setup and consistent execution.

## ✨ Features

- **Interactive Learning Paths**: Step-by-step tutorials from beginner to advanced topics.
- **Integrated Jupyter Environment**: Run code and complete exercises directly in the browser.
- **Modular & Scalable**: Clean, modular architecture makes it easy to add new tutorials and features.
- **Containerized with Docker**: Get up and running with two simple commands, regardless of your local setup.
- **Rich Notebooks**: Includes tutorials on image processing, data visualization, correlation analysis, and dimensionality reduction (UMAP/t-SNE).
- **Shared Utilities**: Reusable Python scripts for validation and configuration across notebooks.

## 📂 Project Structure

The project has been refactored into a modular monorepo-style structure:

```
dp-t25/
├── apps/
│   ├── frontend/         # React + Vite frontend application
│   └── jupyter/          # JupyterLab environment configuration
├── docker/
│   ├── Dockerfile.frontend # Dockerfile for the frontend service
│   ├── Dockerfile.jupyter  # Dockerfile for the Jupyter service
│   └── nginx.conf        # Nginx configuration for the frontend
├── notebooks/
│   ├── image-processing-tutorials/
│   └── visualization-tutorials/
├── shared/
│   ├── utils.py          # Shared Python helper functions
│   └── validation.py     # Notebook validation framework
├── docker-compose.yml    # Orchestrates all services
├── start.sh              # Script to build and start the system
└── stop.sh               # Script to stop the system
```

- **`apps/`**: Contains the source code for the individual services (frontend and Jupyter).
- **`docker/`**: Holds the Dockerfiles and related configuration for building the service images.
- **`notebooks/`**: All Jupyter tutorial notebooks are stored here and mounted into the JupyterLab container.
- **`shared/`**: Common Python code shared across notebooks to avoid repetition.

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Launch

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd dp-t25
    ```

2.  **Make the scripts executable:**
    (This only needs to be done once)
    ```bash
    chmod +x start.sh stop.sh
    ```

3.  **Start the application:**
    ```bash
    ./start.sh
    ```
    This script will:
    - Build the `frontend` and `jupyter` Docker images.
    - Start the containers in detached mode.
    - Display the status and access URLs.

## 💻 Usage

Once the application is running, you can access the services:

- **Frontend UI**: Open your browser and navigate to [**http://localhost:80**](http://localhost:80)
- **JupyterLab**: Open your browser and navigate to [**http://localhost:8888**](http://localhost:8888)

From the frontend UI, clicking on a notebook link will open the corresponding file in the running JupyterLab instance.

## 🛑 Stopping the Application

To stop all running services and remove the containers, simply run:

```bash
./stop.sh
```

## 🛠️ Development

### Adding a New Notebook

1.  Create a new `.ipynb` file inside the appropriate subdirectory in `notebooks/`.
2.  Update the course structure in `apps/frontend/src/App.tsx` to include a link to your new notebook.
3.  Restart the application (`./stop.sh` and then `./start.sh`) to see the changes.

### Modifying the Frontend

1.  Make changes to the React components in `apps/frontend/src/`.
2.  The changes will be reflected after you rebuild the containers with `./start.sh`. For a faster development workflow, you can run the frontend locally by navigating to `apps/frontend` and running `npm install && npm run dev`.

## ⚙️ Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend/Notebooks**: Python, JupyterLab
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx
- **Key Python Libraries**: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, UMAP-learn, OpenCV, OpenSlide.
