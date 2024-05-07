const fs = require('fs');
const path = require('path');

const file = 'newText.txt';
const content = 'Hello world!';

fs.writeFile(file, content, (err) => {
    if (err) throw err;
    console.log(content);
});




