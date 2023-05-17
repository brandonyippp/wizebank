const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validateSin = (sin) => {
  if (sin.length !== 9) {
    return { output: false, reason: "invalid length" };
  }

  const digits = Array.from(String(sin), Number);

  if (digits.every((digit) => digit === 0)) {
    return { output: false, reason: "sum of SIN digits was 0" };
  }

  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    const value = digits[i] * 2;
    const isSecondDigit = (i + 1) % 2 === 0;

    if (isSecondDigit && value > 9) {
      sum += Math.floor(value / 10) + (value % 10);
    } else {
      sum += isSecondDigit ? value : digits[i];
    }
  }

  return {
    output: sum % 10 === 0,
    reason: sum % 10 === 0 ? "success" : "sum of SIN digits undivisible by 10",
  };
};

//take in user input
const askSIN = () => {
  rl.question("Enter a SIN number or 'exit' to exit program.\n", (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const result = validateSin(input);

    console.log(
      `Your SIN of \"${input}\" is ${
        result.output ? "valid" : `invalid due to ${result.reason}`
      }.\n------------------------------------------------------------------------------`
    );

    askSIN();
  });
};

askSIN();

/** Valid SIN's
 * - 046454286
 * - 123456789
 * - 333333333
 * - 800500200
 */

/** Invalid SIN's
 * - 12345678 (length !== 9)
 * - 000000000 (sum not divisible by 10)
 * - 987654321 (sum not divisible by 10)
 * - 1234567890 (length !== 9)
 */
