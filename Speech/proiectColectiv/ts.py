import pyttsx3
import datetime
import speech_recognition as sr
import wikipedia
import webbrowser
import holidays

from proiectColectiv.speech import findSchedule, determineMiss

"""
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)  # changes the voice
engine.say('The quick brown fox jumped over the lazy dog.')
engine.runAndWait()
print(datetime.datetime.now().day)
print(datetime.datetime.now().strftime('%B'))
print(datetime.datetime.now().strftime('%A'))

with open("memo") as f:
    content = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
content = [x.strip() for x in content]

print(content)
"""


#findSchedule("What's my schedule for monday")
determineMiss("can i miss the image processing laboratory")