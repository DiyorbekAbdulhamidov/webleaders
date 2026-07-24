import fs from 'fs/promises'
import path from 'path'
import type { Project } from '@/data/projects'

/**
 * Telegram bot orqali qo'shiladigan dinamik portfolio uchun saqlash qatlami.
 *
 * Ikki rejim:
 *  - GitHub rejimi (GITHUB_TOKEN + GITHUB_REPO berilganda): ma'lumot va rasmlar
 *    to'g'ridan-to'g'ri repoga commit qilinadi — Vercel avtomatik redeploy qiladi.
 *    Serverless muhitda yagona ishonchli usul.
 *  - Fayl rejimi (aks holda): data/portfolio.json va public/uploads/ ga yoziladi.
 *    VPS va lokal muhit uchun.
 */

export interface DraftProject {
  name?: string
  category?: string
  desc?: string
  tech?: string[]
  url?: string
  images: string[]
  year?: number
}

export interface PortfolioData {
  projects: Project[]
  drafts: Record<string, DraftProject>
}

const DATA_FILE = 'data/portfolio.json'
const UPLOADS_DIR = 'public/uploads'

const emptyData: PortfolioData = { projects: [], drafts: {} }

const githubConfigured = () =>
  Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO)

// ---------- GitHub Contents API helpers ----------

async function githubRequest(method: string, apiPath: string, body?: object) {
  const repo = process.env.GITHUB_REPO // "owner/repo" formatida
  const res = await fetch(`https://api.github.com/repos/${repo}/${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store'
  })
  return res
}

async function githubReadFile(filePath: string): Promise<{ content: string; sha: string } | null> {
  const res = await githubRequest('GET', `contents/${filePath}`)
  if (!res.ok) return null
  const json = await res.json()
  return {
    content: Buffer.from(json.content, 'base64').toString('utf-8'),
    sha: json.sha
  }
}

async function githubWriteFile(filePath: string, contentBase64: string, message: string): Promise<boolean> {
  const existing = await githubReadFile(filePath).catch(() => null)
  const res = await githubRequest('PUT', `contents/${filePath}`, {
    message,
    content: contentBase64,
    ...(existing ? { sha: existing.sha } : {})
  })
  return res.ok
}

// ---------- Fayl tizimi helpers ----------

async function fsReadData(): Promise<PortfolioData> {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), DATA_FILE), 'utf-8')
    const parsed = JSON.parse(raw)
    return { ...emptyData, ...parsed }
  } catch {
    return { ...emptyData }
  }
}

async function fsWriteData(data: PortfolioData): Promise<boolean> {
  const filePath = path.join(process.cwd(), DATA_FILE)
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  return true
}

// ---------- Ochiq API ----------

export async function readPortfolio(): Promise<PortfolioData> {
  if (githubConfigured()) {
    const file = await githubReadFile(DATA_FILE).catch(() => null)
    if (file) {
      try {
        return { ...emptyData, ...JSON.parse(file.content) }
      } catch {
        return { ...emptyData }
      }
    }
    // GitHub'da hali fayl bo'lmasa, lokal nusxaga urinamiz (build vaqtida repo ichida bo'ladi)
    return fsReadData()
  }
  return fsReadData()
}

export async function writePortfolio(data: PortfolioData, message = 'chore: portfolio update via telegram bot'): Promise<boolean> {
  if (githubConfigured()) {
    const base64 = Buffer.from(JSON.stringify(data, null, 2), 'utf-8').toString('base64')
    return githubWriteFile(DATA_FILE, base64, message)
  }
  return fsWriteData(data)
}

/**
 * Rasmni saqlaydi va saytdagi public URL (masalan /uploads/slug-1.jpg) ni qaytaradi.
 */
export async function saveImage(fileName: string, buffer: Buffer): Promise<string | null> {
  const publicPath = `/uploads/${fileName}`
  if (githubConfigured()) {
    const ok = await githubWriteFile(
      `${UPLOADS_DIR}/${fileName}`,
      buffer.toString('base64'),
      `chore: portfolio image ${fileName} via telegram bot`
    )
    return ok ? publicPath : null
  }
  const dir = path.join(process.cwd(), UPLOADS_DIR)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, fileName), buffer)
  return publicPath
}
