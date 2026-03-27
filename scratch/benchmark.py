import requests
import json
import time
import sys
import os

def benchmark():
    base_url = "http://localhost:1234/v1/chat/completions"
    headers = {"Content-Type": "application/json"}
    payload = {
        "model": "qwen/qwen3-coder-next",
        "messages": [
            {
                "role": "user",
                "content": "Génère TaskMonitor monorepo local complet :\n\nStructure :\n/frontend (React Vite TS Tailwind)\n/backend (Express TS Prisma SQLite)\n/prisma/schema.prisma (User Task Project)\n/scripts/dev.sh (npm run dev fullstack)\n\nFonctionnalités :\n\nDashboard tokens used (graph 24h)\n\nCRUD Tasks + QuickAdd NLP\n\nResponsive Tailwind dark mode\n\nCode 100% fonctionnel :\n\nnpm install\n\nnpx prisma migrate dev\n\nnpm run dev \u2192 localhost:3000\n\nTon setup RTX 4090 + Ryzen 5800X XMP = beast !"
            }
        ],
        "temperature": 0.1,
        "max_tokens": 3000,
        "stream": True
    }

    print(f"Starting request to {base_url}...")
    start_time = time.time()
    
    try:
        response = requests.post(base_url, headers=headers, json=payload, stream=True)
        response.raise_for_status()
        
        full_text = ""
        token_count = 0
        
        with open("benchmark_output.md", "w", encoding="utf-8") as f:
            for line in response.iter_lines():
                if line:
                    line_str = line.decode("utf-8")
                    if line_str.startswith("data: "):
                        content = line_str[6:]
                        if content == "[DONE]":
                            break
                        try:
                            data = json.loads(content)
                            delta = data['choices'][0]['delta'].get('content', '')
                            if delta:
                                f.write(delta)
                                f.flush()
                                full_text += delta
                                token_count += 1
                                # Log roughly every 50 tokens to stdout
                                if token_count % 50 == 0:
                                    print(f"Received {token_count} tokens...", flush=True)
                        except Exception as e:
                            print(f"Error parsing json: {e}")

        end_time = time.time()
        duration = end_time - start_time
        tps = token_count / duration if duration > 0 else 0
        
        results = {
            "duration": duration,
            "token_count": token_count,
            "tokens_per_second": tps
        }
        
        with open("benchmark_results.json", "w") as f:
            json.dump(results, f, indent=2)
            
        print(f"\nBenchmark Finished!")
        print(f"Tokens: {token_count}")
        print(f"Duration: {duration:.2f}s")
        print(f"TPS: {tps:.2f} t/s")
        
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    benchmark()
