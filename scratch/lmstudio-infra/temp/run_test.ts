import { factorial } from "./factorial";

try {
    console.log("Testing factorial(5)...");
    const result = factorial(5);
    console.log(`Result: ${result}`);
    if (result === 120) {
        console.log("SUCCESS: Factorial(5) is 120");
    } else {
        console.log(`FAILURE: Factorial(5) is ${result}, expected 120`);
    }

    console.log("Testing factorial(0)...");
    if (factorial(0) === 1) {
        console.log("SUCCESS: Factorial(0) is 1");
    }

    console.log("Testing negative input...");
    try {
        factorial(-1);
        console.log("FAILURE: Factorial(-1) did not throw");
    } catch (e) {
        console.log(`SUCCESS: Caught expected error: ${e.message}`);
    }
} catch (error) {
    console.error(`ERROR during test: ${error.message}`);
}
