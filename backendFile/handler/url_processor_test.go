package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestProcessURLHandler_AllOperation(t *testing.T) {
	reqBody := URLProcessRequest{
		URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
		Operation: "all",
	}
	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest("POST", "/process-url", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	ProcessURLHandler(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("Expected status 200, got: %d", w.Code)
	}

	var resp URLProcessResponse
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}

	expected := "https://www.byfood.com/food-experiences"
	if resp.ProcessedURL != expected {
		t.Errorf("Expected: %s, Got: %s", expected, resp.ProcessedURL)
	}
}

func TestProcessURLHandler_CanonicalOperation(t *testing.T) {
	reqBody := URLProcessRequest{
		URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
		Operation: "canonical",
	}
	body, _ := json.Marshal(reqBody)
	req := httptest.NewRequest("POST", "/process-url", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	ProcessURLHandler(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("Expected status 200, got: %d", w.Code)
	}

	var resp URLProcessResponse
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}

	expected := "https://BYFOOD.com/food-EXPeriences"
	if resp.ProcessedURL != expected {
		t.Errorf("Expected: %s, Got: %s", expected, resp.ProcessedURL)
	}
}

func TestProcessURLHandler_InvalidBody(t *testing.T) {
	req := httptest.NewRequest("POST", "/process-url", bytes.NewBuffer([]byte("invalid json")))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	ProcessURLHandler(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400, got: %d", w.Code)
	}
}
