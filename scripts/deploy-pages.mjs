import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()
const outputDirectory = path.join(projectRoot, 'dist')

if (!existsSync(path.join(outputDirectory, 'index.html'))) {
  throw new Error('Build output is missing. Run npm run build before deploying.')
}

const runGit = (args, cwd, capture = false) => {
  const output = execFileSync('git', args, {
    cwd,
    encoding: capture ? 'utf8' : undefined,
    stdio: capture ? 'pipe' : 'inherit',
  })
  return capture ? output.trim() : ''
}

const readGitSetting = (key, fallback) => {
  try {
    return runGit(['config', '--get', key], projectRoot, true)
  } catch {
    return fallback
  }
}

const remote = runGit(['config', '--get', 'remote.origin.url'], projectRoot, true)
if (!remote) throw new Error('The repository has no origin remote configured.')

const temporaryRoot = mkdtempSync(path.join(os.tmpdir(), 'kinfield-pages-'))
const temporaryRootPath = path.resolve(temporaryRoot)
const tempPathPrefix = `${path.resolve(os.tmpdir())}${path.sep}`
const tempBaseName = path.basename(temporaryRootPath)

if (!temporaryRootPath.startsWith(tempPathPrefix) || !tempBaseName.startsWith('kinfield-pages-')) {
  throw new Error('Refusing to use a temporary path outside the deployment workspace.')
}

try {
  const publishDirectory = path.join(temporaryRoot, 'publish')
  mkdirSync(publishDirectory)
  cpSync(outputDirectory, publishDirectory, { recursive: true })
  writeFileSync(path.join(publishDirectory, '.nojekyll'), '')

  runGit(['init', '--initial-branch=gh-pages'], publishDirectory)
  runGit(['config', 'user.name', readGitSetting('user.name', 'Kinfield deploy')], publishDirectory)
  runGit(['config', 'user.email', readGitSetting('user.email', 'deploy@users.noreply.github.com')], publishDirectory)
  runGit(['add', '--all'], publishDirectory)
  runGit(['commit', '-m', 'Publish Kinfield site'], publishDirectory)
  runGit(['remote', 'add', 'origin', remote], publishDirectory)
  runGit(['push', '--force', 'origin', 'HEAD:gh-pages'], publishDirectory)

  process.stdout.write('Published dist to origin/gh-pages.\n')
} finally {
  rmSync(temporaryRootPath, { recursive: true, force: true })
}
