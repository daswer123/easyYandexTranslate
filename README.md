# easyYandexTranslate
https://www.npmjs.com/package/easyyandextranslate

# Overview
This is an unofficial wrapper for the Yandex Translate API, implemented in JavaScript. It allows you to translate large bodies of text or files while adhering to the API's text size limitation.

# Install
To install the necessary dependencies, run the following command:

`npm i easyyandextranslate`

# Usage
You can use this wrapper to translate text, translate a file and write the translation to another file, or translate a file and return the translation as a string.

## Here are examples of how to use these functions:

`const { translate, translateFile, translateFileToText } = require('easyyandextranslate')`

`translate('Hello world', 'ru').then(console.log);  // Привет мир`

`translateFile('input.txt', 'output.txt', 'ru').then(() => {`
`  console.log('File translated successfully');`
`});`

`translateFileToText('input.txt', 'ru').then(console.log);  // prints the translation of file content`

# Functions
**translate(text, targetLang, sourceLang = "")**

Translates the given text from sourceLang to targetLang. If sourceLang isn't specified, the function will automatically detect the source language. Returns a promise that resolves to the translated text.

**translateFile(inputFilePath, outputFilePath, targetLang, sourceLang = "")**
Translates the content of the file at inputFilePath from sourceLang to targetLang and writes the translation to a new file at outputFilePath. If sourceLang isn't specified, the function will automatically detect the source language. Returns a promise that resolves when the operation is completed.

**translateFileToText(inputFilePath, targetLang, sourceLang = "")**
Translates the content of the file at inputFilePath from sourceLang to targetLang and returns the translation as a string. If sourceLang isn't specified, the function will automatically detect the source language. Returns a promise that resolves to the translated text.

# Limitations
This wrapper splits the input text into chunks to adhere to the Yandex Translate API's text size limitation. As a result, the translation might not be completely accurate if a sentence is split between two chunks.

# Disclaimer
This is an unofficial wrapper and is not affiliated with or endorsed by Yandex. The Yandex Translate API is a service provided by Yandex, and this wrapper merely provides an interface to access that service.


