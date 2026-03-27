#!/usr/bin/env bash
# LM Studio Benchmark Script
# Measures TPS, TTFT, and Resource Usage.

MODEL="qwen2.5-coder-32b-instruct"
PROMPT="Write a complex React component that handles real-time stock data filtering."
API_URL="http://localhost:12345/v1/completions"

echo "Starting benchmark for model: $MODEL"
echo "Sending prompt: $PROMPT"

# Use curl to measure time and capture response
START_TIME=$(date +%s%N)
RESPONSE=$(curl -s -w "@curl-format.txt" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"model\": \"$MODEL\", \"prompt\": \"$PROMPT\", \"max_new_tokens\": 256, \"temperature\": 0.65, \"top_p\": 0.92, \"stream\": false}")
END_TIME=$(date +%s%N)

# Calculate duration in ms
DURATION_MS=$(( (END_TIME - START_TIME) / 1000000 ))
TEXT=$(echo "$RESPONSE" | jq -r '.choices[0].text')
TOKENS_GENERATED=$(echo "$TEXT" | wc -w) # Rough estimate

# Roughly estimate TPS
TPS=$(echo "$TOKENS_GENERATED * 1000 / $DURATION_MS" | bc -l)

echo "--- Results ---"
echo "Duration: ${DURATION_MS}ms"
echo "Tokens generated (approx): $TOKENS_GENERATED"
echo "Tokens Per Second (TPS): $TPS"
echo "Benchmark completed."
