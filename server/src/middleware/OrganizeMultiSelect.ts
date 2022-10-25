import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
import GetMultiSelectOptions from './GetMultiSelectOptions'
import WriteToJSON from './WriteToJSON'

dotenv.config()

const OrganizeMultiSelects = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string
  
  const { results }: { results: any } = await notion.databases.query({
    database_id: databaseId,
    "filter": {
      "property": "Genre",
      "multi_select": {
        "is_not_empty": true
      }
    }
  })

  const options: any = await GetMultiSelectOptions()
  results.forEach((element: any) => {
    const pageMultiSelect = element.properties.Genre.multi_select

    const currentMultiSelectOptions: any[] = []
    for (let i = 0, len = options.length; i < len; i++) {
      pageMultiSelect.forEach((multiSelectOption: any) => {
        if (multiSelectOption.id === options[i].id && !currentMultiSelectOptions.includes(multiSelectOption)) {
          currentMultiSelectOptions.push(multiSelectOption)
        }
      })
    }
  })

  WriteToJSON(results)
  
  // CHECK IF MULTI-SELECT OPTIONS ARE OUT OF ORDER
  
  // let outOfOrder = false
  // results.forEach((element: any) => {
  //   const pageMultiSelect = element.properties.Genre.multi_select
  //   pageMultiSelect.forEach((multiSelectOption: any, multiSelectOptionIndex: any) => {
  //     options.forEach((optionElement, optionIndex) => {
  //       if (multiSelectOption.id = optionElement.id) {
  //         if (multiSelectOptionIndex > optionIndex) {
  //           outOfOrder = true
  //           multiSelectOption.outOfOrder = true;
  //         }
  //       }
  //     })
  //   })
  // })
}

export default OrganizeMultiSelects
