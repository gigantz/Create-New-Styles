import sketch from "sketch";
var document = sketch.getSelectedDocument();

var selectedLayers = document.selectedLayers;
var selectedCount = selectedLayers.length;
var SharedStyle = require("sketch/dom").SharedStyle;
var UI = require("sketch/ui");

export default function() {
  var documentStyles = [];
  var regex_hasNameAndNumber = /(.*)\s(\d+)$|(.*)/;
  var regex_partialName = /^(.*(?=\s\d)|.*)/g;
  var sharedStyle = null;
  var documentTextStyles = [];
  var documentLayerStyles = [];

  if (selectedCount === 0) {
    return UI.message("No layers selected");
  }

  document.sharedTextStyles.forEach(item => {
    documentTextStyles.push(item.name);
  });

  document.sharedLayerStyles.forEach(item => {
    documentLayerStyles.push(item.name);
  });

  var styles = {};

  selectedLayers.forEach(item => {
    if (!item.sharedStyleId) {
      return;
    }

    if (item.style.styleType === "Text") {
      sharedStyle = document.getSharedTextStyleWithID(item.sharedStyleId);
      documentStyles = documentTextStyles;
    }

    if (item.style.styleType === "Layer") {
      sharedStyle = document.getSharedLayerStyleWithID(item.sharedStyleId);
      documentStyles = documentLayerStyles;
    }

    var styleName = sharedStyle.name;
    var selectedStyleName = regex_hasNameAndNumber.exec(styleName);
    var partialStyleName = styleName.match(regex_partialName)[0];
    var newStyleName = null;
    var biggestNumber = 1;
    var numbers = [];

    documentStyles.forEach(el => {
      var docStyleName = regex_hasNameAndNumber.exec(el);

      if (docStyleName[1] || selectedStyleName[0] === docStyleName[1]) {
        if (
          docStyleName[1] === selectedStyleName[1] ||
          selectedStyleName[0] === docStyleName[1]
        ) {
          numbers.push(Number(docStyleName[2]));
          biggestNumber = Math.max.apply(null, numbers);
        }
      }
    });

    if (styles[partialStyleName]) {
      styles[partialStyleName].count++;
    } else {
      styles[partialStyleName] = {
        name: partialStyleName,
        count: 1
      };
    }

    newStyleName =
      partialStyleName + " " + (biggestNumber + styles[partialStyleName].count);

    const newSharedStyle = SharedStyle.fromStyle({
      name: newStyleName,
      style: item.style,
      document: document
    });

    item.sharedStyleId = newSharedStyle.id;

    UI.message("Done!");
  });
}
