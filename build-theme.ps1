$ErrorActionPreference = 'Stop'
$themeRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $themeRoot
try {
    & node 'scripts/build-theme.mjs'
    if ($LASTEXITCODE -ne 0) { throw '主题构建失败。' }
}
finally {
    Pop-Location
}
