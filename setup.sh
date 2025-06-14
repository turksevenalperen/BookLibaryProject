#!/bin/bash

echo "Backend bağımlılıkları yükleniyor..."
cd backendFile
go mod tidy

echo "Frontend bağımlılıkları yükleniyor..."
cd ../frontend
npm install

echo ".env dosyası oluşturuluyor..."
cd ../backendFile
if [ ! -f .env ]; then
  cp .env.example .env
  echo ".env dosyası oluşturuldu."
else
  echo ".env zaten mevcut, atlanıyor."
fi

echo "Kurulum tamamlandı!"