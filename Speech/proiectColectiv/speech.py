import threading

import pyttsx3
import datetime
import speech_recognition as sr
import wikipedia
import webbrowser
import holidays
import random

from proiectColectiv.Recommandation import Recommandation, getProfFromCourse

RositaRunning = False
# from ibm_watson import TextToSpeechV1
# from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
# 
import pyaudio
import wave

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)
engine.setProperty('rate', 145)


def speak(audio):
    engine.say(audio)
    engine.runAndWait()


# def play():
#     # open a wav format music
#     f = wave.open(r"hello_world.wav", "rb")
#     # instantiate PyAudio
#     p = pyaudio.PyAudio()
#     # open stream
#     stream = p.open(format=p.get_format_from_width(f.getsampwidth()),
#                     channels=f.getnchannels(),
#                     rate=f.getframerate(),
#                     output=True)
#     # read data
#     # define stream chunk
#     chunk = 1024
#     data = f.readframes(chunk)
# 
#     # play stream
#     while data:
#         stream.write(data)
#         data = f.readframes(chunk)
# 
#         # stop stream
#     stream.stop_stream()
#     stream.close()
# 
#     # close PyAudio
#     p.terminate()
# 
# 
# def speak(audio):
#     print("Rosita: " + audio)
#     key = 'ElqC4MIA131BDZhFY2pu8jn5p_7o2quet8OEuNKsS0su'
#     authenticator = IAMAuthenticator(key)
#     text_to_speech = TextToSpeechV1(
#         authenticator=authenticator
#     )
#     text_to_speech.set_service_url('https://gateway-lon.watsonplatform.net/text-to-speech/api')
# 
#     with open('hello_world.wav', 'wb') as audio_file:
#         audio_file.write(
#             text_to_speech.synthesize(
#                 audio,
#                 voice='en-US_LisaV3Voice',
#                 accept='audio/wav'
#             ).get_result().content)
#     # en-US_AllisonVoice
#     # en-US_LisaV3Voice
#     # en-GB_KateV3Voice
#     threading.Thread(target=play(), args=())


def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour >= 0 and hour < 12:
        speak("Good morning!")
    elif hour >= 12 and hour < 18:
        speak("Good Afternoon!")
    else:
        speak("Good Evening")
    # speak("Hi, I'm Noemi, your personal assistant. Please tell me how can I help you")
    speak("Please tell me how can I help you")


def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.energy_threshold = 500
        r.pause_threshold = 2
        r.adjust_for_ambient_noise(source, duration=0.5)
        audio = r.listen(source)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language="en-GB")
        print("The query: " + query)

    except Exception as e:
        print("Say that again please...")
        #speak("Say that again please...")
        return 'None'
    return query


def saveInMemo(query):
    print(query)

    splited = query.split(" ")

    ok = 1
    memo = ""
    for i in range(len(splited)):
        if splited[i] == "can" and splited[i + 1] == "you":
            break
        memo = memo + splited[i] + " "

    print(memo)

    fullMemo = "\n" + str(datetime.datetime.now().day) + " " + str(datetime.datetime.now().strftime('%B')) \
               + " " + str(datetime.datetime.now().strftime('%A')) + "," + memo

    f = open("memo", "a+")

    f.write(fullMemo)

    f.close()


def recuperateMemo(query):
    splited = query.split(" ")

    word = splited[-1]

    with open("memo") as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]

    print(content)

    count = 0

    for sentence in content:
        spl = sentence.split(",")
        if word in spl[1]:
            dates = spl[0].split(" ")

            day = dates[0]

            month = dates[1]

            dayFull = dates[2]

            if count == 0:
                speak("You said " + word + " on " + day + " " + month + " " + "and that was on a " + dayFull)
            else:
                speak("You also said " + word + " on " + day + " " + month + " " + "and that was on a " + dayFull)

            speak("Here is what you said " + spl[1])

            count = count + 1

    if count == 0:
        speak("Sorry... I couldn't find anything about that in your memos")


def determineNextDay(curr):
    if curr == "Monday":
        return "tuesday"
    if curr == "Tuesday":
        return "wednesday"
    if curr == "Wednesday":
        return "thursday"
    if curr == "Thursday":
        return "friday"
    if curr == "Sunday":
        return "monday"
    if curr == "Saturday":
        return "sunday"


def findSchedule(query):
    day = query.split(" ")[-1]
    with open("schedule") as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]

    print(content)

    speak("Your schedule for " + day + " is the following:")

    if day == "tomorrow":
        currentDay = datetime.datetime.now().strftime('%A')
        day = determineNextDay(currentDay)

    for sentence in content:
        dayInfo = sentence.split(":")
        if day == dayInfo[0]:
            info = dayInfo[1].split(",")
            speak("You have " + info[1] + " of " + info[0] + " at " + info[2])
            if "all" not in info[4]:
                speak("This is for " + info[4] + " weeks")
            if int(info[3]) > 0:
                speak("Be careful, you have already missed this " + info[1] + " , " + info[3] + " times")
                if "laboratory" in info[1]:
                    speak("For a Laboratory...you can have a max number of 1 absences per semester")
                if "seminar" in info[1]:
                    speak("For a Seminar...you can have a max number of 4 absences per semester")


def determineMiss(query):
    info = query.split(" ")
    indexOfThe = info.index("the")

    field = info[indexOfThe + 1]
    type = info[indexOfThe + 2] #-1

    print(field)
    print(type)

    with open("schedule") as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]

    for sentence in content:
        dayInfo = sentence.split(":")
        print(dayInfo[1])
        if field in dayInfo[1] and type in dayInfo[1]:
            if "Laboratory" in dayInfo[1].split(",") and int(dayInfo[1].split(",")[3]) == 1:
                speak("You've already missed this laboratory 1 time, if you don't attend you will fail the class. I "
                      "suggest you to go")
            elif "Seminar" in dayInfo[1].split(",") and int(dayInfo[1].split(",")[3]) == 4:
                speak("You've already missed this seminar 4 times, if you don't attend you will fail the class. I "
                      "suggest you to go")
            else:
                speak("You missed this " + type + " , " + dayInfo[1].split(",")[3] + " time, so you can miss it one "
                                                                                     "more time")


def recommend(courses, faculties):
    print(courses)
    print(faculties)

    rnd = random.randint(1, 4)

    to_speak = ""

    if rnd == 1:
        to_speak = to_speak + "Okay, you may like "
    elif rnd == 2:
        to_speak = to_speak + "All right, you can look at "
    elif rnd == 3:
        to_speak = to_speak + "Hmm... what about "
    elif rnd == 4:
        to_speak = to_speak + "I will recommend "

    to_speak = to_speak + courses[0] + " offered by the "
    to_speak = to_speak + faculties[0] + "."

    print(to_speak)

    speak(to_speak)

    if len(courses) > 1:
        to_speak = ""

        rnd = random.randint(1, 3)

        if rnd == 1:
            to_speak = to_speak + "I could, also, find  "
        elif rnd == 2:
            to_speak = to_speak + "There is also  "
        elif rnd == 3:
            to_speak = to_speak + "Other option would be "

        to_speak = to_speak + courses[1] + " offered by the "
        to_speak = to_speak + faculties[1] + "."

        speak(to_speak)

    if 'Escalada' in courses:
        speak("Really? Escalada? You lazy fuck")

    if 'Spatial Databases' in courses:
        speak("Databases man? You really want god damn databases? You are so sad")

    if 'Introduction in natural language processing' in courses:
        speak("Artificial Intelligence, nice! Legend, man of culture")

    if len(courses) > 2:
        num = len(courses) - 2

        print(num)

        speak("There are also " + str(num) + " other courses you can choose from")

        speak("Do you want to hear the other ones?")

        query = takeCommand().lower()

        if 'yes' in query or 'ye' in query or 'sure' in query:
            speak("All right")
            for j in range(2, len(courses)):
                to_speak = ""

                rnd = random.randint(1, 5)

                if rnd == 1:
                    to_speak = to_speak + "I could, also, find  "
                elif rnd == 2:
                    to_speak = to_speak + "There is also  "
                elif rnd == 3:
                    to_speak = to_speak + "Other option would be "
                elif rnd == 4:
                    to_speak = to_speak + "Furthermore, there is "
                elif rnd == 5:
                    to_speak = to_speak + "In addition, you have  "

                to_speak = to_speak + courses[j] + " offered by the "
                to_speak = to_speak + faculties[j] + "."

                speak(to_speak)

            speak("That's it!")
        else:
            speak("No problem")


def stopR():
    global RositaRunning
    RositaRunning = False

def startR():
    global RositaRunning
    RositaRunning = True
    #wishMe()

    recEngine = Recommandation()
    # really like math but not algebra
    # i really like coding in java
    # database course last year
    # while True:
    while RositaRunning:
        query = takeCommand().lower()

        if ("hei" in query or "hey" in query) and ("rosita" in query or "rozita" in query or "Rosetta" in query or "Rossiter" in query):

            speak("I'm listening")

            query = takeCommand().lower()

            if 'wikipedia' in query:
                speak("Searching Wikipedia...")
                # query = query.replace("Wikipedia", " ")
                q = ""
                ok = 0
                splited = query.split(" ")
                print(splited)
                for word in splited:
                    if word == "on":
                        ok = 0
                    if ok == 1:
                        q = q + word + " "
                    if word == "search" or word == "find":
                        ok = 1
                print("Query: ", q)
                try:
                    results = wikipedia.summary(q, sentences=3)
                except Exception as e:
                    speak("This search may bring multiple results " + str(e))
                speak("According to wikipedia")
                print(results)
                speak(results)
            elif ('can you' and 'make' and 'memo' in query) or ('can you' and 'save' in query) or (
                        'can you' and 'remember' in query):
                saveInMemo(query)
                speak("Sure, saving in memos")
            elif 'something' and 'about' and 'say' in query:
                speak("I am searching through your memos")
                recuperateMemo(query)
            elif 'open youtube' in query:
                speak("Opening... Please Wait")
                webbrowser.open_new("https://www.youtube.com")
                speak("Opened")
            elif 'open google' in query:
                speak("Opening...Please Wait")
                webbrowser.open_new("https://www.google.com")
                speak("Opened")
            elif 'open facebook' in query:
                speak("Opening... Please Wait")
                webbrowser.open_new("https://www.facebook.com")
                speak("Opened")
            elif 'open instagram' in query:
                speak("Opening... Please Wait")
                webbrowser.open_new("https://www.instagram.com")
                speak("Opened")
            elif 'the time' in query:
                strTime = datetime.datetime.now().strftime("%H : %M : %S")
                speak(f"The time is: {strTime}")
                print(f"The time is: {strTime}")
            elif 'next' in query and 'holiday' in query:
                print(datetime.datetime.now().date())
                for ptr in holidays.UnitedStates(years=int(datetime.datetime.now().year)).items():
                    print(ptr)
                speak("The next big holiday is the one between the normal session of exams and teh second one for failed tests.")
            elif "where is" in query:
                data = query.split(" ")
                location = ""
                for i in range(2, len(data)):
                    print(data[i])
                    location = location + data[i] + " "
                print(location)
                speak("Hold on, I will show you where " + location + " is.")
                webbrowser.open_new("https://www.google.nl/maps/place/" + location + "/&amp;")
                # os.system("chromium-browser https://www.google.nl/maps/place/" + location + "/&amp;")
            elif ("schedule" or "programme") and "for" in query:
                findSchedule(query)
            elif "can" in query and "miss" in query:
                determineMiss(query)
            elif "who" in query:
                prof = getProfFromCourse(query)
                if prof != False:
                    speak("You are looking for " + prof)
                else:
                    speak("Sorry, I didn't find anything")
            elif 'exit' in query:
                speak("Quit")
                exit()
            else:
                speak("Let me see what I can find")
                r = recEngine.searchContrastPresent(query)  # recEngine.getRecomm(query)
                print(r)
                if r == []:
                    speak("Sorry, I couldn't find anything related to that")
                else:
                    speak("Yep I found something")
                    recommend(r[0], r[1])

                speak("What else do you like?")

    print('Rosita s a oprit')
    return