/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is MozMill Crowd code.
 *
 * The Initial Developer of the Original Code is the Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Henrik Skupin <hskupin@mozilla.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

const Cc = Components.classes;
const Ci = Components.interfaces;

const PREF_SERVICE = Cc["@mozilla.org/preferences-service;1"].
                     getService(Ci.nsIPrefService);
const PREF_BRANCH =  PREF_SERVICE.QueryInterface(Ci.nsIPrefBranch);

const TEST_RUNS = [
  {name : "BFT Test-run", script: "testrun_bft.py"},
  {name : "Add-ons Test-run", script: "testrun_addons.py"},
];

var gMozmillCrowd = {

  init : function gMozmillCrowd_init() {
    var menulist = document.getElementById("selectTestrun");
    var popup = document.getElementById("selectTestrunPopup");

    for each (var testrun in TEST_RUNS) {
      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("value", testrun.script);
      menuitem.setAttribute("label", testrun.name);
      menuitem.setAttribute("crop", "center");
  
      popup.appendChild(menuitem);
    }
  },

  /**
   * Browse for an application to use for the test-run.
   */
  browseForApplication : function gMozmillCrowd_browseForApplication(event) {
    var recentApplications = [ ];

    // Let the user select an application
    var fp = Cc["@mozilla.org/filepicker;1"].
             createInstance(Ci.nsIFilePicker);

    fp.init(window, "Select a File", Ci.nsIFilePicker.modeOpen);
    if (fp.show() == Ci.nsIFilePicker.returnOK) {
      var menulist = document.getElementById("selectApplication");
      var popup = document.getElementById("selectApplicationPopup");
      var separator = document.getElementById("browseApplicationSeparator");

      var menuitem = document.createElement("menuitem");
      menuitem.setAttribute("value", fp.file);
      menuitem.setAttribute("label", fp.file.path);
      menuitem.setAttribute("crop", "center");

      popup.insertBefore(menuitem, separator);
      menulist.selectedItem = menuitem;
    }
  },

  /**
   * XXX: Stop a test-run before closing the dialog
   */
  closeDialog : function gMozmillCrowd_closeDialog() {
    return true;
  },

  openPreferences : function gMozmillCrowd_openPreferences(event) {
    window.openDialog("chrome://mozmill-crowd/content/preferences.xul", "", "chrome,dialog");
  },

  startTestrun : function gMozmillCrowd_startTestrun(event) {

  }
};
