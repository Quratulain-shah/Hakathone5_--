
import os
from dotenv import load_dotenv
import subprocess
import sys

# Load environment variables from .env.bak
dotenv_path = os.path.join(os.getcwd(), 'backend', '.env.bak')
load_dotenv(dotenv_path=dotenv_path, override=True)

# Construct the uvicorn command
uvicorn_command = [
    sys.executable, '-m', 'uvicorn', 'main:app',
    '--host', '0.0.0.0',
    '--port', '8000',
    '--app-dir', os.path.join(os.getcwd(), 'backend', 'src')
]

# Run uvicorn
print(f"Starting backend with command: {' '.join(uvicorn_command)}")
subprocess.run(uvicorn_command)
