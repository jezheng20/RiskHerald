from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route("/", methods=["PUT"])
def send():
    return {
        "stuff": "thing"
    }

# def algo():
#     return "stuff"

if __name__ == "__main__":
    app.run(debug=True)
