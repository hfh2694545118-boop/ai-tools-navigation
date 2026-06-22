param(
  [string]$RepoName = "ai-tools-navigation",
  [switch]$Private
)

$ErrorActionPreference = "Stop"

function Run {
  param(
    [string]$Command,
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CommandArgs
  )

  Write-Host "> $Command $($CommandArgs -join ' ')" -ForegroundColor Cyan
  & $Command @CommandArgs
  if ($LASTEXITCODE -ne 0) {
    throw "$Command exited with code $LASTEXITCODE"
  }
}

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI is not installed. Install it from https://cli.github.com/ and run this script again."
}

if (-not (Get-Command vercel.cmd -ErrorAction SilentlyContinue)) {
  throw "Vercel CLI is not installed. Run: npm.cmd install -g vercel"
}

Run gh "auth" "status"
Run vercel.cmd "whoami"

$githubUser = (& gh api user --jq ".login").Trim()
$githubId = (& gh api user --jq ".id").Trim()
$repoVisibility = if ($Private) { "--private" } else { "--public" }
$repoFullName = "$githubUser/$RepoName"
$noReplyEmail = "$githubId+$githubUser@users.noreply.github.com"

Run git "config" "user.name" $githubUser
Run git "config" "user.email" $noReplyEmail

$hasCommit = $true
try {
  git rev-parse --verify HEAD *> $null
} catch {
  $hasCommit = $false
}

Run git "add" "."

$changes = (& git status --porcelain)
if ($changes) {
  Run git "commit" "-m" "Initial AI tools navigation site"
} elseif (-not $hasCommit) {
  throw "No files are staged for the first commit."
} else {
  Write-Host "No local changes to commit." -ForegroundColor Yellow
}

$remoteUrl = $null
git remote get-url origin *> $null
if ($LASTEXITCODE -eq 0) {
  $remoteUrl = (& git remote get-url origin).Trim()
}
if (-not $remoteUrl) {
  Run gh "repo" "create" $RepoName $repoVisibility "--source" "." "--remote" "origin" "--push"
} else {
  $branch = (& git branch --show-current).Trim()
  Run git "push" "-u" "origin" $branch
}

Run vercel.cmd "link" "--yes"
Run vercel.cmd "deploy" "--prod" "--yes"

Write-Host ""
Write-Host "Published to GitHub: https://github.com/$repoFullName" -ForegroundColor Green
Write-Host "Vercel production deploy completed. Check the deployment URL printed above." -ForegroundColor Green
