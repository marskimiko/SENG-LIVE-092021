// ✅ Request-Response Cycle

	// request => url + http verb
    // response => status code + message body

// ✅ HTTP Verbs

    // CRUD => POST, GET, PATCH, DELETE

// ✅ CRUD with Fetch: GET Requests

	// fetch('http://localhost:3000/items') // returns a promise
    
    // // once first Promise is resolved...
    // .then(resp => resp.json()) // ...convert the response into JSON and return another promise
    
    // // once second Promise is resolved...
    // .then(items => {

    //     // ...console.log the JS response
    //     console.log(item)
    // });

// ✅ CRUD with Fetch: POST Requests
       
	// let item = { id: 1, content: "my item" };

	// fetch('http:localhost:3000/items/', {
	// 	// ❗ specify method
	// 	method: 'POST',
		
	// 	// ❗ specify headers
	// 	headers: {
	// 	'Content-Type': 'application/json',
	// 	},

	// 	// ❗ convert the item into a JSON string, necessary for compatibility with db.json 
	// 	body: JSON.stringify(item),
	// })
	// .then(resp => resp.json())
	// .then(response => console.log("Success!"));

// -------------------------------------------

console.log("------------------------");
console.log("⬇️ Break Out Activities ⬇️");
console.log("🚨 Comment Out Lecture Code Above Before Starting 🚨");
console.log("💡 Use console.log() To Check Answers 💡");
console.log("------------------------");

	// ❗ Use these constants / functions in your solutions
	const BASE_URL = 'http://localhost:3000';
	const pokeContainer = document.getElementById('poke-container');
	const commentsContainer = document.getElementById('comments-container');
	const commentsForm = document.getElementById('comments-form');
	
	function renderPokemon(pokemon) {
		const pokeCard = document.createElement("div");
		const pokeImg = document.createElement("img");
		const pokeName = document.createElement("h3");
		const pokeLikes = document.createElement("h3");
		const likesNum = document.createElement("h5");
		const likeBttn = document.createElement("button");
		const deleteBttn = document.createElement("button");

		pokeCard.id = `poke-${pokemon.id}`;
		pokeCard.className = "poke-card";
		
		pokeImg.src = pokemon.img;
		pokeImg.alt = `${pokemon.name} image`;

		pokeName.textContent = pokemon.name;
		
		pokeLikes.textContent = "Likes: ";
		
		likesNum.className = "like-num";
		likesNum.textContent = pokemon.likes;
		
		likeBttn.className = "like-bttn";
		likeBttn.textContent = "♥";
		likeBttn.addEventListener("click", () => increaseLike(pokemon, likesNum));

		deleteBttn.className = "delete-bttn";
		deleteBttn.textContent = "Delete";
		deleteBttn.addEventListener("click", () => deletePoke(pokeCard));

		pokeCard.append(pokeImg, pokeName, pokeLikes, likesNum, likeBttn, deleteBttn);
		pokeContainer.appendChild(pokeCard);
	}

	function loadPokemons() {
		fetch(BASE_URL + '/pokemons')
		.then(resp => resp.json())
		.then(pokemons => {
			pokemons.forEach(renderPokemon);  
		});
	}

	function increaseLike(pokemon, likesElement) {
		++pokemon.likes;
		likesElement.textContent = pokemon.likes;
	}

	function deletePoke(pokeCard) {
		pokeCard.remove();
	}

// 🚧 Break Out Activity 1: Handling / Rendering GET Requests with json-server

	// 🚨 Comment out any conflicting code above before proceeding.

	// 1️⃣ Create a function (loadCommends) that:

		//  ✔️ Initiates a fetch request to GET all "comments" (/comments)

		//  ✔️ Parses the response into JSON

		//  ✔️ Logs the returned "comments" to the Browser console 

		function loadComments() {
			fetch(BASE_URL + '/comments') // returns a promise
			.then(resp => resp.json()) // another promise
			.then(comments => {
				comments.forEach(renderComment);  
				// console.log(comments);
			});
		}

		// ✅ Check Answer: 
        // loadComments();

	// 2️⃣ Create a function (renderComment) that:

		//  ✔️ Accepts a single "comment" object

        //  ✔️ Creates a div (commentCard) and assigns it the Class name "comment-card"

		//  ✔️ Creates an h3 (userName) and assigns it the Comment object's "name"

		//  ✔️ Creates a p (userName) and assigns it the Comment object's "content"

        //  ✔️ Appends userName and userContent to commentCard

		//  ✔️ Appends commentCard to commentsContainer

		//  ❗ Edit loadComments() above to invoke renderComment for each returned Comment object

	function renderComment(comment) {
		const commentCard = document.createElement("div");
		const userName = document.createElement("h3");
		const userContent = document.createElement("p");

		commentCard.className = "comment-card";
		
		userName.textContent = comment.content;

		userContent.textContent = `Added by ${comment.user}`;

		commentCard.append(userName, userContent);
		commentsContainer.append(commentCard);
	}

// 🚧 Break Out Activity 2: Handling / Rendering POST Requests with json-server

	// 🚨 Comment out any conflicting code above before proceeding.

	// 1️⃣ Create a function (createComment) that:

		//  ✔️ Stores the values of input#user (commentUser) and input#content (commentContent)

		//  ✔️ Creates a new Comment object with the following fields:

			// id => must be unique for each new Comment

			// user => commentUser (see above)

			// content => commentContent (see above)

		//  ✔️ Initiates a fetch request to POST a new "comment" (/comments)

			// ❗ Remember to specify 'method', 'headers', and 'body' in your POST request

		//  ✔️ Parses the fetch response into JSON

		//  ✔️ Logs "Success!" to the Browser console

	function createComment() {
		let commentUser = commentsForm.querySelector("#user").value;
		let commentContent = commentsForm.querySelector("#content").value;
		let comment = {
			// id: commentsContainer.children.length + 1, 
			// if we don't want json-server to handle id generation
			user: commentUser,
			content: commentContent,
		};
	
		fetch(BASE_URL + '/comments/', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(comment),
		})
		.then(resp => resp.json())
		.then(response => {
			console.log("Success!");
		});

		commentsForm.reset();
	}

	function init() {
		loadPokemons();
		loadComments();
		commentsForm.addEventListener("submit", createComment);
	}

	init();