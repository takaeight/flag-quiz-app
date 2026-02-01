import socket
import http.server
import socketserver
import os

# Port to serve on
PORT = 8000

# Find the best local IP address
def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Doesn't actually connect, just determines route
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

IP_ADDRESS = get_ip()

print(f"\n\n{'='*40}")
print(f"  🚀 えいとくんの iPad であそぶじゅんびOK！")
print(f"  iPadの Safari (サファリ) をひらいて、")
print(f"  したの すうじ をいれてね！")
print(f"\n  http://{IP_ADDRESS}:{PORT}")
print(f"\n{'='*40}\n")
print(" (おわるときは、この画面で Ctrl と C を同時におしてね)")

# Allow playing in the current directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler
# Prevent caching so updates appear immediately
Handler.extensions_map.update({
    ".js": "application/javascript",
})

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.shutdown()
