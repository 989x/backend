# Functions and Conditional Statements in PHP

## Question

```php
<?php
// Question 1
// Answer: The number is odd.
function isEven($number) {
    return $number % 2 === 0;
}

$sampleNumber = 15;
if (isEven($sampleNumber)) {
    echo "Question 1: The number is even." . PHP_EOL;
} else {
    echo "Question 1: The number is odd." . PHP_EOL;
}

// Question 2
// Answer: The maximum value is 56.
function findMax($array) {
    $max = $array[0];
    foreach ($array as $value) {
        if ($value > $max) {
            $max = $value;
        }
    }
    return $max;
}

$numbers = [12, 45, 8, 27, 56];
echo "Question 2: The maximum value is " . findMax($numbers) . PHP_EOL;

// Question 3
// Answer: Your grade is passing.
$grade = 75;
echo "Question 3: Your grade is " . ($grade >= 60 ? "passing" : "failing") . PHP_EOL;
?>
```

## Answer

1. `What is the output of "Question 1"?`
- The output of "Question 1" is `The number is odd.`. This is because the `isEven` function checks if the `$sampleNumber` is even or odd, and since 15 is an odd number, the `else` block is executed.

2. `What is the output of "Question 2"?`
- The output of "Question 2" is `The maximum value is 56.`. The `findMax` function is used to find the maximum value in the `$numbers` array, and the result is echoed.

3. `What is the output of "Question 3"?`
- The output of "Question 3" is `Your grade is passing.`. This is because the expression `$grade >= 60 ? "passing" : "failing"` is a ternary conditional statement that checks if `$grade` is greater than or equal to 60. If true, it echoes "passing"; otherwise, it echoes "failing."
