# node-inkscape [![npm version](https://badge.fury.io/js/node-inkscape.svg)](https://badge.fury.io/js/node-inkscape) [![SugarHai](https://img.shields.io/badge/farts-sprinkles-E482B5.svg)](http://www.sugarhai.com/images/sprinklepoo-gif.gif)
Run inkscape from NodeJS. inkscape installation is required.

## Install

```sh
# If using as a dependancy in your module
npm install node-inkscape --save

# ...or for use in your project
npm install node-inkscape --save-dev
```
*Prior to using node-inkscape, you must [install inkscape](https://inkscape.org/).*

## What&rsquo;s inkscape?
Inkscape is professional quality vector graphics software which runs on Windows, Mac OS X and Linux. It is used by design professionals and hobbyists worldwide, for creating a wide variety of graphics such as illustrations, icons, logos, diagrams, maps and web graphics. Inkscape uses the [W3C][1] open standard [SVG][2] (Scalable Vector Graphics) as its native format, and is free and open-source software.

## So Then What&rsquo;s Node-inkscape Do?

Node-inkscape is simply a bridge between the inkscape CLI (command-line interface) and NodeJS.

## Usage

## Usage

**inkscape ( _src_ _args_ [_options_] )**

### Parameters

#### src
> The _src_ can be either the location of a file (_./content/file.docx_) or a string of textual input ("_# Hello, Bananas_").

#### args
> The same list of arguments that inkscape accepts on the command line. Arguments are accepted as either a full String or as an Array.

#### options
> The options parameter accepts and passes along a Node Child_Process.Spawn object and is completely optional. View [a _complete_ list of inkscape options on the inkscape website](http://inkscape.org/README.html#options) or pull it from the command-line by typing:  
```$ inkscape -h```



### Examples of Using node-inkscape

Converting a image.jpg file to a image.png

```js
// In EcmaScript 5...

var nodeinkscape = require('node-inkscape');
var src, args;

src = './image.jpg';

// Arguments can be either a single string:
args = '--export-png=image.png';
// Or in an array of strings -- careful no spaces are present:
args = ['--export-png','image.png'];


// Call inkscape
nodeinkscape(src, args)
.then(res=>{
  console.log(res);  
}).catch(err=>{
    console.error('Oh No: ',err);  
});
```
```js
// In ES-6 (ES-2015)
import nodeinkscape from 'node-inkscape'

src = './image.jpg';

// Arguments can be either a single string:
args = '--export-png=image.png';
// Or in an array of strings -- careful no spaces are present:
args = ['--export-png','image.png'];


// Call inkscape
await nodeinkscape(src, args);
```

Converting a image.jpg file to a image.png

```js
var inkscape = require('node-inkscape');

src = './image.jpg';

// Arguments can be either a single string:
args = '--export-png=image.png';
// Or in an array of strings -- careful no spaces are present:
args = ['--export-png','image.png'];

// Call inkscape
await inkscape(src, args);
```


## License

Copyright &copy; Asaf Cohen  
Licensed under the MIT License


