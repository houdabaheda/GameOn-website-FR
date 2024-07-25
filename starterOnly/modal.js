//la fonction editNav permet de basculer entre une barre de navigation normale et une barre de navigation responsive, adaptée à différents formats d'écran
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
//sélectionner des éléments HTML spécifiques sur une page web
const modalbg = document.querySelector(".bground"); //formulaire
const modalBtn = document.querySelectorAll(".modal-btn");//button je m'inscris
const formData = document.querySelectorAll(".formData"); //les div de case de formulaire
const submitBtn = document.querySelector(".btn-submit"); //bouton c'est partier

// launch modal event
//pour chaque élément btn dans la NodeList modalBtn, exécute la fonction launchModal
//est une collection d'objets Node (éléments du DOM) qui est retournée par des méthodes comme document.querySelectorAll, 
modalBtn.forEach((btn) => {
  btn.addEventListener("click", launchModal);
});

// change le style de l'élément modalbg pour qu'il soit visible
function launchModal() {
  modalbg.style.display = "block";
}

//Ajouter la fonctionnalité au bouton (x)
let close = document.querySelector(".content .close") //bouton x de formulaire 

function cacherPopup() {
  modalbg.style.display = "none"
}

close.addEventListener("click", (event) => {
  if (event.target === close) {
    cacherPopup()
  }
})

//Ajouter la fonctionnalité au bouton (x et fermer de la popup merci pour votre inscription )
const bg = document.querySelector(".bg"); //popup merci pour votre inscription 
let clos = document.querySelector(".cont .clos") //bouton x 
let btn = document.querySelector(".modal .btn") //bouton fermer

function cacher() {
  bg.style.display = "none"
}

clos.addEventListener("click", (event) => {
  if (event.target === clos) {
    cacher()
  }
})
btn.addEventListener("click", (event) => {
  if (event.target === btn) {
    cacher()
  }
})




// La fonction validateForm prend en paramètres prenom ,nom ,.... et vérifie leur validité.
//Si une ou plusieurs valeurs sont invalides,
// elle génère et renvoie un objet errors contenant des messages d'erreur spécifiques. 
function validateForm(prenom, nom, mail, naissance, quantitie, city, accepte) {
  const errors = {}; //objet 

  if (prenom.length < 2) {
    errors.prenom = "Veuillez entrer 2 caractères ou plus pour le champ du prenom.";
    //ajouter la variable prenom qui contien un message d'erreur 
  }

  if (nom.length < 2) {
    errors.nom = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  }


  //emailRegExp est une expression régulière qui vérifie la structure d'un email.
  const emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (!emailRegExp.test(mail)) {
    errors.mail = "Veuillez entrer une adresse email valide.";
    //Si le mail ne correspond pas à l'expression régulière, une erreur est ajoutée à l'objet errors .
  }

  if (!naissance) {
    errors.naissance = ("Vous devez entrer votre date de naissance.");
    //Si la date de naissance n'est pas fournie (vide ou null), une erreur est ajoutée à l'objet errors

  }

  const regex = /^\d{1,}$/;
  if (!regex.test(quantitie)) {
    errors.quantitie = ("Veuillez entrer un nombre valide.");

  }
  
  //vérifie si au moins un des boutons radio de la ville est coché.
  if (!Array.from(city).some(radio => radio.checked)) {
    errors.city = "Veuillez choisir une ville.";
  }

  if (!accepte) {
    errors.accepte = "Veuillez accepter les conditions d'utilisations.";
  }
 

  // vérifie si l'objet errors contient au moins une clé (c'est-à-dire s'il y a des erreurs)
  if (Object.keys(errors).length > 0) {
    throw errors;
    //Si des erreurs existent, elles sont lancées sous forme d'exception.
    //throw permet de signaler qu'une condition inattendue ou incorrecte a été rencontrée
    //Cela interrompt l'exécution normale du code et transfère le contrôle à un gestionnaire d'erreurs try...catch

  }



}





submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let first = document.getElementById("first");
  let prenom = first.value;
  let last = document.getElementById("last");
  let nom = last.value;
  let email = document.getElementById("email");
  let mail = email.value;
  let birthdate = document.getElementById("birthdate");
  let naissance = birthdate.value;
  let quantity = document.getElementById("quantity");
  let quantitie = quantity.value;
  let city = document.querySelectorAll("input[name=location]");
  let terms = document.getElementById("checkbox1");
  let accepte = terms.checked;
  
  // Sélectionne tous les éléments avec la classe error-message et vide leur contenu
  document.querySelectorAll('.error-message').forEach(span => span.innerHTML = '');

  //Le code à risque d'erreur (dans ce cas, l'appel de validateForm) 
  //Si validateForm n'a pas d'erreurs,
  //le formulaire modal (.bground) est caché et le modal qui afficher le message merci est affiché
  try {
    validateForm(prenom, nom, mail, naissance, quantitie, city, accepte);
    document.querySelector(".bground").style.display = "none";
    document.querySelector(".bg").style.display = "block";

  } catch (errors) {
    // Si des erreurs sont détectées, elles sont capturées dans le bloc catch.
    // Pour chaque clé d'erreur(prenom,nom,mail ...) le message d'erreur correspondant est affiché dans l'élément HTML approprié
    if (errors.prenom) document.getElementById("prenomError").textContent = errors.prenom;
    if (errors.nom) document.getElementById("nomError").textContent = errors.nom;
    if (errors.mail) document.getElementById("emailError").textContent = errors.mail;
    if (errors.naissance) document.getElementById("naissanceError").textContent = errors.naissance;
    if (errors.quantitie) document.getElementById("quantitieError").textContent = errors.quantitie;
    if (errors.city) document.getElementById("cityError").textContent = errors.city;
    if (errors.accepte) document.getElementById("accepteError").textContent = errors.accepte;





  }






});


