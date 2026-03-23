import { factorial } from "./factorial";

test("factorial of 5 is 120", () => {
    expect(factorial(5)).toBe(120);
});

test("factorial of 0 is 1", () => {
    expect(factorial(0)).toBe(1);
});

test("negative input throws", () => {
    expect(() => factorial(-3)).toThrow("Factorial is not defined for negative numbers");
});
