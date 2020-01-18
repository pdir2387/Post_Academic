import sys
import threading

from proiectColectiv.Recommandation import Recommandation, search
from proiectColectiv.speech import recommend, startR, stopR

from os import path
import sys

# sys.path.append(path.abspath('C:\\Users\\Cata\\PycharmProjects\\Spam_Detection\\'))
#
# from Spam_Detection.analyzeText import *

def analyzeText(text):
    filepath = 'C:\\Users\\Cata\\PycharmProjects\\Spam_Detection\\tensorflow-tutorial-master\\spamWords'
    with open(filepath,encoding='UTF-8') as fp:
        line = fp.readline()
        cnt = 1
        while line:
            line = line.rstrip()
            #print("Line {}: {}".format(cnt, line.strip()))
            if line in text:
                return 'spam'
            line = fp.readline()
            cnt += 1
    return 'no'


import http.server
import socketserver
from io import BytesIO
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
#
# def getRecomFromText(text):
#     recEngine = Recommandation()
#     r = recEngine.searchContrastPresent(text)
#     print(r)
#     # r = recEngine.getRecomm(text)
#     # sentiment = recEngine.getPolarity(text)
#     # print(r[0])
#     # print(r[1])
#     # print(sentiment)
#     #recommend(r[0], r[1])


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def getRecomFromText(self, text):
        recEngine = Recommandation()
        r = recEngine.searchContrastPresent(text)
        print(r)
        return r
        # r = recEngine.getRecomm(text)
        # sentiment = recEngine.getPolarity(text)
        # print(r[0])
        # print(r[1])
        # print(sentiment)
        # recommend(r[0], r[1])

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Hello, world!')

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        if self.path.endswith("/student/recomandareFields"):
            content_length = int(self.headers['Content-Len'
                                              'gth'])
            body = self.rfile.read(content_length)
            print('Body')
            print(body.decode('ascii'))
            y = json.loads(body)

            # the result is a Python dictionary:
            label1 = y["label1"]
            label2 = y["label2"]
            label3 = y["label3"]


            [courses, faculties] = search([label1,label2,label3])

            # s_courses_aux = ''
            # s_faculties_aux = ''
            # for el in courses:
            #     s_courses_aux = s_courses_aux + str(el) + ';'
            # for el in faculties:
            #     s_faculties_aux = s_faculties_aux + str(el) + ';'
            #
            # s_courses = s_courses_aux
            # s_faculties = s_faculties_aux

            l = []

            for i in range(len(courses)):
                d = {}
                d['course'] = courses[i]
                d['faculty'] = faculties[i]
                l.append(d)

            out = json.dumps(l)

            print(out)


            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = BytesIO()
            # response.write(b'This is POST request. ')
            # response.write(b'Received: ')
            response.write(body)
            self.wfile.write(out.encode())
            #print(response.getvalue())

        if self.path.endswith("/student/recomandareText"):
            content_length = int(self.headers['Content-Len'
                                              'gth'])
            body = self.rfile.read(content_length)
            print('Body')
            print(body.decode('ascii'))
            y = json.loads(body)

            # the result is a Python dictionary:
            text = y["text"]
            print(y["text"])

            [courses, faculties] = self.getRecomFromText(text)

            # s_courses_aux = ''
            # s_faculties_aux = ''
            # for el in courses:
            #     s_courses_aux = s_courses_aux + str(el) + ';'
            # for el in faculties:
            #     s_faculties_aux = s_faculties_aux + str(el) + ';'
            #
            # s_courses = s_courses_aux
            # s_faculties = s_faculties_aux

            l = []

            for i in range(len(courses)):
                d = {}
                d['course'] = courses[i]
                d['faculty'] = faculties[i]
                l.append(d)

            out = json.dumps(l)

            print(out)


            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = BytesIO()
            # response.write(b'This is POST request. ')
            # response.write(b'Received: ')
            response.write(body)
            self.wfile.write(out.encode())
            #print(response.getvalue())

        if self.path.endswith("/checkSpam"):
            content_length = int(self.headers['Content-Len'
                                              'gth'])
            body = self.rfile.read(content_length)
            print('Body')
            print(body.decode('ascii'))
            y = json.loads(body)

            # the result is a Python dictionary:
            email = y["text"]
            print(y["text"])

            out = analyzeText(email)

            d = {}

            d['Spam'] = out == 'spam'

            # s_courses_aux = ''
            # s_faculties_aux = ''
            # for el in courses:
            #     s_courses_aux = s_courses_aux + str(el) + ';'
            # for el in faculties:
            #     s_faculties_aux = s_faculties_aux + str(el) + ';'
            #
            # s_courses = s_courses_aux
            # s_faculties = s_faculties_aux

            r = json.dumps(d)

            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = BytesIO()
            # response.write(b'This is POST request. ')
            # response.write(b'Received: ')
            response.write(body)
            self.wfile.write(r.encode())
            # print(response.getvalue())

        if self.path.endswith("/startRosita"):


            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            threading.Thread(target=startR, args=()).start()

            print("pornita!")
            #print(response.getvalue())

        if self.path.endswith("/stopRosita"):

            print("stop")
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            stopR()

            print("oprita!")
            #print(response.getvalue())


httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)

print("Server stared...")

httpd.serve_forever()


# text = 'I enjoy mathematics even though real analysis isn\'t really my thing nor statistics. I would also want to ' \
#        'learn more about secure systems. A lot of time has passed since I\'ve studied a new language, ' \
#        'something related to that should also be fine '

#text = "although i really like machine learning"



#
# [courses, faculties] = getRecomFromText(text)
#
# s_courses_aux = ''
# s_faculties_aux = ''
# for el in courses:
#     s_courses_aux = s_courses_aux + str(el) + ';'
# for el in faculties:
#     s_faculties_aux = s_faculties_aux + str(el) + ';'
#
# s_courses = s_courses_aux
# s_faculties = s_faculties_aux
#
