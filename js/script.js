
function findPeople() {

    /**
     * 1. Récuperer le nom du personnage depuis l'HTML
     * 2. Préparation de l'URL à appeler
     * 3. faire le fetch avec l'URL préparé
     */

    // Je recupere la valeur de l'input ayant l'id "searchInput"
    const searchInput = document.getElementById("searchInput").value;
    const url = `https://swapi.dev/api/people/?search=` + searchInput;

    /**
     * fetch : appel API se basant sur HTTP
     * si vous avez axios : et bien c'est du fetch
     *
     * il nous faut au minima, deux choses :
     * - URL
     * - method :
     *  - GET : obtenir une information
     *  - POST : créer une information
     *  - PUT : modification d'une information
     *  - DELETE : suppression d'une information
     *
     *  Par defaut, fetch, fait un GET
     * 1. je contacte l'URL spécifié avec une method HTTP
     * 2. quand j'ai une réponse, je vais réagir :
     *  - le premier cas possible, je peux avoir une erreur, donc j'affiche "Mince il y a une erreur" car le code HTTP est different de 200
     *  - le deuxieme cas possible, tout se passe bien, donc, je vais mettre le resultat de mon fetch, dans, une variable
     * 3. Si je suis dans le premier cas, j'affiche également le contenu de l'erreur
     */

    fetch(url, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) { // si ce n'est pas un code HTTP 200
            console.log("Mince, il y a une erreur");
        } else {
            /**
             * Pour exploiter la réponse (le body = le contenu du retour de mon application), je dois le convertir en JSON
             */
            return response.json();
        }
    })
        .then(dataFinal => {

            // 4. écriture dans le HTML
            /**
             * 1. recuperation de la div
             * 2. écriture
             */
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = ''; // efface les resultats précédents

            if(dataFinal.count > 0){
                /**
                 * j'ai au moins une personne que j'ai trouvé, je vais donc, prendre ses informations, et l'afficher
                 */
                const character = dataFinal.results[0]; // on prend les resultats de la première personne du tableau

                resultsDiv.innerHTML = `
                <h2>${character.name}</h2>
                <p>Année de naissance : ${character.birth_year}</p>
                <p>Genre : ${character.gender}</p>
                <p>Taille : ${character.height}</p>
                <p>Poids : ${character.mass}</p>
                <p>Couleur des cheveux : ${character.hair_color}</p>
                <p>Couleur de peau : ${character.skin_color}</p>
                `;
            }
            else{
                resultsDiv.innerHTML = '<p>Aucun personnage trouvé.</p>'
            }

            console.log(dataFinal);
        })
        .catch(error => {
            console.log("Il y a une erreur : " + error);
        });
}

