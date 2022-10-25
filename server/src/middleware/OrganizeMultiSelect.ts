import { Client } from "@notionhq/client"
import dotenv from "dotenv"

const fs = require('fs');

dotenv.config()

const OrganizeMultiSelects = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const databaseId: string = process.env.NOTION_DATABASE_ID as string
  
  const { properties } = await notion.databases.retrieve({
    "database_id": databaseId,
  })

  // Filter for DB Query
  //
  // "filter": {
  //   "property": "Genre",
  //   "multi_select": {
  //     "is_not_empty": true
  //   }
  // }

  // const stringifyResponse = JSON.stringify(properties)
  // fs.writeFile('res.json', stringifyResponse, (err: Error) => {
  //   if (err) throw err;
  //   console.log("new data added to file")
  // })

  type MultiSelectDatabasePropertyConfigResponse = {
    type: "multi_select";
    multi_select: {
        options: Array<Object>;
    };
    id: string;
    name: string;
  };

  const opt: MultiSelectDatabasePropertyConfigResponse = properties.Genre
  console.log(opt)

  // const {multiSelect} = response.results[0].properties.Genre.multi_select
}

export default OrganizeMultiSelects