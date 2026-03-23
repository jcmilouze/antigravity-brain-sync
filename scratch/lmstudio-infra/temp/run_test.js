function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

const n = 5;
const result = factorial(n);
console.log(`Testing factorial(${n})...`);
if (result === 120) {
    console.log("SUCCESS: Factorial(5) is 120");
} else {
    console.log(`FAILURE: Factorial(5) is ${result}, expected 120`);
}

try {
    console.log("Testing negative input...");
    factorial(-1);
    console.log("FAILURE: Factorial(-1) did not throw");
} catch (e) {
    console.log(`SUCCESS: Caught expected error: ${e.message}`);
}
