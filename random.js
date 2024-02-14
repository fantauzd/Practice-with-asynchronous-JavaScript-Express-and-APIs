'use strict'

/** This function adds a new paragraph element to the body of the webpage
 * :param userData: A string to be added to the webpage
 * :return: None, paragraph appended to document
 */
async function addNode(userData){
    // Create new paragraph element with userData argument //
    const user = document.createElement('p');
    user.textContent = userData;
    // Modify DOM tree and insert new element as child of body //
    document.body.appendChild(user);
};

/** This function fromats a JSON response into a string that represents 
 *  a random person's full name, phone, and email.
 * :param response: A JSON response from the Random Person API
 * :return: A string with the relevant information for the Random Person
 */
async function formatRandomUser(response) {
    const allData = await response.json();
    const userData = await allData.results[0];
    const fullName = userData.name.first + ' ' + userData.name.last;
    const phone = userData.phone;
    const email = userData.email;
    const fullInfo = fullName + ', Phone: ' + phone + ', Email: ' + email;
    return fullInfo
};

// Function is called when the direct option is clicked
// Receives JSON directly via fetch
async function addUserDirect() {
    const response = await fetch("https://randomuser.me/api/");
    const fullInfo = await formatRandomUser(response);
    addNode(fullInfo);
};

// Function is called when the indirect option is clicked
/* Fetches random-person, which calls a route handler and returns the JSON from the Random Person 
API in the response body */
async function addUserIndirect() {
    const response = await fetch("/random-person");
    const fullInfo = await formatRandomUser(response);
    addNode(fullInfo);
};

// When the window loads, attach the event listeners
window.onload = function () {
    document.getElementById('direct').addEventListener('click', addUserDirect);
    document.getElementById('indirect').addEventListener('click', addUserIndirect);
};