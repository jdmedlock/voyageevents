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

/**
 * @description Retrieve the app authors avatar from GitHub
 * @returns {Object} A promise for the GitHub profile avatar
 */
function getReposAndEvents() {
  return gitaclue.get([
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-0', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-1', segments: ['events']},
    /*
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-2', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-3', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-4', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-5', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-6', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-7', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-8', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-9', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-10', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-11', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-12', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-13', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-14', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-15', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-16', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-17', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-18', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-19', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-20', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-21', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-22', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-23', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-24', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-25', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-26', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-27', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-28', segments: ['events']},
    { context: 'repo', contextOwner: 'chingu-voyage4', contextName: 'Bears-Team-29', segments: ['events']},
    */
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
    getReposAndEvents()
    .then((reposAndEvents) => {
      console.log(reposAndEvents);
      $('#export-json').text(reposAndEvents);
    });
  });

  $( '.export-cancel' ).on( 'click', function() {
    $( '#export-json' ).val('');
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
