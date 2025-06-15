#!/bin/bash

echo "Installing backend dependencies..."
cd backendFile
go mod tidy

echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Creating .env file..."
cd ../backendFile
if [ ! -f .env ]; then
  cp .env.example .env
  echo ".env file created."
else
  echo ".env already exists, skipping."
fi

echo "Setup complete!"