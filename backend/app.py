from flask import Flask
from flask import jsonify
import json
# from threat_assessment_ondemand import threatAssessmentPipeline

app = Flask(__name__)

@app.route("/", methods=["GET"])
def put():
    return {
        "stuff": "thing"
    }

# def algo():
#     return "stuff"

THREAT_ASS_PATH = "threat_assessments_beautified.json"

@app.route("/static_json", methods=["GET"])
def put_static():
    with open(THREAT_ASS_PATH) as f:
        data = json.load(f)
    return {
        "data": data
    }

# @app.route("/demand", methods=["GET"])
# def demand(url)


if __name__ == "__main__":
    app.run(debug=True)
