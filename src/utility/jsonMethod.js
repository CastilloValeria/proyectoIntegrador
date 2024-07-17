const fs = require ("fs");
const path = require("path");

// lectura
const getJson = (fileName) => {
const json = fs.readFileSync(`${__dirname}/../data/${fileName}.json`, "utf-8")
const products = JSON.parse(json);
return products;
}

// escritura
const setJson = (array,fileName) => {
    const json = JSON.stringify(array);
    fs.writeFileSync(`${__dirname}/../data/${fileName}.json`,json,'utf-8')

}

module.exports = {setJson, getJson}