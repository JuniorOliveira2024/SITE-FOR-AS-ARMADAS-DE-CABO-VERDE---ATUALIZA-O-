/* Gera src/js/core/master-data.js a partir de src/master.html (MASTER PAGE).
   Uso:  node build-master.js      (o "npm start" já executa este passo) */
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'src');
const html = fs.readFileSync(path.join(src, 'master.html'), 'utf8');

function grab(id) {
  const m = html.match(new RegExp('<template id="' + id + '">([\\s\\S]*?)</template>'));
  if (!m) throw new Error('master.html: falta <template id="' + id + '">');
  return m[1].trim();
}

const data = { navbar: grab('master-navbar'), footer: grab('master-footer') };
const out = '/* GERADO por build-master.js a partir de master.html — não editar à mão. */\n'
  + 'window.FA_MASTER = ' + JSON.stringify(data).replace(/</g, '\\u003c') + ';\n';
fs.writeFileSync(path.join(src, 'js', 'core', 'master-data.js'), out);
console.log('master-data.js atualizado (' + out.length + ' bytes)');
