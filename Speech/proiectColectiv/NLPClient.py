from aylienapiclient import textapi

class AYLIENClient(object):
    # Generic AYLIEN Class for getting sentiment of of given text .

    def __init__(self):
        """
        Class constructor for authentication of Text api for AYLIEN  .
        """

        ## AYLIEN credentials
        application_id = "e14bf0bb"
        application_key = "bb2b6dbbfd5f6714ecbf6fca6141dd92"

        try:
            self.api = textapi.Client(application_id, application_key)
        except:
            print("Error: AYLIEN Authentication Failed")

    def get_tweet_sentiment(self, tweet):
        # function to classify sentiment of tweet
        response = self.api.Summarize(
            {'text': tweet, 'title': 'vacation', 'sentences_number': 1})  # self.api.Sentiment({'text': tweet})
        return response

    def get_tweet_entities(self, tweet):
        # function to classify sentiment of tweet
        response = self.api.Entities({'text': tweet})  # self.api.Sentiment({'text': tweet})
        return response

    def get_tweet_Concept(self, tweet):
        # function to classify sentiment of tweet
        response = self.api.Concepts({'text': tweet})  # self.api.Sentiment({'text': tweet})
        return response

    def get_tweet_EntityLevelAnalysis(self, tweet):
        # function to classify sentiment of tweet
        response = self.api.Elsa({'text': tweet})  # self.api.Sentiment({'text': tweet})
        return response

    def get_tweet_HashTags(self, tweet):
        # function to classify sentiment of tweet
        response = self.api.Hashtags({'text': tweet})  # self.api.Sentiment({'text': tweet})
        return response

    def get_Sentiment(self, tweet):
        # function to classify sentiment of tweet
        response = self.api.Sentiment({'text' : tweet})
        return response
