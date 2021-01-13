const generateRandomId = () => {
  let result = [];
  let i = 0;
  while(result.length < 6) {
    i % 2 === 0 && i !== 1 ? result.push(String.fromCharCode(Math.floor(Math.random() * 26) + 97)) : 
    i % 3 === 0 || i === 1 ? result.push(String.fromCharCode(Math.floor(Math.random() * 9) + 48)) :
    result.push(String.fromCharCode(Math.floor(Math.random() * 26) + 65))
    i++;
  }
  return result.join('');
};

module.exports = { generateRandomId };