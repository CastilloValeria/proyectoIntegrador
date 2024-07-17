const btnAdminSearch = document.querySelector("#btnAdminSearch");
const inputAdminSearch = document.querySelector("#inputAdminSearch");
const formAdminSearch = document.querySelector("#formAdminSearch");

inputAdminSearch.style.display = "none";

btnAdminSearch.addEventListener("click", (e) => {
  inputAdminSearch.style.display = "block";

  if (inputAdminSearch.style.display === "block") {
    btnAdminSearch.addEventListener("click", () => {
      formAdminSearch.submit();
});
}
});