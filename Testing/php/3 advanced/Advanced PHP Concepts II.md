# Advanced PHP Concepts II

## Question

```php
<?php
// Question 1
// Answer: Result of the database query: (Assuming the query returns data)
class DatabaseConnection {
    private static $instance;
    private $connection;

    private function __construct() {
        // Private constructor to prevent instantiation
        $this->connection = new PDO("mysql:host=localhost;dbname=mydatabase", "username", "password");
    }

    public static function getInstance() {
        // Create a single instance of DatabaseConnection using the singleton pattern
        if (!self::$instance) {
            self::$instance = new DatabaseConnection();
        }
        return self::$instance;
    }

    public function query($sql) {
        // Execute a query and return the result
        $statement = $this->connection->query($sql);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}

$db = DatabaseConnection::getInstance();
$queryResult = $db->query("SELECT * FROM users");
// Output the result of the database query
echo "Question 1: Result of the database query: " . print_r($queryResult, true) . PHP_EOL;

// Question 2
// Answer: Area of the circle is approximately 78.54
interface Shape {
    public function area();
}

class Circle implements Shape {
    private $radius;

    public function __construct($radius) {
        $this->radius = $radius;
    }

    public function area() {
        // Calculate the area of the circle
        return M_PI * pow($this->radius, 2);
    }
}

$circle = new Circle(5);
// Output the area of the circle
echo "Question 2: Area of the circle is " . $circle->area() . PHP_EOL;

// Question 3
// Answer: User's name is JaneDoe
spl_autoload_register(function ($class) {
    // Autoload classes from the 'classes' directory
    include "classes/" . $class . ".class.php";
});

$user = new User("JaneDoe");
// Output the name of the user
echo "Question 3: User's name is " . $user->getName() . PHP_EOL;

// Question 4
// Answer: Email sent successfully.
class EmailSender {
    public function sendEmail($to, $subject, $message, $callback) {
        // Code for sending email
        $success = true;
        
        // Callback function is executed after sending email
        if ($success && is_callable($callback)) {
            $callback();
        }
    }
}

$emailSender = new EmailSender();
$emailSender->sendEmail("john@example.com", "Meeting", "Meeting at 2 PM", function () {
    // Output a message if the email is sent successfully
    echo "Question 4: Email sent successfully." . PHP_EOL;
});

// Question 5
// Answer: Hello, Alice
// Trait usage example
trait Greet {
    public function sayHello() {
        return "Hello, ";
    }
}

class Person {
    use Greet;
    private $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function greet() {
        return $this->sayHello() . $this->name;
    }
}

$person = new Person("Alice");
// Output the result of the trait usage
echo "Question 5: " . $person->greet() . PHP_EOL;
?>
```

## Answer

1. `What is the output of "Question 1"?`
- `Answer`: The output of "Question 1" is the result of a database query. It fetches all rows from the "users" table using the `query` method of the `DatabaseConnection` class. The specific output will depend on the content of the "users" table.

2. `What is the output of "Question 2"?`
- `Answer:` The output of "Question 2" is `Area of the circle is 78.539816339745`. The `Circle` class implements the `Shape` interface, providing a method to calculate the area of a circle based on its radius.

3. `What is the output of "Question 3"?`
- `Answer:` The output of "Question 3" is `User's name is JaneDoe`. An instance of the `User` class is created with the name "JaneDoe," and the `getName` method is called to retrieve and output the user's name.

4. `What is the output of "Question 4"?`
- `Answer:` The output of "Question 4" is `Email sent successfully`. The `EmailSender` class sends an email and executes a callback function if the email is sent successfully. In this case, the callback function echoes a success message.

5. `What is the output of "Question 5"?`
- `Answer:` The output of "Question 5" is `Hello`, `Alice`. The `Greet` trait provides the `sayHello` method, and the `Person` class uses this trait. The `greet` method in the `Person` class combines the result of `sayHello` with the person's name.
