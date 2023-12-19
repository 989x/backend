# Advanced PHP Concepts

## Question

```php
<?php
// Question 1
// Answer: The username is JohnDoe.
class User {
    private $username;

    public function __construct($username) {
        $this->username = $username;
    }

    public function getUsername() {
        // Return the private username property
        return $this->username;
    }
}

$user = new User("JohnDoe");
// Output the username using the getUsername method
echo "Question 1: The username is " . $user->getUsername() . PHP_EOL;

// Question 2
// Answer: Addition result is 8, and multiplication result is 24.
class MathOperations {
    public static function add($a, $b) {
        // Return the sum of two numbers
        return $a + $b;
    }

    public static function multiply($a, $b) {
        // Return the product of two numbers
        return $a * $b;
    }
}

$resultAdd = MathOperations::add(5, 3);
$resultMultiply = MathOperations::multiply(4, 6);
// Output the results of addition and multiplication
echo "Question 2: Addition result is " . $resultAdd . ", and multiplication result is " . $resultMultiply . PHP_EOL;

// Question 3
// Answer: Sorted words by length: kiwi, apple, banana, orange
function customSort($array) {
    // Use usort to sort the array based on the length of the strings
    usort($array, function ($a, $b) {
        return strlen($a) <=> strlen($b);
    });
    return $array;
}

$words = ["apple", "banana", "kiwi", "orange"];
$sortedWords = customSort($words);
// Output the sorted words by length
echo "Question 3: Sorted words by length: " . implode(", ", $sortedWords) . PHP_EOL;

// Question 4
// Answer: This is a log message.
class Logger {
    private static $instance;

    private function __construct() {
        // Private constructor to prevent instantiation
    }

    public static function getInstance() {
        // Create a single instance of Logger using the singleton pattern
        if (!self::$instance) {
            self::$instance = new Logger();
        }
        return self::$instance;
    }

    public function log($message) {
        // Output log messages
        echo $message . PHP_EOL;
    }
}

$logger = Logger::getInstance();
$logger->log("Question 4: This is a log message.");

// Question 5
// Answer: Result of multiplying 5 by 2 is 10.
// Closure to create a function that multiplies a given number by a factor
$multiplyByFactor = function ($factor) {
    return function ($number) use ($factor) {
        return $number * $factor;
    };
};

// Example usage of the closure
$multiplyByTwo = $multiplyByFactor(2);
echo "Question 5: Result of multiplying 5 by 2 is " . $multiplyByTwo(5) . PHP_EOL;
?>
```

## Answer

1. `What is the output of "Question 1"?`
- `Answer:` The output of "Question 1" is `The username is JohnDoe`. This is because an instance of the `User` class is created with the username "JohnDoe," and the `getUsername` method is called to retrieve and output the username.

2. `What is the output of "Question 2"?`
- `Answer:` The output of "Question 2" is `Addition result is 8, and multiplication result is 24`. This is because the `MathOperations` class contains static methods for addition and multiplication, and these methods are used to perform operations and output the results.

3. `What is the output of "Question 3"?`
- `Answer:` The output of "Question 3" is `Sorted words by length: kiwi, apple, banana, orange`. The `customSort` function sorts the array of words based on their lengths using the `usort` function with a custom comparison function.

4.` What is the output of "Question 4"?`
- `Answer:` The output of "Question 4" is `This is a log message.`. The `Logger` class is implemented as a singleton, and an instance of the logger is obtained using the `getInstance` method. The `log` method is then called to output the log message.

5. `What is the output of "Question 5"?`
- `Answer:` The output of "Question 5" is `Result of multiplying 5 by 2 is 10`. A closure is created using the `$multiplyByFactor` variable, which takes a factor as a parameter and returns another closure. The returned closure, when called with a number, multiplies the number by the specified factor. In this case, it's used to multiply 5 by 2.
