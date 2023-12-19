# Advanced PHP Concepts III

## Question

```php
<?php
// Question 1
// Answer: Sum result is 10, and multiplication result is 24
class Calculator {
    public function add(...$numbers) {
        // Calculate the sum of an array of numbers
        return array_sum($numbers);
    }

    public function multiply(...$numbers) {
        // Calculate the product of an array of numbers using array_reduce
        return array_reduce($numbers, function ($carry, $item) {
            return $carry * $item;
        }, 1);
    }
}

$calculator = new Calculator();
$sumResult = $calculator->add(2, 3, 5);
$multiplyResult = $calculator->multiply(2, 4, 3);
// Output the results of addition and multiplication
echo "Question 1: Sum result is $sumResult, and multiplication result is $multiplyResult" . PHP_EOL;

// Question 2
// Answer: File content: Hello, world!
class FileHandler {
    private $file;

    public function __construct($filename) {
        // Open the file for appending and reading
        $this->file = fopen($filename, 'a+');
    }

    public function write($content) {
        // Write content to the file
        fwrite($this->file, $content . PHP_EOL);
    }

    public function read() {
        // Read the content of the file
        fseek($this->file, 0);
        return fread($this->file, filesize($this->file));
    }

    public function __destruct() {
        // Close the file when the object is destroyed
        fclose($this->file);
    }
}

$fileHandler = new FileHandler("example.txt");
$fileHandler->write("Hello, world!");
$fileContent = $fileHandler->read();
// Output the content of the file
echo "Question 2: File content: $fileContent" . PHP_EOL;

// Question 3
// Answer: Fibonacci sequence up to 20: 0 1 1 2 3 5 8 13
// Fibonacci generator function that yields values up to a specified limit
function fibonacciGenerator($limit) {
    $a = 0;
    $b = 1;
    while ($a <= $limit) {
        yield $a;
        [$a, $b] = [$b, $a + $b];
    }
}

echo "Question 3: Fibonacci sequence up to 20: ";
// Output the Fibonacci sequence up to 20
foreach (fibonacciGenerator(20) as $number) {
    echo $number . " ";
}
echo PHP_EOL;

// Question 4
// Answer: Flattened array: 1, 2, 3, 4, 5, 6
// Function to flatten a nested array
function flattenArray($array) {
    $result = [];
    array_walk_recursive($array, function($value) use (&$result) {
        $result[] = $value;
    });
    return $result;
}

$nestedArray = [1, [2, [3, 4], 5], 6];
$flattenedArray = flattenArray($nestedArray);
// Output the flattened array
echo "Question 4: Flattened array: " . implode(", ", $flattenedArray) . PHP_EOL;

// Question 5
// Answer: Result of closure: 50
// Demonstrating the use of a closure that captures variables from the outer scope
$outerVariable = 10;
$closure = function ($innerVariable) use ($outerVariable) {
    return $innerVariable * $outerVariable;
};

$innerValue = 5;
$result = $closure($innerValue);
echo "Question 5: Result of closure: $result" . PHP_EOL;
?>
```

## Answer

1. `What is the output of "Question 1"?`
- `Answer:` The output of "Question 1" is `Sum result is 10, and multiplication result is 24`. The `Calculator` class has methods for addition and multiplication. The `add` method uses `array_sum` to calculate the sum of an array, and the `multiply` method uses `array_reduce` to calculate the product.

2. `What is the output of "Question 2"?`
- `Answer:` The output of "Question 2" is `File content: Hello, world!`. The `FileHandler` class is used to write the string "Hello, world!" to a file named "example.txt" and then read the content from the file.

3. `What is the output of "Question 3"?`
- `Answer:` The output of "Question 3" is `Fibonacci sequence up to 20: 0 1 1 2 3 5 8 13`. The `fibonacciGenerator` function is a generator that yields Fibonacci numbers up to the specified limit of 20.

4. `What is the output of "Question 4"?`
- `Answer:` The output of "Question 4" is `Flattened array: 1, 2, 3, 4, 5, 6`. The `flattenArray` function is used to flatten a nested array (in this case, `$nestedArray`), and the flattened result is then echoed.

5. `What is the output of "Question 5"?`
- `Answer:` The output of "Question 5" is `Result of closure: 50`. The closure captures the `$outerVariable` from the outer scope and multiplies it by the `$innerValue` passed as an argument. The result is echoed.
