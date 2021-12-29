import fetch from  'node-fetch'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reducedFetch = async (url) => (
  /**
   * @param {String} url
   * @returns {Promise}
   */
  await fetch(url, {
      method: 'GET',
      'content-type': 'application/json'
    })

  )

const createArrayOfFile = (dir) => {
  const myReadStream = fs.createReadStream(dir, 'utf-8')
  myReadStream.on('data', chunk => {
    console.log(chunk.split('\r\n'));
  })
}


const searchDomains = async (domains, prefix) => {
  /**
   * @param {Array[String]} domains
   * @param {String} prefix
   * @returns {Array[Boolean]}
   */
  // 'https://administracion.donweb.com/apiv3/compras/dominio/estaDisponible/manololais.com'
  const DONWEB_API_URL = 'https://administracion.donweb.com/apiv3/compras/dominio/estaDisponible/'
  const urlDomains = domains.map(domain => DONWEB_API_URL + domain + prefix)
  const domainPromises = urlDomains.map(reducedFetch)
  console.log('primer');
  const res = await Promise.all(domainPromises)
  const jsonPromises = res.map(r => r.json())
  console.log('segunda');
  const res2 = await Promise.all(jsonPromises)
  console.log(res2.map(r => r.jsonMC.respuesta[0].status));
}

createArrayOfFile(__dirname + '/domain.txt')
console.log(__dirname);
