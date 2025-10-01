const preferedDomains = {
  instagram: "kkinstagram.com",
  twitter: "fxtwitter.com",
};
function modifyClipboard(event) {
  event.preventDefault();

  let clipboardText = window.getSelection().toString();

  if (clipboardText === "") {
    clipboardText = window.location.href;
    if (
      !clipboardText.match(/(instagram|x|twitter)\.com\/.{4,15}\/status\/\d+/)
    ) {
      return;
    }
  }

  let modifiedText;

  if (clipboardText.includes("instagram.com")) {
    modifiedText = clipboardText
      .replace(/((?:www)\.)?(?:instagram)\.com/g, preferedDomains.instagram)
      .replace(/\?.*$/, "");
  }

  if (
    clipboardText.includes("x.com") ||
    clipboardText.includes("twitter.com")
  ) {
    modifiedText = clipboardText
      .replace(/(?:twitter|x)\.com/g, preferedDomains.twitter)
      .replace(/\?.*$/, "");
  }

  navigator.clipboard
    .writeText(modifiedText)
    .then(() => {
      console.log("Successfully modified clipboard: " + modifiedText);
    })
    .catch((error) => {
      console.error("Failed to modify clipboard: " + error);
    });
}

document.addEventListener("copy", modifyClipboard);
