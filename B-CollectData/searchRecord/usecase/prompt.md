### Ask

Am using node express typescript mongodb this is my controller file
Want to edit the conditions for entering the SearchRecord database.
Found that when people type messages like this with strange letters

```
"Image from \"next/image\"; import { useRouter } from \"next/router\";"
```

This message will also be entered into the database. I would like that if I check incoming messages that contain information like this, they will not enter the SearchRecord database.

Want to prevent foreign characters If you find that there are foreign characters in the letter sent, it will not be entered into the SearchRecord database.

### ChatGPT

To prevent foreign characters and special symbols in the keyword, you can use a regular expression to check if the keyword contains only alphanumeric characters and spaces. Here's an updated version of your code:

<controller.ts />

In this example, the `isValidKeyword` function uses a regular expression (`unwantedCharsPattern`) to check if the keyword contains any characters other than alphanumeric characters and spaces. If it does, the function returns false, indicating that the keyword is not valid.

This approach will prevent keywords that contain characters like `/, >, <, {, }, ", ?, !` and any other non-alphanumeric characters from being saved in the `SearchRecord` database. Adjust the regular expression as needed for your specific requirements.