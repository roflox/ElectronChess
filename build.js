const electronInstaller = require("electron-winstaller");

(async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: "./sachy-win32-x64",
      outputDirectory: "./build/installer64",
      authors: "My App Inc.",
      exe: "sachy.exe"
    });
    console.log("It worked!");
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
})();
