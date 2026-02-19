#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'
import { readdir, access, readFile, copyFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, resolve, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface SkillInfo {
  name: string
  path: string
  description: string
  platform: string
  category: string
}

interface PlatformInfo {
  name: string
  displayName: string
  icon: string
  stages: string[]
}

const PLATFORMS: Record<string, PlatformInfo> = {
  wechat: {
    name: 'wechat',
    displayName: '微信公众号',
    icon: '📱',
    stages: ['01-planning', '02-creation', '03-optimization', '04-analytics'],
  },
  xiaohongshu: {
    name: 'xiaohongshu',
    displayName: '小红书',
    icon: '📕',
    stages: ['01-planning', '02-creation', '03-optimization', '04-analytics'],
  },
  douyin: {
    name: 'douyin',
    displayName: '抖音',
    icon: '🎵',
    stages: ['01-planning', '02-creation', '03-optimization', '04-analytics'],
  },
  common: {
    name: 'common',
    displayName: '通用工具',
    icon: '🛠️',
    stages: [''],
  },
}

// 从 skill 目录名中提取平台和技能名
function parseSkillName(skillName: string): { platform: string; skillName: string } {
  if (skillName.startsWith('wechat-')) {
    return { platform: 'wechat', skillName: skillName.replace('wechat-', '') }
  } else if (skillName.startsWith('xiaohongshu-')) {
    return { platform: 'xiaohongshu', skillName: skillName.replace('xiaohongshu-', '') }
  } else if (skillName.startsWith('douyin-')) {
    return { platform: 'douyin', skillName: skillName.replace('douyin-', '') }
  } else if (skillName.startsWith('common-')) {
    return { platform: 'common', skillName: skillName.replace('common-', '') }
  }
  // Fallback: try to detect from directory structure
  return { platform: 'unknown', skillName }
}

const STAGE_NAMES: Record<string, string> = {
  '01-planning': '策划阶段',
  '02-creation': '创作阶段',
  '03-optimization': '优化阶段',
  '04-analytics': '分析阶段',
  '': '全部',
}

/**
 * 扫描 skills 目录获取所有可用技能
 */
async function scanSkills(skillsDir: string): Promise<SkillInfo[]> {
  const skills: SkillInfo[] = []

  if (!existsSync(skillsDir)) {
    return skills
  }

  for (const [platformKey, platform] of Object.entries(PLATFORMS)) {
    const platformDir = join(skillsDir, platform.name)
    if (!existsSync(platformDir)) continue

    const stages = platform.name === 'common' ? [''] : platform.stages

    for (const stage of stages) {
      const stageDir = stage ? join(platformDir, stage) : platformDir
      if (!existsSync(stageDir)) continue

      try {
        const skillDirs = await readdir(stageDir)
        for (const skillDir of skillDirs) {
          const skillPath = join(stageDir, skillDir)
          const skillFile = join(skillPath, 'SKILL.md')

          if (!existsSync(skillFile)) continue

          try {
            const content = await readFile(skillFile, 'utf-8')
            const descriptionMatch = content.match(/description:\s*(.+)/)
            const platformMatch = content.match(/platform:\s*(.+)/)
            const categoryMatch = content.match(/category:\s*(.+)/)

            // 从目录名解析平台
            const parsedName = parseSkillName(skillDir)
            const detectedPlatform = parsedName.platform !== 'unknown' ? parsedName.platform : platformKey

            skills.push({
              name: skillDir,
              path: skillPath,
              description: descriptionMatch?.[1]?.trim() || '',
              platform: platformMatch?.[1]?.trim() || detectedPlatform,
              category: categoryMatch?.[1]?.trim() || 'other',
            })
          } catch {
            continue
          }
        }
      } catch {
        continue
      }
    }
  }

  return skills
}

/**
 * 按平台和阶段组织技能
 */
function organizeSkills(skills: SkillInfo[]) {
  const organized: Record<string, Record<string, SkillInfo[]>> = {}

  for (const skill of skills) {
    if (!organized[skill.platform]) {
      organized[skill.platform] = {}
    }

    const platform = PLATFORMS[skill.platform]
    if (!platform) continue

    const stageDir = relative(join(skillsDir, skill.platform), skill.path).split('/')[0] || ''
    const stageKey = skill.platform === 'common' ? '' : stageDir

    if (!organized[skill.platform][stageKey]) {
      organized[skill.platform][stageKey] = []
    }

    organized[skill.platform][stageKey].push(skill)
  }

  return organized
}

/**
 * 安装技能到 Claude skills 目录
 */
async function installSkill(skill: SkillInfo, targetDir: string): Promise<void> {
  const targetPath = join(targetDir, skill.name)

  if (existsSync(targetPath)) {
    throw new Error(`目录 ${skill.name} 已存在`)
  }

  await mkdir(targetPath, { recursive: true })

  // 复制 SKILL.md
  const skillFile = join(skill.path, 'SKILL.md')
  if (existsSync(skillFile)) {
    await copyFile(skillFile, join(targetPath, 'SKILL.md'))
  }

  // 复制 scripts 目录（如果存在）
  const scriptsDir = join(skill.path, 'scripts')
  if (existsSync(scriptsDir)) {
    const targetScriptsDir = join(targetPath, 'scripts')
    await mkdir(targetScriptsDir, { recursive: true })

    const scriptFiles = await readdir(scriptsDir)
    for (const file of scriptFiles) {
      await copyFile(join(scriptsDir, file), join(targetScriptsDir, file))
    }
  }

  // 复制 references 目录（如果存在）
  const refsDir = join(skill.path, 'references')
  if (existsSync(refsDir)) {
    const targetRefsDir = join(targetPath, 'references')
    await mkdir(targetRefsDir, { recursive: true })

    const refFiles = await readdir(refsDir)
    for (const file of refFiles) {
      await copyFile(join(refsDir, file), join(targetRefsDir, file))
    }
  }
}

/**
 * 获取 Claude skills 目录
 */
async function getClaudeSkillsDir(): Promise<string> {
  const homeDir = process.env.HOME || process.env.USERPROFILE || '~'
  const defaultPath = join(homeDir, '.claude', 'skills')

  if (existsSync(defaultPath)) {
    return defaultPath
  }

  return defaultPath
}

// 获取 skills 目录路径
const skillsDir = resolve(__dirname, '../../../skills')

const program = new Command()

program
  .name('media-creator-skills')
  .description('媒体创作者技能管理工具')
  .version('1.0.0')

program
  .command('list')
  .description('列出所有可用技能')
  .action(async () => {
    console.log(chalk.cyan('\n📚 扫描可用技能...\n'))

    const spinner = ora('正在扫描 skills 目录').start()
    const skills = await scanSkills(skillsDir)
    spinner.stop()

    if (skills.length === 0) {
      console.log(chalk.yellow('未找到任何技能'))
      return
    }

    const organized = organizeSkills(skills)

    for (const [platformKey, platform] of Object.entries(PLATFORMS)) {
      const platformSkills = organized[platformKey]
      if (!platformSkills || Object.keys(platformSkills).length === 0) continue

      console.log(chalk.bold(`\n${platform.icon} ${platform.displayName}`))
      console.log(chalk.gray('─'.repeat(50)))

      for (const [stageKey, stageSkills] of Object.entries(platformSkills)) {
        const stageName = STAGE_NAMES[stageKey]
        console.log(chalk.yellow(`\n  ${stageName}`))

        for (const skill of stageSkills) {
          console.log(`    • ${chalk.green(skill.name)} - ${skill.description.substring(0, 40)}${skill.description.length > 40 ? '...' : ''}`)
        }
      }
    }

    console.log(chalk.cyan(`\n总计: ${skills.length} 个技能\n`))
  })

program
  .command('install')
  .description('安装技能到 Claude')
  .option('-p, --platform <platform>', '指定媒体平台')
  .option('-s, --stage <stage>', '指定创作阶段')
  .option('-a, --all', '安装所有技能')
  .action(async (options) => {
    console.log(chalk.cyan('\n📦 准备安装技能...\n'))

    const spinner = ora('正在扫描 skills 目录').start()
    const skills = await scanSkills(skillsDir)
    spinner.stop()

    if (skills.length === 0) {
      console.log(chalk.yellow('未找到任何技能'))
      return
    }

    let selectedSkills: SkillInfo[] = []

    if (options.all) {
      selectedSkills = skills
    } else if (options.platform && options.stage) {
      // 过滤指定平台和阶段的技能
      selectedSkills = skills.filter(skill => {
        const platformMatch = skill.platform === options.platform
        const stageDir = relative(join(skillsDir, skill.platform), skill.path).split('/')[0] || ''
        const stageMatch = stageDir === options.stage
        return platformMatch && stageMatch
      })
    } else if (options.platform) {
      // 过滤指定平台的技能
      selectedSkills = skills.filter(skill => skill.platform === options.platform)
    } else {
      // 交互式选择
      const platformAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'platform',
          message: '选择媒体平台:',
          choices: [
            ...Object.entries(PLATFORMS).map(([key, value]) => ({
              name: `${value.icon} ${value.displayName}`,
              value: key,
            })),
            { name: '所有平台', value: 'all' },
          ],
        },
      ])

      let targetSkills = skills
      if (platformAnswer.platform !== 'all') {
        targetSkills = skills.filter(skill => skill.platform === platformAnswer.platform)
      }

      if (platformAnswer.platform !== 'common') {
        const stageAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'stage',
            message: '选择创作阶段:',
            choices: [
              ...PLATFORMS[platformAnswer.platform]?.stages.map(stage => ({
                name: STAGE_NAMES[stage],
                value: stage,
              })),
              { name: '全部阶段', value: 'all' },
            ],
          },
        ])

        if (stageAnswer.stage !== 'all') {
          targetSkills = targetSkills.filter(skill => {
            const stageDir = relative(join(skillsDir, skill.platform), skill.path).split('/')[0] || ''
            return stageDir === stageAnswer.stage
          })
        }
      }

      const skillsAnswer = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedSkills',
          message: '选择要安装的技能 (按空格选择，回车确认):',
          choices: [
            { name: '全部选中', value: 'all' },
            new inquirer.Separator(),
            ...targetSkills.map(skill => ({
              name: `${skill.name} - ${skill.description}`,
              value: skill.name,
            })),
          ],
        },
      ])

      if (skillsAnswer.selectedSkills.includes('all')) {
        selectedSkills = targetSkills
      } else {
        selectedSkills = targetSkills.filter(skill => skillsAnswer.selectedSkills.includes(skill.name))
      }
    }

    if (selectedSkills.length === 0) {
      console.log(chalk.yellow('\n未选择任何技能'))
      return
    }

    // 确认安装目标目录
    const claudeDir = await getClaudeSkillsDir()
    const targetAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'targetDir',
        message: '安装目标目录:',
        default: claudeDir,
        validate: async (input: string) => {
          if (!input.trim()) {
            return '目录不能为空'
          }
          return true
        },
      },
    ])

    const targetDir = resolve(targetAnswer.targetDir)

    // 创建目标目录
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true })
      console.log(chalk.gray(`\n创建目标目录: ${targetDir}`))
    }

    // 安装技能
    console.log(chalk.cyan(`\n准备安装 ${selectedSkills.length} 个技能...\n`))

    let successCount = 0
    let skipCount = 0

    for (const skill of selectedSkills) {
      const installSpinner = ora(`安装 ${skill.name}`).start()

      try {
        await installSkill(skill, targetDir)
        installSpinner.succeed(`${chalk.green(skill.name)} ✓`)
        successCount++
      } catch (error: any) {
        if (error.message.includes('已存在')) {
          installSpinner.warn(`${chalk.yellow(skill.name)} - 跳过 (已存在)`)
          skipCount++
        } else {
          installSpinner.fail(`${chalk.red(skill.name)} - ${error.message}`)
        }
      }
    }

    console.log(chalk.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
    console.log(chalk.green(`✓ 成功: ${successCount} 个`))
    if (skipCount > 0) {
      console.log(chalk.yellow(`⚠ 跳过: ${skipCount} 个`))
    }
    console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
    console.log(chalk.gray(`\n安装目录: ${targetDir}\n`))
  })

program
  .command('info <skill-name>')
  .description('查看技能详细信息')
  .action(async (skillName: string) => {
    console.log(chalk.cyan(`\n🔍 查找技能: ${skillName}\n`))

    const spinner = ora('正在扫描').start()
    const skills = await scanSkills(skillsDir)
    spinner.stop()

    const skill = skills.find(s => s.name === skillName)

    if (!skill) {
      console.log(chalk.yellow(`未找到技能: ${skillName}`))
      console.log(chalk.gray('\n使用 "media-creator-skills list" 查看所有可用技能\n'))
      return
    }

    const platform = PLATFORMS[skill.platform]

    console.log(chalk.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
    console.log(chalk.green(`${skill.name}`))
    console.log(chalk.bold('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
    console.log(`\n平台: ${platform?.icon} ${platform?.displayName}`)
    console.log(`描述: ${skill.description}`)
    console.log(`类别: ${skill.category}`)
    console.log(`路径: ${skill.path}`)

    try {
      const skillFile = join(skill.path, 'SKILL.md')
      const content = await readFile(skillFile, 'utf-8')

      const nameMatch = content.match(/^# (.+)$/m)
      if (nameMatch) {
        console.log(`\n${chalk.bold('名称:')} ${nameMatch[1]}`)
      }

      const descMatch = content.match(/^(.+?)(?=\n##|\n[A-Z])/s)
      if (descMatch) {
        console.log(`${chalk.bold('简介:')} ${descMatch[1].trim()}`)
      }
    } catch {
      // 忽略读取错误
    }

    console.log(chalk.bold('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'))
  })

program
  .command('search <keyword>')
  .description('搜索技能')
  .action(async (keyword: string) => {
    console.log(chalk.cyan(`\n🔍 搜索: ${keyword}\n`))

    const spinner = ora('正在搜索').start()
    const skills = await scanSkills(skillsDir)
    spinner.stop()

    const keywordLower = keyword.toLowerCase()
    const results = skills.filter(skill =>
      skill.name.toLowerCase().includes(keywordLower) ||
      skill.description.toLowerCase().includes(keywordLower)
    )

    if (results.length === 0) {
      console.log(chalk.yellow(`未找到匹配 "${keyword}" 的技能\n`))
      return
    }

    console.log(chalk.green(`找到 ${results.length} 个匹配结果:\n`))

    for (const skill of results) {
      const platform = PLATFORMS[skill.platform]
      console.log(`${platform?.icon || ''} ${chalk.green(skill.name)}`)
      console.log(`  ${skill.description}\n`)
    }
  })

program.parse()
