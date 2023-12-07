import csv
import json

data = {"firstName": [], "lastName": [] }

with open('girl_boy_names_1962.csv', 'r') as input_file:
    reader = csv.reader(input_file)
    next(reader, None)  # skip the headers
    for row in reader:
        data["firstName"].append(row[1])  # append the girl name
        data["firstName"].append(row[2])  # append the boy name

with open('surnames.csv', 'r') as input_file:
    reader = csv.reader(input_file)
    next(reader, None)  # skip the headers
    for row in reader:
        data["lastName"].append(row[0].capitalize())

with open('names.json', 'w') as output_file:
    json.dump(data, output_file)