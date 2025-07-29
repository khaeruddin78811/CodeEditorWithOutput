# Code Editor with Output

A web-based code editor with live output preview and download capabilities for images and videos. Built with React, Monaco Editor, Pyodide, and Node.js.

## Features
- Advanced code editor with syntax highlighting, autocompletion, and theme support (powered by Monaco Editor).
- Live output preview for HTML, CSS, JavaScript, and Python (using Pyodide).
- Download output as PNG image (via html2canvas) or MP4 video (via FFmpeg.js).
- Responsive two-panel interface (editor and output).
- Safe code execution with isolated-vm (server-side) and Pyodide (client-side).

## Prerequisites
- Node.js (>=14.x)
- npm (>=6.x)
- A modern browser (Chrome, Firefox, or Edge)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/CodeEditorWithOutput.git
   cd CodeEditorWithOutput
