#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * OLLAMA FORCE PROTOCOL - Execution Governor Script
 * Date: 22 Mars 2026
 * Mission: Delegate heavy generation to local expert models.
 */

const modelMap = {
    'code': 'qwen2.5-coder:32b',
    'logic': 'ministral-3:14b',
    'vision': 'llama3.2-vision:latest',
    'polish': 'mistral-nemo',
    'fast': 'llama3.2:1b'
};

const alias = process.argv[2];
const promptInput = process.argv[3];

if (!alias || !promptInput) {
    console.error("Usage: node ollama-force.js <alias|model> <prompt_content|file_path>");
    console.log("Aliases available:", Object.keys(modelMap).join(', '));
    process.exit(1);
}

const model = modelMap[alias] || alias;
let prompt = promptInput;

// If promptInput is a path to a file, read it. Otherwise use it directly.
if (fs.existsSync(promptInput)) {
    prompt = fs.readFileSync(promptInput, 'utf8');
}

try {
    process.stderr.write(`🌀 Delegating to local expert: ${model}...\n`);
    
    // Using stdin to avoid CLI argument length limits and escape issues
    const result = execSync(`ollama run ${model}`, { 
        input: prompt,
        encoding: 'utf8',
        maxBuffer: 50 * 1024 * 1024 // 50MB for large codebases
    });
    
    process.stdout.write(result);
} catch (error) {
    process.stderr.write(`❌ Error in OLLAMA FORCE execution: ${error.message}\n`);
    process.exit(1);
}
