This is the 2nd and final task for Slidely AI internship. This repository contains the backend server code for the forms application.

Here are some details of the of the server:
1 base url - http://localhost:3000
2 available endpoints:
    a. /ping - verify that server is running and responding 
    b. /read?index=idx - to get a submission given its index
    c. /submit - to add a submission to the database
    d. /count - to get the total count of submissions in the database
    e. /edit?index=idx - to edit a submission with new data given its index
    f. /delete?index=idx - to delete a submission given its index
    g. /search?email=text - to search for submissions made using the given email

Follow these steps to run the server locally:

1 