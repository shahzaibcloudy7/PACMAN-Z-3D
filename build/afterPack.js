// electron-builder's own exe editing needs symlink privileges on Windows, so it's disabled
// (signAndEditExecutable: false). Instead, stamp the app name, version and icon onto the
// packaged exe here so Explorer shows "PACMAN3D-Z" rather than "Electron".
const path = require('path');
const rcedit = require('rcedit');

exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== 'win32') return;
  const { productFilename, info } = context.packager.appInfo;
  const exePath = path.join(context.appOutDir, `${productFilename}.exe`);
  const version = info.metadata.version;

  await rcedit(exePath, {
    icon: path.join(__dirname, 'icon.ico'),
    'file-version': version,
    'product-version': version,
    'version-string': {
      ProductName: 'PACMAN3D-Z',
      FileDescription: 'PACMAN3D-Z',
      CompanyName: info.metadata.author.name || 'shahzaibcloudy7',
      LegalCopyright: context.packager.config.copyright,
      OriginalFilename: `${productFilename}.exe`,
      InternalName: productFilename
    }
  });
};
