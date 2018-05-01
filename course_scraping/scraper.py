import re
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

def simple_get(url):
  """
  Attempts to get the content at `url` by making an HTTP GET request.
  If the content-type of response is some kind of HTML/XML, return the
  text content, otherwise return None
  """
  try:
    with closing(get(url, stream=True)) as resp:
      if is_good_response(resp):
        return resp.content
      else:
        return None

  except RequestException as e:
    log_error('Error during requests to {0} : {1}'.format(url, str(e)))
    return None


def is_good_response(resp):
  """
  Returns true if the response seems to be HTML, false otherwise
  """
  content_type = resp.headers['Content-Type'].lower()
  return (resp.status_code == 200
          and content_type is not None
          and content_type.find('html') > -1)


def log_error(e):
  """
  It is always a good idea to log errors.
  This function just prints them, but you can
  make it do anything.
  """
  print(e)

raw_html = simple_get('https://www.macalester.edu/registrar/schedules/2018fall/class-schedule/#')
f = open('fall2018.txt', 'w+')

html = BeautifulSoup(raw_html, 'html.parser')
prev = ""
for row in html.select('tr'):
  course_number = row.select('.class-schedule-course-number')
  course_title = row.select('.class-schedule-course-title')
  course_notes = row.select('.class-schedule-notes > p')
  if len(course_number) > 0 and course_number[0].string is not None:
    m = re.search('[A-Z]{2,4}[ ,\xa0][0-9]{2,3}', course_number[0].string)
    if (prev != m.group(0)):
      f.write(m.group(0) + '\n')
      f.write(course_title[0].string + '\n')
    prev = m.group(0)

  # elif len(course_notes) > 0 and course_notes[0].string is not None and ('cross' in course_notes[0].string or 'Cross' in course_notes[0].string):
  #   matches = re.findall('[A-Z]{2,4}', course_notes[0].string)
  #   for crossed in matches:
  #     print(crossed)
  #   print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')



