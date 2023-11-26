(function ($) {
  "use strict";
  $("#download-pdf").on("click", function () {
      loading();
      const toImgArea = document.getElementById("download_section");
      var downloadSection = $("#download_section");
      var cWidth = 830;
      var cHeight = downloadSection.height();
      var topLeftMargin = 0;
      var pdfWidth = cWidth + topLeftMargin * 2;
      var pdfHeight = 297;
      var lebarMM = 0.2645833 * cWidth;
      var tinggiMM = 0.2645833 * cHeight;
      var totalPDFPages = Math.ceil(tinggiMM / pdfHeight) - 1;

      console.log(lebarMM, tinggiMM);
      html2canvas(toImgArea, {
          allowTaint: true,
          taintTest: false,
          type: "view",
          imageTimeout: 15000, //mobile-user
          scale: 2, //mobile-user
          windowWidth: "1000px", //mobile-user
      }).then(function (canvas) {
          canvas.getContext("2d");
          var quality = 1;
          var imgData = canvas.toDataURL("image/jpeg", quality);
          var imgWidth = 210; //A4
          var pageHeight = 295; //A4
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight;

          var pdf = new jsPDF("P", "mm");
          var position = 0;
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(
                  imgData,
                  "JPEG",
                  0,
                  position + 3,
                  imgWidth,
                  imgHeight
              );
              heightLeft -= pageHeight;
          }
          pdf.save(getFileName() + ".pdf"); 
          finish();
      });
  });
  $("#print-pdf").on("click", function () {
      loading();
      const toImgArea = document.getElementById("download_section");
      var downloadSection = $("#download_section");
      var cWidth = 830;
      var cHeight = downloadSection.height();
      var topLeftMargin = 0;
      var pdfWidth = cWidth + topLeftMargin * 2;
      var pdfHeight = 297;
      var lebarMM = 0.2645833 * cWidth;
      var tinggiMM = 0.2645833 * cHeight;
      var totalPDFPages = Math.ceil(tinggiMM / pdfHeight) - 1;

      console.log(lebarMM, tinggiMM);
      html2canvas(toImgArea, {
          allowTaint: true,
          taintTest: false,
          type: "view",
          imageTimeout: 15000, //mobile-user
          scale: 2, //mobile-user
          windowWidth: "1000px", //mobile-user
      }).then(function (canvas) {
          canvas.getContext("2d");
          var quality = 0.8;
          var imgData = canvas.toDataURL("image/jpeg", quality);
          var imgWidth = 210; //A4
          var pageHeight = 295; //A4
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight;

          var pdf = new jsPDF("P", "mm");
          var position = 0;
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(
                  imgData,
                  "JPEG",
                  0,
                  position + 3,
                  imgWidth,
                  imgHeight
              );
              heightLeft -= pageHeight;
          } 
          // Generate data URI for the PDF
          var pdfDataUri = pdf.output("datauristring");

          // Remove elements with class 'css' and '.container'
          $(".css").remove();
          $(".container").remove();

          // Open the PDF in a new window 
          $("body").html(
              "<body style='height: 100%; width: 100%; overflow: hidden; margin:0px; background-color: rgb(51, 51, 51);'>" +
                  "<embed name='habib' style='position:absolute; left: 0; top: 0;' width='100%' height='100%' src='" +
                  pdfDataUri +
                  "'type='application/pdf' internalid='habib'></body>"
          ); 
          finish();
      });
  });
  $("#download-image").on("click", function () {
      loading();
      const toImgArea = document.getElementById("download_section");
      // To avoid the image will be cut by scroll, we need to scroll top before html2canvas.
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // transform to canvas
      html2canvas(toImgArea, {
          allowTaint: true,
          taintTest: false,
          type: "view",
          imageTimeout: 15000, //mobile-user
          scale: 1.3, //mobile-user
          windowWidth: "1000px", //mobile-user
      }).then(function (canvas) {
          let a = document.createElement("a");
          var quality = 0.9;
          a.href = canvas
              .toDataURL("image/jpeg", quality)
              .replace("image/jpeg", "image/octet-stream");
          a.download = getFileName() + ".jpg";
          a.click();
          finish();
      });
  });
  $("#generate-image").on("click", function () {
      loading();
      const toImgArea = document.getElementById("download_section");
      // To avoid the image will be cut by scroll, we need to scroll top before html2canvas.
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // transform to canvas
      html2canvas(toImgArea, {
          allowTaint: true,
          taintTest: false,
          type: "view",
          imageTimeout: 15000, //mobile-user
          scale: 1.3, //mobile-user
          windowWidth: "1000px", //mobile-user
      }).then(function (canvas) {
          let a = document.createElement("a");
          var quality = 0.9;
          let image = canvas
              .toDataURL("image/jpeg", quality)
              .replace("image/jpeg", "image/octet-stream");
          let html = '<img src="' + image + '">';
          $("#download_section")
              .html(html)
              .addClass("padd_0")
              .attr("contenteditable", "false")
              .addClass("border_primary");
          $("#download-pdf").hide();
          $("#download-image").hide();
          $("#generate-image").hide();
          $("#refresh").removeClass("d_none");
          finish();
      });
  });

  function getFileName() {
      let name = $('meta[name="name"]').attr("content");
      var today =
          new Date().getFullYear() +
          "_" +
          ("0" + (new Date().getMonth() + 1)).slice(-2) +
          "_" +
          ("0" + new Date().getDate()).slice(-2) +
          "_";
      return "INV_" + today + name;
  }

  function loading() {
      $("#buttons").addClass("d_none");
      $("#loader").removeClass("d_none");
  }

  function finish() {
      $("#buttons").removeClass("d_none");
      $("#loader").addClass("d_none");
  }
})(jQuery);