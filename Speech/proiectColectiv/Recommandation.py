from proiectColectiv.NLPClient import AYLIENClient


def Diff(li1, li2):
    li_dif = [i for i in li1 + li2 if i not in li1 or i not in li2]
    return li_dif


def getProfFromCourse(course):
    with open("optionalsProfs") as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]

    for line in content:
        courseTags = line.split(":")
        courseFaculty = courseTags[0].split(",")
        c = courseFaculty[0]
        list_tags = courseTags[1]
        keyTags = list_tags.split(",")
        print(c)
        print(course.lower())
        if c.lower() in course.lower():
            return keyTags[-1]
    return False

#getProfFromCourse(' who is teaching the virtual reality curse')

def getFacultiesFromCourses(courses):
    with open("optionals") as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]

    faculties = []

    for course in courses:
        for line in content:
            courseTags = line.split(":")
            courseFaculty = courseTags[0].split(",")
            c = courseFaculty[0]
            faculty = courseFaculty[1]

            if course == c:
                faculties.append(faculty)
                break
    return faculties


def search(tags):
    with open("optionals") as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]

    # print(content)

    anythingFound = False

    results = []
    faculty_results = []

    for course in content:
        courseTags = course.split(":")
        courseFaculty = courseTags[0].split(",")
        course = courseFaculty[0]
        faculty = courseFaculty[1]
        list_tags = courseTags[1]
        keyTags = list_tags.split(",")
        for tag in keyTags:
            if tag in tags:
                results.append(course)
                faculty_results.append(faculty)
                break
            else:
                ok = 1
                for t in tags:
                    if tag in t:
                        results.append(course)
                        faculty_results.append(faculty)
                        ok = 0
                        break
                if ok == 0:
                    break

    if len(results) > 0:
        anythingFound = True

    if anythingFound:
        return [results, faculty_results]
    else:
        return []


class Recommandation(object):
    # Generic AYLIEN Class for getting sentiment of of given text .

    def __init__(self):
        """
        Class constructor for Recommendation class  .
        """

        ## AYLIEN credentials
        self.text_api = AYLIENClient()

    def getRecomm(self, q):
        # function to classify keywords
        responseEntities = self.text_api.get_tweet_entities(q)
        try:
            list_tags = responseEntities["entities"]["keyword"]
            print("keywords for " + q)
            print(list_tags)
            return search(list_tags)
        except:
            print("keywords")
            return search([q])

    def analyzeSentiment(self, q):
        responseEntities = self.text_api.get_Sentiment(q)
        return responseEntities

    def getPolarity(self, q):
        res = self.analyzeSentiment(q)
        return res["polarity"]

    def searchContrastPresent(self, text):
        try:
            sentences = text.split('.')
            contrast_words = ['but', 'however', 'although', 'even though', 'though', 'while', 'whereas', 'unlike']

            negative_courses = []
            positive_courses = []

            for sentence in sentences:
                ok = 1
                for contrast_word in contrast_words:
                    if contrast_word in sentence:

                        sent = sentence.split(contrast_word)
                        print('Sent: ' + sent[0] + ' ' + sent[1])
                        ok = 0

                        for i in range(2):
                            polarity = self.getPolarity(sent[i])
                            print(polarity)
                            if polarity == 'positive':
                                positive_courses = positive_courses + self.getRecomm(sent[i])[0]
                            else:
                                negative_courses = negative_courses + self.getRecomm(sent[i])[0]
                    if ok == 0:
                        break
                if ok == 1:
                    if self.getPolarity(sentence) == 'positive':
                        positive_courses = positive_courses + self.getRecomm(sentence)[0]
                    else:
                        negative_courses = negative_courses + self.getRecomm(sentence)[0]

            print('---------')
            print(positive_courses)
            print(negative_courses)

            final = Diff(positive_courses, negative_courses)

            faculties = getFacultiesFromCourses(final)

            return [final, faculties]
        except:
            return []
