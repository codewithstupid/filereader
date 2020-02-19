var CWS = {}

CWS.fileHandler = (function () {
  var $fileInput = $('.file-input'),
    $chooseFileButton = $('.choosefile-button'),
    $choosenFileText = $('.choosenfile-details-text'),
    $addedFilesWrapper = $('.addedfiles-container');
  
  // Initializing fileHandler object
  function initialize () {
    $chooseFileButton.off('click').on('click', function () {
      $fileInput.val(null);
      $fileInput.trigger('click');
    });

    $fileInput.on('change', function (e) {
      getFileDetails(e.currentTarget.files);
    });

    $(document).on('click', '.remove-file-icon', function (e) {
      removeFile(e.currentTarget);
    });
  }

  // This function will be called when the change event occurs
  function getFileDetails (filesList) {
    for (key in filesList) {
      if (filesList.hasOwnProperty(key)) {
        readFileData(filesList[key]);
      }
    }
  }

  // This function will read the file Data and call the addFileDetails function with readed result data
  function readFileData (file) {
    var fileReaderObj = new FileReader();

    fileReaderObj.onloadend = function (event) {
      addFileDetails(event.target.result, file);
    }

    fileReaderObj.readAsDataURL(file);
  }

  // This function will add the file details in the DOM
  function addFileDetails (imageData, file) {
    var el = [],
      fileName = file.name,
      fileSize = (file.size / 1024).toFixed(3);

    el.push('<div class="file-container">');
    el.push('<img src="' + imageData + '" height=100 width=100/>');
    el.push('<div class="file-details-wrapper">');
    el.push('<div class="file-name">' + fileName + '</div>');
    el.push('<div class="file-size">' + fileSize + 'KB</div>');
    el.push('</div>');
    el.push('<div class="remove-file-icon">X</div>');
    el.push('</div>');

    $addedFilesWrapper.append(el.join(''));

    updateFileSelectionText();
  }

  // This function will be called when file remove icon pressed to remvoe file from the list
  function removeFile (curElement) {
    $(curElement).closest('.file-container').remove();
    updateFileSelectionText();
  }

  // This function will update the added file selection text in the top
  function updateFileSelectionText () {
    var filesLength = $('.file-container').length;
    
    if (filesLength) {
      $choosenFileText.text(filesLength + ' Files Selected');
    } else {
      $choosenFileText.text('No files Selected');
    }
  }

  // returning only the initialize function to the global object.
  return {
    init: initialize
  }
})();
