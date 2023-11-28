import csv

with open('girl_boy_names_1962.csv', 'r') as input_file, open('first_names.csv', 'w', newline='') as output_file:
    reader = csv.reader(input_file)
    writer = csv.writer(output_file)
    next(reader, None)  # skip the headers
    writer.writerow(['Name'])  # write the header
    for row in reader:
        writer.writerow([row[1]])  # write the girl name
        writer.writerow([row[2]])  # write the boy name