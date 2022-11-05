//Recuperation du formulaire et les inputs
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"], input[type="tel"]'
);

//Creation de la progresss bar pour le mot de passe
const progressBar = document.getElementById("progress-bar");
//Recuperation des valeurs du formulaires
let firstname, lastname, pseudo, email, password, confirmPass, tel;

//Fonction permettant de verifier les valeurs du formulaires
/* 
    tag -> l'id de l'element en question
    msg -> message a afficher en cas d'erreur
    valid -> champs remplie correctement ou pas (true or false)
*/
const errorDisplay = (tag, msg, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    //champs n'etant pas rempli correctement on injecte la classe error a l'element en question
    if (!valid) {
        container.classList.add('error');
        span.textContent = msg;
    //sinon on retire la classe error et on passe la valeur saisie dans la variable correspondante
    } else {
        container.classList.remove('error');
        span.textContent = msg;
    }
}

//Checker le prenom
const firstnameChecker = (value) => {
    //Si l'utilisateur insere un chiffre ou un espace blanc, on affiche l'erreur et on la variable correspondante a pour valeur null
    if (!value.match(/^[a-zA-Z]*$/)) {
        errorDisplay("firstname", "Le Prenom doit contenir uniquement des lettres");
        firstname = null;
    //Sinon on retire l'erreur et on enregistre la valeur saisie
    } else {
        errorDisplay("firstname", "", true);
        firstname = value;
    }
}

//Checker le prenom
const lastnameChecker = (value) => {
    //Si l'utilisateur insere un chiffre ou un espace blanc, on affiche l'erreur et on la variable correspondante a pour valeur null
    if (!value.match(/^[a-zA-Z]*$/)) {
        errorDisplay("lastname", "Le nom doit contenir uniquement des lettres");
        lastname = null;
    //Sinon on retire l'erreur et on enregistre la valeur saisie
    } else {
        errorDisplay("lastname", "", true);
        lastname = value;
    }
}

//Checker le pseudo
const pseudoChecker = (value) => {
    //Si le pseudo n'est pas compris entre 8 et 16 caracteres
    if (value.length > 0 && (value.length < 8 || value.length > 16)) {
        errorDisplay("pseudo", "Le pseudo doit faire entre 8 et 16 caracteres");
        pseudo = null;
    //Si le pseudo contient des caracteres speciaux
    } else if (!value.match(/^[a-zA-Z0-9_-]*$/)) {
        errorDisplay("pseudo", "Le pseudo ne doit pas contenir de caracteres speciaux");
        pseudo = null;
    //Si le pseudo est saisie correctement
    } else {
        errorDisplay("pseudo", "", true);
        pseudo = value;
    }
};

//Checker Email
const emailChecker = (value) => {
    //Si l'utilisateur entre un mail non valide
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "L'email n'est pas valide");
        email = null;
    //Sinon
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};

//Checker du mot de passe
const passwordChecker = (value) => {
    //Initialisation de la progress bar
    progressBar.classList = "";

    //Si l'utilisateur n'entre pas un mot de passe selon les criteres definis
    if (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
        errorDisplay("password", "Minimum de 8 caracteres, une majuscule, un chiffre et un caractere special");
        //Mot de passe faible donc on insere la progress bar red
        progressBar.classList.add("progressRed");
        password = null;
    
    //Si le mdp > 12, mot de passe moyen progress bar blue
    } else if (value.length < 12) {
        progressBar.classList.add("progressBlue");
        errorDisplay("password", "", true);
        password = value;
    //sinon mot de passe fort, progress bar green
    } else {
        progressBar.classList.add("progressGreen");
        errorDisplay("password", "", true);
        password = value;
    }

    //Verification de la correspondance des mots de passe
    if (confirmPass) confirmChecker(confirmPass)
}; 

//Checker confirm
const confirmChecker = (value) => {
    //Si les mots de passe ne correspondent pas
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe de correspondent pas");
        confirmPass = false;
    //Sinon
    } else {
        errorDisplay("confirm", "",  true);
        confirmPass = true;
    }
};

//Phone Checker
const phoneChecker = (value) => {
    //Si le format du numero n'est pas valide
    if (!value.match(/^\d{10}$/)) {
        errorDisplay("tel", "Entrer un numero de telephone au format valide (10 chiffres, pas de lettres)");
        tel = null;
    //Sinon
    } else {
        errorDisplay("tel", "", true);
        tel = value;
    }
}

//Verification de chaque champ du formulaire
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      switch (e.target.id) {
        case "firstname":
            firstnameChecker(e.target.value);
            break;
        case "lastname":
            lastnameChecker(e.target.value);
            break;
        case "pseudo":
            pseudoChecker(e.target.value);
            break;
        case "email":
            emailChecker(e.target.value);
            break;
        case 'password':
            passwordChecker(e.target.value);
            break;
        case 'confirm':
            confirmChecker(e.target.value);
            break;
        case 'tel':
            phoneChecker(e.target.value);
            break;
        default: 
            null;
      }
    });
});

//Validation du formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault();

    //Si les champs ne sont pas vide
    if (firstname && lastname && pseudo && email && password && confirmPass && tel) {
        const data = {
            firstname,
            lastname,
            pseudo,
            email,
            password,
            tel
        }
        //Affichage des infos dans la console
        console.log(data);

        //Reinitialisation du form
        inputs.forEach((input) => (input.value = ""));
        progressBar.classList = "";

        firstname = null;
        lastname = null;
        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;
        tel = null;

        alert("Inscription validee!!");
    } else {
        alert("Veuillez remplir correctement les champs");
    }
})
