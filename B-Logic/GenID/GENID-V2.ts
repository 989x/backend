function generateUniqueId() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  function getRandomCharacter(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function generateRandomString(length, probability) {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.random();
      if (randomNumber <= probability) {
        result += getRandomCharacter(numbers);
      } else {
        result += getRandomCharacter(letters);
      }
    }
    return result;
  }

  const set1 = generateRandomString(4, 0.8);
  const set2 = generateRandomString(4, 0.8);
  const set3 = generateRandomString(4, 0.8);

  return `${set1}-${set2}-${set3}`;
}

console.log(generateUniqueId());
