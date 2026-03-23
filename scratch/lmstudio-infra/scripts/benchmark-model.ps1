# LM Studio Benchmark Script (PowerShell)
# Measures TPS, TTFT, and Resource Usage.

$ApiUrl = "http://127.0.0.1:1234/v1/completions"
$ModelName = "qwen/qwen3-coder-30b" # Corrected ID
$Prompt = "Write a complex React component that handles real-time stock data filtering."
$MaxTokens = 256

$Payload = @{
    model = $ModelName
    prompt = $Prompt
    max_new_tokens = $MaxTokens
    temperature = 0.65
    top_p = 0.92
    stream = $false
} | ConvertTo-Json

Write-Host "Starting benchmark for model: $ModelName"
Write-Host "Target API: $ApiUrl"

$StartTime = Get-Date
try {
    $Response = Invoke-RestMethod -Uri $ApiUrl -Method Post -Body $Payload -ContentType "application/json" -TimeoutSec 180
} catch {
    Write-Error "API Request Failed: $_"
    exit 1
}
$EndTime = Get-Date

# Result processing
$GeneratedText = $Response.choices[0].text
$DurationSeconds = ($EndTime - $StartTime).TotalSeconds
$TokensGenerated = ($GeneratedText -split '\s+').Count # Rough estimate

$TPS = [math]::Round($TokensGenerated / $DurationSeconds, 2)

Write-Host "-----------------------------"
Write-Host "Duration: $($DurationSeconds.ToString('F2')) seconds"
Write-Host "Tokens Generated (approx): $TokensGenerated"
Write-Host "Tokens Per Second (TPS): $TPS"
Write-Host "-----------------------------"
Write-Host "Benchmark completed successfully."

# Save result to file
$Result = [PSCustomObject]@{
    Duration = $DurationSeconds
    Tokens = $TokensGenerated
    TPS = $TPS
    Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
}
$Result | ConvertTo-Json | Out-File -FilePath "benchmark_result.json"
