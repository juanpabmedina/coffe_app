from http.server import BaseHTTPRequestHandler, HTTPServer
import socketserver
import json
import cgi

hostName = "192.168.10.100"

PORT = 8080



class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
    def do_HEAD(self):
        self._set_headers()
        
    # GET sends back a Hello world message
    def do_GET(self):
        f = open('info.json')
        data = json.load(f)
        self._set_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
        
    # POST echoes the message adding a JSON field
    def do_POST(self):
        ctype, pdict = cgi.parse_header(self.headers.get('content-type'))
        
        # refuse to receive non-json content
        if ctype != 'text/html':
            self.send_response(400)
            self.end_headers()
            return
            
        # read the message and convert it into a python dictionary
        length = int(self.headers.get('content-length'))
        message = json.loads(self.rfile.read(length))
        print(message)
        
        # add a property to the object, just to mess with data
        message['received'] = 'ok'
        
        # send the message back
        self._set_headers()
        self.wfile.write(json.dumps(message).encode('utf-8'))
        
def run(server_class=HTTPServer, handler_class=Server, port=PORT):
    server_address = (hostName, port)
    httpd = server_class(server_address, handler_class)
    
    print("Server started http://%s:%s" % (hostName, port))
    httpd.serve_forever()
    
if __name__ == "__main__":
  
    from sys import argv
    
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()