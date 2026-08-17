/*
 * Copyright 2026 WickWorld
 *
 * This file is part of a fork of Wick Editor.
 *
 * Wick Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * See <https://www.gnu.org/licenses/>.
 */

/**
 * WickWorld host bridge. Loaded before React so filehandler.js keeps our
 * saveFileFromWick instead of the browser download default.
 */
(function () {
  var PROTOCOL_VERSION = 1;
  var parentWindow = window.parent;
  var inIframe = parentWindow !== window;
  var loadOk = false;
  var pendingSaves = {};

  window.wickWorldHost = inIframe;
  window.wickEditorFileSystemType = "cloud";

  function sameOrigin(origin) {
    return origin === window.location.origin;
  }

  function postToParent(payload) {
    if (!inIframe) {
      return;
    }
    parentWindow.postMessage(payload, window.location.origin);
  }

  function requestId() {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    return "ww-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function downloadBlob(file, name, extension) {
    var filename = (name || "download") + (extension || "");
    var url = URL.createObjectURL(file);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  window.saveFileFromWick = function (file, name, extension, successCallback, failureCallback) {
    var isWick = extension === ".wick";
    if (!inIframe || !isWick) {
      downloadBlob(file, name, extension);
      if (successCallback) {
        successCallback();
      }
      return;
    }

    if (!loadOk) {
      if (failureCallback) {
        failureCallback();
      }
      return;
    }

    var id = requestId();
    pendingSaves[id] = {
      success: successCallback,
      failure: failureCallback,
    };

    Promise.resolve(file.arrayBuffer ? file.arrayBuffer() : new Response(file).arrayBuffer())
      .then(function (buffer) {
        postToParent({
          protocolVersion: PROTOCOL_VERSION,
          type: "wickworld:save",
          requestId: id,
          file: buffer,
          name: name || "project",
          extension: extension || ".wick",
        });
      })
      .catch(function () {
        delete pendingSaves[id];
        if (failureCallback) {
          failureCallback();
        }
      });
  };

  window.getSavedWickFiles = function (callback) {
    callback([]);
  };

  function stubAutosave() {
    if (window.Wick && window.Wick.AutoSave && window.Wick.AutoSave.getAutosavesList) {
      window.Wick.AutoSave.getAutosavesList = function (callback) {
        callback([]);
      };
    }
    if (window.editor && typeof window.editor.showAutosavedProjects === "function") {
      window.editor.showAutosavedProjects = function () {};
    }
  }

  stubAutosave();

  function waitForEditor(done) {
    if (window.editor && window.Wick) {
      done();
      return;
    }
    var ticks = 0;
    var timer = setInterval(function () {
      ticks += 1;
      if (window.editor && window.Wick) {
        clearInterval(timer);
        done();
      } else if (ticks > 300) {
        clearInterval(timer);
      }
    }, 100);
  }

  function loadWickBytes(buffer) {
    var blob = new Blob([buffer], { type: "application/wick" });
    window.Wick.WickFile.fromWickFile(blob, function (project) {
      if (project && window.editor) {
        window.editor.setupNewProject(project);
        loadOk = true;
      }
    }, "blob");
  }

  window.addEventListener("message", function (event) {
    if (!sameOrigin(event.origin) || event.source !== parentWindow) {
      return;
    }
    var data = event.data;
    if (!data || typeof data !== "object" || typeof data.type !== "string") {
      return;
    }
    if (data.type.indexOf("wickworld:") !== 0) {
      return;
    }

    if (data.type === "wickworld:load-empty") {
      loadOk = true;
      return;
    }

    if (data.type === "wickworld:load") {
      loadWickBytes(data.wickBytes);
      return;
    }

    if (data.type === "wickworld:save-ack") {
      var pending = pendingSaves[data.requestId];
      delete pendingSaves[data.requestId];
      if (!pending) {
        return;
      }
      if (data.ok) {
        if (pending.success) {
          pending.success();
        }
      } else if (pending.failure) {
        pending.failure();
      }
    }
  });

  waitForEditor(function () {
    stubAutosave();
    postToParent({
      protocolVersion: PROTOCOL_VERSION,
      type: "wickworld:ready",
      requestId: requestId(),
    });
  });
})();
