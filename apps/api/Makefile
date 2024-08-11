# Build the application
all: build

build:
	@echo "Building..."

	@go build -o main cmd/core/main.go

# Run the application
run:
	@go run cmd/core/main.go

# Clean the binary
clean:
	@echo "Cleaning..."
	@rm -f main

# Live reload
watch:
	@if command -v air > /dev/null; then \
		RUN_MIGRATIONS=1 air; \
		echo "Watching...";\
	else \
		echo "Air is not installed. Run 'go install github.com/air-verse/air@latest' to install Air";\
	fi

.PHONY: all build run clean watch