import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function createPage(databaseId: string, properties: any) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties,
    })
    return response
  } catch (error) {
    console.error('Error creating Notion page:', error)
    throw error
  }
}