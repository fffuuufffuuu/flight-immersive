# 部署脚本 - 使用 GitHub Pages
Write-Host "=== Flight Before the Airplane - 部署指南 ===" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 Git 状态
Write-Host "[1/5] 检查 Git 状态..." -ForegroundColor Yellow
git status
Write-Host ""

# 2. 创建提交
Write-Host "[2/5] 创建初始提交..." -ForegroundColor Yellow
git add .
git commit -m "Initial commit: Flight Before the Airplane immersive experience"
Write-Host ""

Write-Host "=== 下一步操作 ===" -ForegroundColor Green
Write-Host ""
Write-Host "请按以下步骤操作："
Write-Host ""
Write-Host "1. 访问 https://github.com/new 创建一个新仓库"
Write-Host "   - 仓库名称建议: flight-immersive"
Write-Host "   - 选择 Public（公开）"
Write-Host "   - 不要勾选 Initialize this repository"
Write-Host ""
Write-Host "2. 创建仓库后，在终端执行以下命令（替换为你的用户名）："
Write-Host ""
Write-Host "   git remote add origin https://github.com/你的用户名/flight-immersive.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "3. 推送成功后，在 GitHub 仓库中启用 Pages："
Write-Host "   - 点击 Settings"
Write-Host "   - 侧边栏选择 Pages"
Write-Host "   - Source 选择 Deploy from a branch"
Write-Host "   - Branch 选择 main / root"
Write-Host "   - 点击 Save"
Write-Host ""
Write-Host "4. 等待 1-2 分钟，你的网站将在以下地址上线："
Write-Host "   https://你的用户名.github.io/flight-immersive"
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
