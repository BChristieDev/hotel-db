let guestInfo = document.getElementById("guestInfo")
let currentPageNo = document.getElementById("currentPageNo")
let totalPageNo = document.getElementById("totalPageNo")
let inputPageNo = document.getElementById("inputPageNo")
let inputSort = document.getElementById("inputSort")

let baseUrl = "http://localhost:8080/api/guests"
let url = ""
let navPageUrl = ""
let currentPage = ""
let currentSort = ""
let totalPages = ""

window.onload = () => {
	document.getElementById("sortFirstName").onclick = getGuestsSortFirstName
	document.getElementById("prevPage").onclick = getPrevPage
	document.getElementById("nextPage").onclick = getNextPage
	document.getElementById("confirmPageNo").onclick = getInputPageNo
	document.getElementById("confirmSort").onclick = getInputSort

	url = baseUrl

	fetchAPI(url)
}

function getGuestsSortFirstName() {
	currentSort = "firstName"

	getPage()
}

function getInputSort() {
	if (inputSort.value.length > 0) {
		currentSort = inputSort.value

		getPage()
	}
}

function getPrevPage() {
	if (currentPage - 1 > -1) {
		currentPage--

		getPage()
	}
}

function getNextPage() {
	if (currentPage + 1 < totalPages) {
		currentPage++

		getPage()
	}
}

function getInputPageNo() {
	if (inputPageNo.value - 1 > -1 && inputPageNo.value - 1 < totalPages) {
		currentPage = inputPageNo.value - 1

		getPage()
	}
}

function getPage() {
	navPageUrl = url + "?page=" + currentPage + "&sort=" + currentSort

	fetchAPI(navPageUrl)
}

function fetchAPI(url) {
	fetch(url)
		.then((response) => response.json())
		.then((json) => {
			currentPage = json.pageable.pageNumber
			totalPages = json.totalPages

			currentPageNo.innerText = "Page: " + (currentPage + 1)
			totalPageNo.innerText = "Total Pages: " + totalPages

			displayGuests(json.content)
		})
		.catch((error) => alert(error))
}

function displayGuests(jsonData) {
	let keys = Object.keys(jsonData)

	guestInfo.innerHTML = ""

	guestInfo.innerHTML +=
		"<tr>" +
		"<td>ID</td>" +
		"<td>First Name</td>" +
		"<td>Last Name</td>" +
		"<td>Email</td>" +
		"<td>Address</td>" +
		"<td>Country</td>" +
		"<td>State</td>" +
		"<td>Phone Number</td>" +
		"<td>Reservations</td>" +
		"</tr>" +
		"<tr>"

	keys.forEach((key) => {
		let data = jsonData[key]

		guestInfo.innerHTML +=
			"<td>" +
			data.id +
			"</td>" +
			"<td>" +
			data.firstName +
			"</td>" +
			"<td>" +
			data.lastName +
			"</td>" +
			"<td>" +
			data.emailAddress +
			"</td>" +
			"<td>" +
			data.address +
			"</td>" +
			"<td>" +
			data.country +
			"</td>" +
			"<td>" +
			data.state +
			"</td>" +
			"<td>" +
			data.phoneNumber +
			"</td>" +
			"<td>" +
			data.reservations +
			"</td>" +
			"<tr>"
	})
}
