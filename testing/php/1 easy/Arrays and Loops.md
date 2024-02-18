# Arrays and Loops in PHP

## Question

```php
<?php
$colors = ["red", "green", "blue", "yellow"];

// Question 1
// Answer: blue
echo "Question 1: " . $colors[2] . PHP_EOL;

// Question 2
// Answer: red, green, blue, yellow, purple
$colors[] = "purple";
echo "Question 2: " . implode(", ", $colors) . PHP_EOL;

// Question 3
// Answer: 5
$colorCount = count($colors);
echo "Question 3: " . $colorCount . PHP_EOL;

// Question 4
// Answer: red green blue yellow purple
foreach ($colors as $color) {
    echo $color . " ";
}
?>
```

## Answer

1. `What is the output of "Question 1"?`
- The output of "Question 1" is `blue`. This is because `$colors[2]` refers to the element at index 2 in the `$colors` array, and arrays in PHP are zero-indexed.

2. `What is the output of "Question 2"?`
- The output of "Question 2" is `red, green, blue, yellow, purple`. This is because a new element "purple" is added to the end of the `$colors` array using `$colors[] = "purple"`, and then the `implode` function is used to concatenate and display the elements of the array separated by commas.

3. `What is the output of "Question 3"?`
- The output of "Question 3" is `5`. This is because the `count` function is used to determine the number of elements in the `$colors` array, and there are five elements in the array after "purple" is added.

4. `What is the output of "Question 4"?`
- The output of "Question 4" is `red green blue yellow purple`. This is because a `foreach` loop is used to iterate over each element of the `$colors` array, and each element is echoed with a space in between.
