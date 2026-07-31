$ErrorActionPreference = 'Stop'

$themeRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $themeRoot
try {
    & npm test
    if ($LASTEXITCODE -ne 0) { throw '主题验证失败。' }
}
finally {
    Pop-Location
}
