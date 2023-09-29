import axios from 'axios';
import qs from 'querystring';
import fs from "fs"

const MAX_CHARS = 500;

async function translateChunk(text, sourceLang, targetLang) {
    const lang = sourceLang ? `${sourceLang}-${targetLang}` : targetLang;

    const data = qs.stringify({
        'text': text,
        'lang': lang
    });

    const config = {
        method: 'post',
        url: 'https://translate.yandex.net/api/v1/tr.json/translate?srv=ios&ucid=9676696D-0B56-4F13-B4D5-4A3DA2A3344D&sid=1A5A10A952AB4A3B82533F44B87EE696&id=1A5A10A952AB4A3B82533F44B87EE696-0-0',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {
        const response = await axios(config);
        if (response.data.code !== 200) throw new Error('Translation failed');
        return response.data.text[0];
    } catch (error) {
        console.error(error);
    }
}

function splitText(text) {
    let chunks = [];
    let startPos = 0;

    while (startPos < text.length) {
        let endPos = startPos + MAX_CHARS;
        if (endPos < text.length) {
            // Найти последнее полное предложение
            endPos = text.lastIndexOf('. ', endPos);
            if (endPos === -1) endPos = startPos + MAX_CHARS;
            else endPos += 1;
        }

        chunks.push(text.slice(startPos, endPos));
        startPos = endPos;
    }

    return chunks;
}

export async function translate(text, targetLang, sourceLang = "") {
    const chunks = splitText(text);
    const translatedChunks = await Promise.all(chunks.map(chunk => translateChunk(chunk, targetLang, sourceLang)));
    return translatedChunks.join(' ');
}

export async function translateFile(inputFilePath, outputFilePath, targetLang, sourceLang = "") {
    try {
        const text = fs.readFileSync(inputFilePath, 'utf-8');
        const translatedText = await translate(text, targetLang, sourceLang);
        fs.writeFileSync(outputFilePath, translatedText, 'utf-8');
    } catch (error) {
        console.error(error);
    }
}

export async function translateFileToText(inputFilePath, targetLang, sourceLang = "") {
    try {
        const text = fs.readFileSync(inputFilePath, 'utf-8');
        return await translate(text, targetLang, sourceLang = "");
    } catch (error) {
        console.error(error);
    }
}

// Использование функции
// translate(`Tomonlar"AI bilan iPhone" yaratish loyihasini muhokama qilmoqdalar`, 'ru')
//     .then(result => console.log(result))
//     .catch(error => console.log(error));