import csv

with open('surnames.csv', 'r') as input_file, open('lastnames.csv', 'w', newline='') as output_file:
    reader = csv.reader(input_file)
    writer = csv.writer(output_file)
    next(reader, None)  # skip the headers
    for row in reader:
        writer.writerow([row[0].capitalize()])