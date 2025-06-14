package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"strings"
)

// URLProcessRequest is the request body for URL processing
type URLProcessRequest struct {
	URL       string `json:"url"`
	Operation string `json:"operation"`
}

// URLProcessResponse is the response body for URL processing
type URLProcessResponse struct {
	ProcessedURL string `json:"processed_url"`
}

// ProcessURLHandler godoc
// @Summary      Process and clean up a URL
// @Description  Cleans up or redirects a URL based on the operation type (canonical, redirection, all).
// @Accept       json
// @Produce      json
// @Param        request body URLProcessRequest true "URL and operation"
// @Success      200 {object} URLProcessResponse
// @Failure      400 {object} map[string]string
// @Router       /process-url [post]
func ProcessURLHandler(w http.ResponseWriter, r *http.Request) {
	var req URLProcessRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Invalid request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if req.URL == "" || req.Operation == "" {
		http.Error(w, "Missing url or operation", http.StatusBadRequest)
		return
	}

	processed, err := processURL(req.URL, req.Operation)
	if err != nil {
		log.Printf("Processing error: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(URLProcessResponse{ProcessedURL: processed})
}

func processURL(rawurl, op string) (string, error) {
	u, err := url.Parse(rawurl)
	if err != nil {
		return "", err
	}

	switch op {
	case "canonical":
		u.RawQuery = ""
		u.Fragment = ""
		u.Path = strings.TrimRight(u.Path, "/")
		return u.String(), nil
	case "redirection":
		u.Host = "www.byfood.com"
		u.Scheme = "https"
		u.RawQuery = ""
		u.Fragment = ""
		u.Path = strings.TrimRight(u.Path, "/")
		return strings.ToLower(u.String()), nil
	case "all":
		u.Host = "www.byfood.com"
		u.Scheme = "https"
		u.RawQuery = ""
		u.Fragment = ""
		u.Path = strings.TrimRight(u.Path, "/")
		return strings.ToLower(u.String()), nil
	default:
		return "", &url.Error{Op: "process", URL: rawurl, Err: err}
	}
}
