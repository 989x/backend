# String Manipulation and Control Structures in PHP

## Question

```php
<?php
// Question 1
// Answer: The length of the word is 5.
$word = "Hello";
$length = strlen($word);
// Output the length of the word
echo "Question 1: The length of the word is " . $length . PHP_EOL;

// Question 2
// Answer: Uppercase phrase: GOOD MORNING, EVERYONE!
$phrase = "Good morning, everyone!";
$upperPhrase = strtoupper($phrase);
// Output the uppercase version of the phrase
echo "Question 2: Uppercase phrase: " . $upperPhrase . PHP_EOL;

// Question 3
// Answer: Reversed number: 54321
$number = 12345;
$reversedNumber = strrev($number);
// Output the reversed version of the number
echo "Question 3: Reversed number: " . $reversedNumber . PHP_EOL;

// Question 4
// Answer: ABCD
$names = ["Alice", "Bob", "Charlie", "David"];
// Output the initials of each name
echo "Question 4: ";
foreach ($names as $name) {
    echo $name[0];
}
echo PHP_EOL;
?>
```

## Answer

1. `What is the output of "Question 1"?`
- The output of "Question 1" is `The length of the word is 5`. This is because `strlen` is used to find the length of the string "Hello," which has 5 characters.

2. `What is the output of "Question 2"?`
- The output of "Question 2" is `Uppercase phrase: GOOD MORNING, EVERYONE!`. This is because `strtoupper` is used to convert the entire string to uppercase.

3. `What is the output of "Question 3"?`
- The output of "Question 3" is `Reversed number: 54321`. This is because `strrev` is used to reverse the string representation of the number 12345.

4. `What is the output of "Question 4"?`
- The output of "Question 4" is `ABCD`. This is because a `foreach` loop is used to iterate over each name in the array, and the initial character of each name is echoed.
