########################################################
# Alex Jones, Hacktech 2022
#
# Performs threat analysis on a single news article and
# prints analysis to console
########################################################

import spacy
import newspaper
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from tqdm import tqdm
from collections import Counter
from typing import List, Set, Tuple
import json
import argparse

parser = argparse.ArgumentParser(description='Threat assessment script for a news article')
parser.add_argument('--url')
args = parser.parse_args()

#python -m spacy download en_core_web_sm
#python -m spacy download en_core_web_md
nltk.download('punkt')
nltk.download('wordnet') 
nltk.download('stopwords')

def threatAssessmentPipeline(url: str,
                             ner_model,
                             emb_model,
                             keyword_anchors: List[str],
                             stopwords: Set[str], 
                             article_date: str = None,
                             cos_sim_threshold: float = 0.6,
                             threat_thresholds: Tuple[float] = (2.0, 5.0)) -> dict:
  '''
  Args:
  url -- Link to news article
  ner_model -- Spacy NER model
  emb_model -- Spacy word embedding model
  keyword_anchors -- List of "anchor" terms to use for mining keywords
  stopwords -- English stopwords
  article_date -- Can be used if article date is known or was scraped
  cos_sim_threshold -- Similarity threshold to use when mining keywords
  threat_thresholds -- Thresholds for determining high/medium/low threat

  Returns:
  Dictionary with threat assessment results for single article
  '''
  
  # Step 1: Extract article text from URL

  article = None
  text = None
  try:
    article = newspaper.Article(url)
    article.download()
    article.parse()
    text = article.text
  except:
    print('Invalid article')
    return 0

  # Step 2: Perform NER on text
  named_entities = ner_model(text).ents

  # Step 3: Pull out specific named entities
  ent_dict = {}
  # Group entities by label
  for ent in named_entities:
    label = str(ent.label_)
    entity = ent.text
    if label not in ent_dict:
      ent_dict[label] = []
    ent_dict[label].append(str(entity))
  # create entity frequency dict
  ent_dict = {label:dict(Counter(entities)) for label,entities in ent_dict.items()}

  # Get location
  if ent_dict.get('LOC'):
    location = max(ent_dict['LOC'], key=ent_dict['LOC'].get) # we only pull out the location that's mentioned most frequently
  else:
    location = 'LOCATION NOT FOUND'

  def getMostLikelyEntities(ent_dict: dict, 
                            ent_label: str,
                            threshold: int = 3):
    if ent_dict.get(ent_label):
      sorted_entities = sorted(ent_dict[ent_label].items(), key=lambda item: item[1], reverse=True)
      candidate_tuples = sorted_entities[:min(threshold, len(sorted_entities))]
      candidate_entities = [pair[0] for pair in candidate_tuples]
      return candidate_entities
    else:
      return f'{ent_label} NOT FOUND' if ent_label in {'DATE', 'TIME'} else 'ACTORS NOT FOUND'
  
  # Get dates, times, and actors
  candidate_dates = getMostLikelyEntities(ent_dict, 'DATE')
  candidate_times = getMostLikelyEntities(ent_dict, 'TIME')
  candidate_actors = getMostLikelyEntities(ent_dict, 'ORG')

  # Step 4: Pull out relevant keywords
  tokenCheck = lambda token: token.isalnum() and token.lower() not in stopwords # checks for alphanumeric + not a stopword
  preprocessed_text = [lemmatizer.lemmatize(tok) for tok in word_tokenize(text) if tokenCheck(tok)]
  TEXT_LENGTH = len(preprocessed_text)
  freq_dict = Counter(preprocessed_text)
  # Embed keyword anchors
  keyword_embs = [emb_model(kw) for kw in keyword_anchors]
  # Mine relevant keywords from article
  key_terms = set()
  key_term_count = 0
  for word in freq_dict:
    word_emb = emb_model(word)
    if word_emb.vector.any(): # check if vector exists in pretrained model
      for kw_emb in keyword_embs:
        if word_emb.similarity(kw_emb) > cos_sim_threshold: # if a word is similar to any of the anchors, add it to the set
          key_terms.add(word)
          key_term_count += freq_dict[word]
          break
  raw_threat_score = (key_term_count/TEXT_LENGTH)*100
  assert len(threat_thresholds) == 2, 'Exactly two threat thresholds must be provided'
  low, high = threat_thresholds
  if raw_threat_score < low:
    warning = 'LOW THREAT'
  elif low <= raw_threat_score < high:
    warning = 'SOME THREAT'
  else:
    warning = 'HIGH THREAT'
  
  # Get list of most prevalent keywords
  if len(key_terms) > 0:
    key_term_freq = {k:freq_dict[k] for k in key_terms}
    sorted_key_terms = sorted(key_term_freq.items(), key=lambda item: item[1], reverse=True)
    candidate_tuples = sorted_key_terms[:min(5, len(sorted_key_terms))]
    candidate_terms = [pair[0] for pair in candidate_tuples]
  else:
    candidate_terms = 'NO RELEVANT KEYWORDS FOUND'

  # Step 5: Package it all into a dictionary
  res = {'URL': url,
         'Threat message': warning,
         'Raw threat rating': raw_threat_score,
         'Possible location': location,
         'Possible dates': candidate_dates,
         'Possible times': candidate_times,
         'Possible actors': candidate_actors,
         'Keywords': candidate_terms}
  if article_date:
    res['Article date': article_date]
  
  return res

lemmatizer = WordNetLemmatizer()
URL = args.url
NER_MODEL = spacy.load('en_core_web_sm', 
                       disable=["tok2vec", "tagger", "parser", "attribute_ruler"])
EMB_MODEL = spacy.load('en_core_web_md')
KEYWORD_ANCHORS = ['war', 'violence', 'attack', 'death', 'casualty', 'danger']
STOPWORDS = stopwords.words('english')
THREAT_THRESHOLDS = (2.0, 4.0)

assessment = threatAssessmentPipeline(url=URL,
                                      ner_model=NER_MODEL,
                                      emb_model=EMB_MODEL,
                                      keyword_anchors=KEYWORD_ANCHORS,
                                      stopwords=STOPWORDS,
                                      threat_thresholds=THREAT_THRESHOLDS)

print('\n')
print('=== THREAT ASSESSMENT ===')
print()
print(assessment)
print('\n')
