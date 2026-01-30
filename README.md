# Collaborative Story Server

A lightweight C-based client–server application that allows multiple users to collaboratively build a shared story in real time. Clients connect over TCP, send commands, and contribute lines to a central story managed by the server.

## Features
- Multi-client TCP server written in C  
- Shared story state synchronized across all connected clients  
- Command-based interaction model  
- Built-in logging for server activity and debugging  
- Modular structure for future expansion (commands, story logic, networking)

## Getting Started

### Requirements
- GCC or Clang  
- Make (optional, depending on your build setup)  
- Docker (optional, for containerized deployment)

### Building & Running
```bash
gcc -o server src/server/*.c
gcc -o client src/client/*.c
./server
./client <server-ip> <port>
```

### Commands
JOIN <username>           - Registers your username with the server
GENRE <genre>             - Selects the story genre (or use GENRE RANDOM)
SESSION CREATE <name>     - Creates a new collaborative writing session
SESSION JOIN <name>       - Joins an existing session
LIST SESSIONS             - Lists all active sessions
QUIT                      - Disconnects from the server
VIEW                      - Displays the story for the current session
WRITE <text>              - Adds text to the story
EXIT SESSION              - Leaves the current session
