# Arithmetic Operations in PHP

## Question

```php
// Question 1
// Answer: 12 8 20 5
<?php
function calculate($a, $b) {
    $sum = $a + $b;
    $difference = $a - $b;
    $product = $a * $b;
    $quotient = $a / $b;

    return [$sum, $difference, $product, $quotient];
}

$inputA = 10;
$inputB = 2;
$result = calculate($inputA, $inputB);

foreach ($result as $value) {
    echo $value . " ";
}
?>
```

## Answer

1. `What does the PHP script do?`
- The script defines a function called `calculate` that takes two parameters, `$a` and `$b`, performs basic arithmetic operations (addition, subtraction, multiplication, and division) on them, and returns an array containing the results. The script then calls this function with inputs `$inputA` and `$inputB`, stores the result in the `$result` variable, and finally, prints each element of the result array using a `foreach` loop.

2. `What will be the output of the script?`
- The output of the script will be: `12 8 20 5`. This is because the `calculate` function is called with inputs `$inputA = 10` and `$inputB = 2`, and the results of the arithmetic operations are stored in the `$result` array. The `foreach` loop then iterates over each element of the array and prints them.

3. `Explain the values in the output.`
- The values in the output correspond to the results of the arithmetic operations performed in the `calculate` function:
Sum: $inputA + $inputB = 10 + 2 = 12
Difference: $inputA - $inputB = 10 - 2 = 8
Product: $inputA * $inputB = 10 * 2 = 20
Quotient: $inputA / $inputB = 10 / 2 = 5

4. `What would happen if you change the values of $inputA and $inputB to 5 and 0, respectively?`
- If you change the values to `$inputA = 5` and `$inputB = 0`, a division by zero error would occur in the `calculate` function when trying to compute the quotient. Division by zero is undefined in mathematics, and PHP will throw a warning or error in such cases.
