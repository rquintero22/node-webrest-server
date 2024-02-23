import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
    console.log(req.url);

   if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);
    return;
   } else if(req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
   } else if(req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
   }

   const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8');
   res.end(responseContent);
});

server.listen(8080,  () => {
    console.log('Server running on 8080');
});