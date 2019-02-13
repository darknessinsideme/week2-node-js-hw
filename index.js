'use strict';

const fs = require('fs');

const DEFAULT_ENCODING = 'utf8';
const STORE_FILE_NAME  = 'store.txt';

function readFile() {
  fs.readFile(STORE_FILE_NAME,DEFAULT_ENCODING,(err, data) => {
    let arr =  data.split(" ") 
    if (arr.length > 0) {
      console.log(`To-Dos:\n`)
      let arrIndex = arr.length - 1
      for (let index = 0; index < arrIndex; index++) {
        console.log(`> ${arr[index]}`)
        
      }
    }else{
      console.log(`To-Dos:\n There is noting inside the list`)
    }
      
})};


function appendFile(...text) {
  return  fs.appendFile(
      STORE_FILE_NAME,
      `${text.join(' ')} `
    )
}

function remove(arrIndex){
  return fs.readFile(STORE_FILE_NAME,DEFAULT_ENCODING,(err, data) => {
    let arr =  data.split(" ") 
    arr.splice(arrIndex[0], 1)
    let fake = arr.filter(function(str) {
      return /\S/.test(str);
  });
    // console.log(arr)
    let hardWork = ""
    fake.map((item)=> {
      hardWork += item + " "
    })
    console.log(hardWork)
    fs.writeFile(STORE_FILE_NAME, hardWork)
    readFile()
   });
}
function removeAll(){
  return fs.readFile(STORE_FILE_NAME,DEFAULT_ENCODING,(err, data) => {
    let arr =  data.split(" ") 
    let until = arr.length + 1;
    arr.splice(0,until)
    // console.log(arr)
    let hardWork = ""
    arr.map((item)=> {
      hardWork += item + " "
    })
    console.log(hardWork)
    fs.writeFile(STORE_FILE_NAME, hardWork, err => console.log(err))
    
   })
   
}
function printHelp() {
  console.log(`Usage: node index.js [options]
HackYourFuture Node.js Week 2 - homeWork To-Do App
Options:
  read          read all to-dos
  write [to-do] add to-do
  help          show this help text
  `);
}

/* Or we could destructure the array instead
 * const [,, cmd, ...args] = process.argv;
 */
const cmd  = process.argv[2];
const args = process.argv.slice(3);

switch (cmd) {
  case 'list':
    readFile()
    break;

  case 'add':
  console.log(process.argv)
    // appendFile(...args)
    // readFile()
    break;
  case "remove":
    remove(process.argv.slice(3, 4))
    
    break;
  case 'removeall':
    removeAll() 
    readFile()
    break;  
  case 'help':
  default:
    printHelp();
    break;
}