@echo off

echo Installing backend dependencies...
cd backendFile
go mod tidy

echo Installing frontend dependencies...
cd ..\frontend
npm install

echo Creating .env file...
cd ..\backendFile
if not exist .env (
  copy .env.example .env
  echo .env file created.
) else (
  echo .env already exists, skipping.
)

echo Setup complete!
pause