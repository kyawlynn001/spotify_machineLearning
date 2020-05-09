from flask import Flask, render_template, request, jsonify, redirect, url_for
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import pickle
import joblib
import model

app = Flask(__name__)

score_list = None

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/mood_choice', methods = ['POST', 'GET'])
def chilin_excited():
    return render_template("mood_choice.html")

@app.route('/dancer_choice', methods = ['POST', 'GET'])
def dancer_shy():
    return render_template("dancer_choice.html")

@app.route('/singer_choice', methods = ['POST', 'GET'])
def singer_musician():
    return render_template("singer_choice.html")

@app.route('/result', methods=["GET", "POST"])
def prediction_result():
    if request.method == "POST":
        print('Request:')
        result = request.get_json(force=True)
        print(result)
        global score_list
        score_list = result["scoreList"]
        return "score_list saved"

    if request.method == "GET":
        print('Result Get Works!')
        
        spotify_df = pd.read_csv("spotify_data_v4.csv")

        # Run train_model function to get all training and testing data for running ML model
        X_train_scaled, X_test_scaled, y_train, y_test = model.train_model()

        # Load the ML model
        spotify_model = joblib.load(open("spotify_ML_model_4features.pkl","rb"))

        # Run scale_input function to scale the score list
        # score_list = json.loads(request.args.get("scoreListPassing")) # score list we get from user input which we collected using javascript
        score_list_scaled = model.scale_input(score_list)

        # Predict the scaled score list using ML model (KNN), output will be genre label
        prediction_genre_label = spotify_model.predict(score_list_scaled)

        # Filter dataframe with genre_label = prediction_genre_label and song popularity > 50
        spotify_df_filtered = spotify_df[(spotify_df["genre_label"] == prediction_genre_label[0]) & (spotify_df["popularity"] > 50)]

        # Randomly pick 3 songs within the prediction genre
        prediction_result_df = spotify_df_filtered.sample() 

        # Get the genre, artist name, song/track name, and song/track id
        genre_result = prediction_result_df["genre"].values[0]
        artist_result = prediction_result_df["artist_name"].values[0]
        track_result = prediction_result_df["track_name"].values[0]
        track_id_result = f"https://open.spotify.com/track/{prediction_result_df['track_id'].values[0]}"

        return render_template("result.html", genre_result=genre_result, artist_result=artist_result, track_result=track_result, track_id_result=track_id_result)
        

if __name__ == '__main__':
    app.run(debug=True)