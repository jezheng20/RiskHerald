from flask import Flask
from flask import jsonify
import json
from threat_assessment_ondemand import threatAssessmentPipeline
from flask import request
from flask_cors import CORS, cross_origin
import spacy
import nltk
from nltk.corpus import stopwords

app = Flask(__name__)
CORS(app)

NER_MODEL = spacy.load('en_core_web_sm', 
                       disable=["tok2vec", "tagger", "parser", "attribute_ruler"])
EMB_MODEL = spacy.load('en_core_web_md')
KEYWORD_ANCHORS = ['war', 'violence', 'attack', 'death', 'casualty', 'danger']
STOPWORDS = stopwords.words('english')
THREAT_THRESHOLDS = (2.0, 4.0)

nltk.download('omw-1.4')

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


@app.route("/threat_ass_demand", methods=["GET", "POST"])
def threat_ass():
    print("ASFSA")
    a = request.get_json()
    print(a)
    return {
        "data": threatAssessmentPipeline(url=a["input"],
                                      ner_model=NER_MODEL,
                                      emb_model=EMB_MODEL,
                                      keyword_anchors=KEYWORD_ANCHORS,
                                      stopwords=STOPWORDS,
                                      threat_thresholds=THREAT_THRESHOLDS)
    }

# @app.route("/demand", methods=["GET"])
# def demand(url)


if __name__ == "__main__":
    app.run(debug=True)
