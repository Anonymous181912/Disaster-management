from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from IndicTransToolkit import IndicProcessor

app = Flask(__name__)
CORS(app)

# Load the model and tokenizer
model_name = "ai4bharat/indictrans2-indic-en-1B"
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name, trust_remote_code=True)
ip = IndicProcessor(inference=True)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    texts = data.get('texts', [])
    src_lang = data.get('src_lang', 'eng_Latn')
    tgt_lang = data.get('tgt_lang', 'hin_Deva')

    if not texts:
        return jsonify({'error': 'No text provided for translation'}), 400

    # Translate the texts
    translations = []
    batch = ip.preprocess_batch(texts, src_lang=src_lang, tgt_lang=tgt_lang)
    generated_tokens = model.generate(**batch, num_beams=5, num_return_sequences=1, max_length=256)
    translations = ip.postprocess_batch(generated_tokens, lang=tgt_lang)

    return jsonify({'translations': translations})

if __name__ == '__main__':
    app.run(debug=True)