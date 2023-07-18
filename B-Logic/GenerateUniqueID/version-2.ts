/*
  version 1.1

  3034-19hv-7520, 2616-u077-0154, 0xd9-6830-p1g2
*/ 

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

/*
  version 1.2
  
  536z-917r-265y, 793c-543u-117d, 245z-912i-259t
  if probability 0.7 - 0.8, position lock 0000x-0000x-0000x
*/ 

function generateUniqueId() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  function getRandomCharacter(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function generateRandomString(length, probability) {
    let result = '';
    const numberCount = Math.floor(length * probability);
    const letterCount = length - numberCount;
    for (let i = 0; i < numberCount; i++) {
      result += getRandomCharacter(numbers);
    }
    for (let i = 0; i < letterCount; i++) {
      result += getRandomCharacter(letters);
    }
    return result;
  }

  const set1 = generateRandomString(4, 0.7);
  const set2 = generateRandomString(4, 0.7);
  const set3 = generateRandomString(4, 0.7);

  return `${set1}-${set2}-${set3}`;
}

console.log(generateUniqueId());

/*
  version 1.3

  9545-2083-97q5, 8969-46t5-096s, 32s1-659d-p407
*/ 

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
