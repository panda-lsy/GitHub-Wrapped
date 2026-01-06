#!/bin/bash

###############################################################################
# 阿里云函数计算自动部署脚本
# 用途：构建并部署 Next.js 应用到阿里云函数计算
###############################################################################

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 打印函数
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 获取脚本所在目录的父目录（项目根目录）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

print_info "GitHub Wrapped - 阿里云函数计算部署脚本"
print_info "项目根目录: $PROJECT_ROOT"
echo ""

###############################################################################
# 步骤 1: 检查依赖工具
###############################################################################
print_info "步骤 1: 检查依赖工具..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    print_error "未找到 Node.js，请先安装 Node.js 18+"
    exit 1
fi
print_info "✓ Node.js 版本: $(node -v)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    print_error "未找到 npm"
    exit 1
fi
print_info "✓ npm 版本: $(npm -v)"

# 检查阿里云 CLI（可选）
if command -v aliyun &> /dev/null; then
    print_info "✓ 阿里云 CLI 已安装"
    ALIYUN_CLI_AVAILABLE=true
else
    print_warn "未安装阿里云 CLI，将使用控制台上传方式"
    ALIYUN_CLI_AVAILABLE=false
fi

echo ""

###############################################################################
# 步骤 2: 安装项目依赖
###############################################################################
print_info "步骤 2: 安装项目依赖..."
cd "$PROJECT_ROOT"

if [ ! -d "node_modules" ]; then
    print_info "首次安装，正在安装依赖..."
    npm install
else
    print_info "依赖已安装，跳过"
fi

echo ""

###############################################################################
# 步骤 3: 构建函数计算部署包
###############################################################################
print_info "步骤 3: 构建函数计算部署包..."
npm run build:fc

if [ ! -d ".next/standalone" ]; then
    print_error "构建失败，未找到 .next/standalone 目录"
    exit 1
fi

print_info "✓ 构建完成"

echo ""

###############################################################################
# 步骤 4: 准备部署包
###############################################################################
print_info "步骤 4: 准备部署包..."

DEPLOY_DIR="$PROJECT_ROOT/.fcconfig/deploy-package"
DEPLOY_ZIP="$PROJECT_ROOT/.fcconfig/deploy-package.zip"

# 清理旧的部署包
rm -rf "$DEPLOY_DIR" "$DEPLOY_ZIP"

# 创建部署目录
mkdir -p "$DEPLOY_DIR"

# 复制构建产物
print_info "复制构建产物到部署目录..."
cp -r "$PROJECT_ROOT/.next/standalone/"* "$DEPLOY_DIR/"

# 重命名入口文件为 index.js（阿里云默认）
mv "$DEPLOY_DIR/fc-handler.js" "$DEPLOY_DIR/index.js" 2>/dev/null || true

print_info "✓ 部署包准备完成"
print_info "部署目录: $DEPLOY_DIR"
print_info "部署包大小: $(du -sh "$DEPLOY_DIR" | cut -f1)"

echo ""

###############################################################################
# 步骤 5: 打包（可选）
###############################################################################
print_info "步骤 5: 创建部署 ZIP 包..."

cd "$DEPLOY_DIR"
zip -r "$DEPLOY_ZIP" . -q
print_info "✓ ZIP 包创建完成: $DEPLOY_ZIP"
print_info "ZIP 包大小: $(du -sh "$DEPLOY_ZIP" | cut -f1)"

echo ""

###############################################################################
# 步骤 6: 部署指引
###############################################################################
print_info "步骤 6: 部署指引"
echo ""

if [ "$ALIYUN_CLI_AVAILABLE" = true ]; then
    print_info "方式 1: 使用阿里云 CLI 自动部署（推荐）"
    echo "----------------------------------------"
    print_warn "请确保已配置阿里云 CLI 认证信息："
    echo "  aliyun configure"
    echo ""
    print_info "然后运行以下命令部署："
    echo "  aliyun fc POST /services/[ServiceName]/functions --file-body \"$DEPLOY_ZIP\""
    echo ""
fi

print_info "方式 2: 使用阿里云函数计算控制台上传"
echo "----------------------------------------"
echo "1. 登录阿里云函数计算控制台："
echo "   https://fc.console.aliyun.com/"
echo ""
echo "2. 创建服务或选择现有服务"
echo ""
echo "3. 创建函数，配置如下："
echo "   - 请求处理程序: index.handler"
echo "   - 运行时: Node.js 20"
echo "   - 内存规格: 1024 MB"
echo "   - 超时时间: 30 秒"
echo ""
echo "4. 上传代码包："
echo "   选择「上传 ZIP 包」"
echo "   上传文件: $DEPLOY_ZIP"
echo ""
echo "5. 配置环境变量（参考 .fcconfig/env.json）"
echo ""
echo "6. 创建 HTTP 触发器："
echo "   - 认证方式: 匿名"
echo "   - 请求方式: GET, POST, PUT, DELETE, PATCH, OPTIONS"
echo ""

###############################################################################
# 步骤 7: 环境变量检查
###############################################################################
print_warn "重要提示：请确保已配置以下环境变量"
echo ""
echo "必需的环境变量："
echo "  - NEXTAUTH_URL: 函数计算访问地址"
echo "  - NEXTAUTH_SECRET: 随机密钥（openssl rand -base64 32）"
echo "  - GITHUB_CLIENT_ID: GitHub OAuth App ID"
echo "  - GITHUB_CLIENT_SECRET: GitHub OAuth App Secret"
echo ""
echo "详细配置请参考: .fcconfig/README.md"
echo ""

###############################################################################
# 完成
###############################################################################
print_info "✓ 部署准备完成！"
echo ""
print_info "下一步："
print_info "1. 按照上述方式上传代码包到函数计算"
print_info "2. 配置环境变量"
print_info "3. 创建 HTTP 触发器"
print_info "4. 访问函数 URL 验证部署"
echo ""

# 询问是否打开控制台
read -p "是否打开阿里云函数计算控制台？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://fc.console.aliyun.com/"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "https://fc.console.aliyun.com/" 2>/dev/null || \
        sensible-browser "https://fc.console.aliyun.com/" 2>/dev/null || \
        echo "请手动打开: https://fc.console.aliyun.com/"
    else
        start "https://fc.console.aliyun.com/"
    fi
fi
