@echo off

echo Backend bagimliliklari yukleniyor...
cd backendFile
go mod tidy

echo Frontend bagimliliklari yukleniyor...
cd ..\frontend
npm install

echo .env dosyasi olusturuluyor...
cd ..\backendFile
if not exist .env (
  copy .env.example .env
  echo .env dosyasi olusturuldu.
) else (
  echo .env zaten mevcut, atlaniyor.
)

echo Kurulum tamamlandi!
pause