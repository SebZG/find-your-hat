const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
   constructor(field = [[]]) {
      this.field = field;
      this.X = 0;
      this.Y = 0;
      this.field[0][0] = pathCharacter;
   }

   print() {
      this.field.forEach(row =>
         console.log(row.join('')))
         .join("\n");
   }


}