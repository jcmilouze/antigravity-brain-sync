# QUICK TPS TEST (PowerShell)
$ApiUrl = "http://127.0.0.1:1234/v1/completions"
$ModelName = "qwen/qwen3-coder-30b"
$Prompt = "Écris une fonction TypeScript asynchrone pour calculer le factoriel récursivement."
$MaxTokens = 128

$Payload = @{
    model = $ModelName
    prompt = $Prompt
    max_new_tokens = $MaxTokens
    temperature = 0.6
    top_p = 0.92
    stream = $false
} | ConvertTo-Json

Write-Host "Re-testing TPS with optimized hardware settings..."

$StartTime = Get-Date
try {
    $Response = Invoke-RestMethod -Uri $ApiUrl -Method Post -Body $Payload -ContentType "application/json" -TimeoutSec 60
} catch {
    Write-Error "API Request Failed: $_"
    exit 1
}
$EndTime = Get-Date

$DurationSeconds = ($EndTime - $StartTime).TotalSeconds
$GeneratedText = $Response.choices[0].text
$TokensGenerated = ($GeneratedText -split '\s+').Count

$TPS = [math]::Round($TokensGenerated / $DurationSeconds, 2)

Write-Host "-----------------------------"
Write-Host "Tokens: $TokensGenerated"
Write-Host "Duration: $($DurationSeconds.ToString('F2'))s"
Write-Host "Resulting TPS: $TPS"
Write-Host "-----------------------------"
