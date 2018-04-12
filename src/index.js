import gitaclue from 'gitaclue';

/**
 * @description Retrieve the app authors avatar from GitHub
 * @returns {Object} A promise for the GitHub profile avatar
 */
function getUserProfileUrl() {
  return gitaclue.get([
    { context: 'user', contextOwner: '', contextName: 'jdmedlock' },
  ]);
}

$(document).ready(function() {
  console.clear();

  //---------------------------------------------------------------------------
  // Create event handlers for the title bar navigation links
  //---------------------------------------------------------------------------

  const aboutDialog = document.querySelector('dialog#about-dialog');
  if (!aboutDialog.showModal) {
    dialogPolyfill.registerDialog(aboutDialog);
  }
  $( ".about-link" ).on( "click", function() {
    getUserProfileUrl()
    .then(response => {
      $( "#about-avatar" ).attr("src",(JSON.parse(response).user.avatar_url));
      aboutDialog.showModal();
    });
  });
  $( ".about-close" ).on( "click", function() {
    aboutDialog.close();
  });

  //---------------------------------------------------------------------------
  // Enable the event handlers for page elements
  //---------------------------------------------------------------------------

  $( '#voyage-orgname' ).change( () => {
    const voyageOrgName = $('#voyage-orgname' ).val();
    console.log(`voyageOrgName: ${voyageOrgName}`);
  });

  $( '.voyage-get-events' ).on( 'click', () => {
    console.log('Get me some events');
  });

  $( '.export-save' ).on( 'click', function() {
    const textToExport = $('#export-json').val();
    const exportBlob = new Blob([textToExport], { type: "text/plain" });
    const exportURL = window.URL.createObjectURL(exportBlob);
    const exportFilename = $( "#export-filename" ).val();
    const downloadLink = document.createElement( "a" );
    downloadLink.download = exportFilename;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = exportURL;
    downloadLink.onclick = (event) => document.body.removeChild(event.target);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  });

});
