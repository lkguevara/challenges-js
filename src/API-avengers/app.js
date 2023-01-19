// Ingresar a la página https://rapidapi.com
// Seleccionar un proveedor, por ejemplo imdb, luego, escribir la plataforma que se quiere consultar.
// Click en testpoint

// La página muestra lo siguiente:
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6a6cbe50bcmshf91eeef76aeb6cbp14825ejsn933c2637c0e4',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=avengers', options)
	.then(response => response.json())


	.then(data => {
        console.log(data);
        // capturar el arreglo de peliculas (d)
        const arregloPeliculas = data.d
        // recorrer el arreglo de peliculas
        arregloPeliculas.map(item => {
            // obtener el titulo de cada pelicula
            const title = (item.l);
            console.log(title);

            // obtener la imagen de cada pelicula
            const image = (item.i.imageUrl);
            console.log(image);

            // obtener el año de cada pelicula
            const year = (item.y);
            console.log(year);

            // obtener poster
            const poster = `
                <div>
                    <img src="${image}" alt="${title}">
                    <p>${title}</p>
                    <p>${year}</p>
                </div>
            `

            // mostrar el poster en el html
            document.getElementById('container').innerHTML += poster


        })

    })
    
	.catch(err => console.error(err));