/* SIDEKOM | comportements du site */
(function () {
  "use strict";

  // Année automatique dans le pied de page
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Formulaire de contact (envoi via Formspree, sans quitter la page)
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";

      if (!form.checkValidity()) {
        status.textContent = "Merci de remplir tous les champs obligatoires.";
        status.classList.add("err");
        return;
      }

      var button = form.querySelector("button[type=submit]");
      button.disabled = true;
      status.textContent = "Envoi en cours…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Erreur " + res.status);
          form.reset();
          status.textContent = "Merci, votre demande a bien été envoyée. Nous revenons vers vous rapidement.";
          status.classList.add("ok");
        })
        .catch(function () {
          status.textContent = "L'envoi a échoué. Réessayez ou écrivez-nous directement par e-mail.";
          status.classList.add("err");
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }
})();
